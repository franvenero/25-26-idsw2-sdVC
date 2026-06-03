from typing import List, Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.task import Task, TaskStatus
from app.models.user import User, UserRole
from app.schemas.task import TaskCreate, TaskUpdate, TaskStatusUpdate
from uuid import UUID

class TaskService:
    def __init__(self, db: Session):
        self.db = db

    def create_task(self, task_data: TaskCreate, current_user: User) -> Task:
        # Solo Administradores pueden crear tareas
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
            status=TaskStatus.PENDIENTE
        )
        self.db.add(db_task)
        self.db.commit()
        self.db.refresh(db_task)
        return db_task

    def get_tasks(self, current_user: User) -> List[Task]:
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
        # Solo Administradores pueden realizar modificaciones completas
        if current_user.role not in [UserRole.ADMIN, UserRole.ADMIN_MEMBER]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tiene permisos para modificar la tarea completa"
            )
        
        db_task = self.get_task_by_id(task_id)
        
        update_data = task_data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_task, key, value)
            
        self.db.commit()
        self.db.refresh(db_task)
        return db_task

    def update_task_status(self, task_id: int, status_data: TaskStatusUpdate, current_user: User) -> Task:
        db_task = self.get_task_by_id(task_id)
        
        # Si es Miembro, verificar que la tarea esté asignada a él
        if current_user.role == UserRole.MEMBER:
            if db_task.assigned_to_id != current_user.id:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Solo puede cambiar el estado de las tareas asignadas a usted"
                )
        
        db_task.status = status_data.status
        self.db.commit()
        self.db.refresh(db_task)
        return db_task

    def delete_task(self, task_id: int, current_user: User) -> None:
        # Solo Administradores pueden eliminar tareas
        if current_user.role not in [UserRole.ADMIN, UserRole.ADMIN_MEMBER]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tiene permisos para eliminar tareas"
            )
        
        db_task = self.get_task_by_id(task_id)
        self.db.delete(db_task)
        self.db.commit()
