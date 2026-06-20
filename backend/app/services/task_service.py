from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.task import Task
from app.models.user import User
from app.schemas.task import TaskCreate, TaskUpdate, TaskDependencyCreate
from app.repositories.task_repository import TaskRepository

class TaskService:
    def __init__(self, db: Session):
        self.db = db
        self.repo = TaskRepository(db)

    def obtenerTareasPorGrupo(self, group_id: str):
        """
        Obtiene las tareas de un grupo a través del repositorio.
        """
        return self.repo.obtenerTareasPorGrupo(group_id)

    def get_tasks_by_group(self, group_id: str):
        """
        Alias para obtenerTareasPorGrupo para compatibilidad.
        """
        return self.obtenerTareasPorGrupo(group_id)

    def get_task_by_id(self, task_id: str):
        task = self.db.query(Task).filter(Task.id == task_id, Task.is_deleted == False).first()
        if not task:
            raise HTTPException(status_code=404, detail="Tarea no encontrada")
        return task

    def create_task(self, task_data: TaskCreate, owner_id: str, group_id: str):
        # Usamos el group_id proporcionado por el router (del usuario actual)
        # a menos que task_data explícitamente traiga uno (soporte futuro multi-grupo)
        effective_group_id = task_data.group_id or group_id
        
        db_task = Task(
            title=task_data.title,
            description=task_data.description,
            group_id=effective_group_id,
            owner_id=owner_id,
            assigned_to_id=task_data.assigned_to_id
        )
        self.db.add(db_task)
        
        # Procesar dependencias iniciales si existen
        if task_data.depends_on_ids:
            for dep_id in task_data.depends_on_ids:
                dep_task = self.get_task_by_id(dep_id)
                if dep_task not in db_task.dependencies:
                    db_task.dependencies.append(dep_task)

        self.db.commit()
        self.db.refresh(db_task)
        return db_task

    def update_task(self, task_id: str, task_update: TaskUpdate, user_id: str, user_role: str):
        db_task = self.get_task_by_id(task_id)
        from app.models.user import UserRole

        # Lógica de marcar como completada con validación de dependencias y roles
        if task_update.is_completed is True and db_task.is_completed is False:
            # RN-TAS-02: Restricción para rol Miembro
            if user_role == UserRole.MEMBER:
                if db_task.assigned_to_id and str(db_task.assigned_to_id) != user_id:
                    raise HTTPException(
                        status_code=status.HTTP_403_FORBIDDEN,
                        detail="No tienes permiso para completar la tarea de otro miembro"
                    )
            
            self._validate_dependencies_for_completion(db_task)

        update_data = task_update.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_task, key, value)
        
        self.db.commit()
        self.db.refresh(db_task)
        return db_task

    def soft_delete_task(self, task_id: str):
        db_task = self.get_task_by_id(task_id)
        db_task.is_deleted = True
        self.db.commit()
        return {"detail": "Tarea eliminada correctamente"}

    def add_dependencies(self, task_id: str, dependency_data: TaskDependencyCreate):
        task = self.get_task_by_id(task_id)
        
        for dep_id in dependency_data.depends_on_ids:
            if dep_id == task_id:
                raise HTTPException(status_code=400, detail="Una tarea no puede depender de sí misma")
            
            dep_task = self.get_task_by_id(dep_id)
            
            if self._check_circularity(task, dep_task):
                raise HTTPException(
                    status_code=400, 
                    detail=f"Circularidad detectada: {task.title} no puede depender de {dep_task.title}"
                )
            
            if dep_task not in task.dependencies:
                task.dependencies.append(dep_task)
        
        self.db.commit()
        return task

    def _check_circularity(self, potential_successor: Task, potential_predecessor: Task) -> bool:
        visited = set()
        stack = [potential_predecessor]
        
        while stack:
            current = stack.pop()
            if current.id == potential_successor.id:
                return True
            
            if current.id not in visited:
                visited.add(current.id)
                stack.extend(current.dependencies)
                
        return False

    def _validate_dependencies_for_completion(self, task: Task):
        for dep in task.dependencies:
            if not dep.is_deleted and not dep.is_completed:
                raise HTTPException(
                    status_code=400, 
                    detail=f"No se puede completar: la tarea depende de '{dep.title}' que aún está pendiente"
                )
