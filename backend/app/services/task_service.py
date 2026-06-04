from typing import List, Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.task import Task, TaskStatus
from app.models.user import User, UserRole
from app.schemas.task import TaskCreate, TaskUpdate, TaskStatusUpdate
from uuid import UUID

class TaskService:
    """
    Controlador de Tareas (TareasController en diseño UML).
    Coordina la lógica de negocio para la gestión de tareas.
    """
    def __init__(self, db: Session):
        self.db = db

    def create_task(self, task_data: TaskCreate, current_user: User) -> Task:
        """
        crearTarea() - Realización de diseño.
        Solo administradores pueden crear tareas y asignarlas.
        """
        if current_user.role not in [UserRole.ADMIN, UserRole.ADMIN_MEMBER]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tiene permisos para crear tareas"
            )
        
        db_task = Task(
            title=task_data.title,
            description=task_data.description,
            assigned_to_id=task_data.assigned_to_id,
            creator_id=current_user.id,
            group_id=task_data.group_id,
            status=TaskStatus.PENDIENTE
        )
        self.db.add(db_task)
        self.db.commit()
        self.db.refresh(db_task)
        return db_task

    def get_tasks(self, current_user: User) -> List[Task]:
        """
        abrirTareas() / listarTareas() - Realización de diseño.
        Filtra tareas según el rol del usuario (RBAC).
        """
        query = self.db.query(Task)
        
        # Si es Miembro, filtrar solo las asignadas a él
        if current_user.role == UserRole.MEMBER:
            query = query.filter(Task.assigned_to_id == current_user.id)
        
        return query.all()

    def get_task_by_id(self, task_id: int) -> Task:
        task = self.db.query(Task).filter(Task.id == task_id).first()
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tarea no encontrada"
            )
        return task

    def update_task(self, task_id: int, task_data: TaskUpdate, current_user: User) -> Task:
        """
        editarTarea() / actualizarTarea() - Realización de diseño.
        Permite modificaciones al creador de la tarea o a administradores.
        """
        db_task = self.get_task_by_id(task_id)
        
        isAdmin = current_user.role in [UserRole.ADMIN, UserRole.ADMIN_MEMBER]
        isOwner = db_task.creator_id == current_user.id
        
        if not (isAdmin or isOwner):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tiene permisos para modificar esta tarea"
            )
        
        # Actualización parcial iterativa
        update_data = task_data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_task, key, value)
            
        self.db.commit()
        self.db.refresh(db_task)
        return db_task

    def update_task_status(self, task_id: int, status_data: TaskStatusUpdate, current_user: User) -> Task:
        """
        marcarCompletada() - Realización de diseño.
        Permite a los miembros cambiar el estado de sus propias tareas.
        """
        db_task = self.get_task_by_id(task_id)
        
        # Si es Miembro, verificar que la tarea esté asignada a él o sea el dueño
        if current_user.role == UserRole.MEMBER:
            if db_task.assigned_to_id != current_user.id and db_task.creator_id != current_user.id:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Solo puede cambiar el estado de las tareas asignadas a usted o creadas por usted"
                )
        
        # Actualización parcial iterativa para el estado
        update_data = status_data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_task, key, value)
            
        self.db.commit()
        self.db.refresh(db_task)
        return db_task

    def delete_task(self, task_id: int, current_user: User) -> None:
        """
        eliminarTarea() - Realización de diseño.
        Solo administradores pueden eliminar tareas.
        """
        if current_user.role not in [UserRole.ADMIN, UserRole.ADMIN_MEMBER]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tiene permisos para eliminar tareas"
            )
        
        db_task = self.get_task_by_id(task_id)
        self.db.delete(db_task)
        self.db.commit()
