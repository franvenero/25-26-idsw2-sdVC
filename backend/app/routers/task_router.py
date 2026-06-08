from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.routers.deps import get_db, get_current_user
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse, TaskDependencyCreate
from app.services.task_service import TaskService
from app.models.user import User

router = APIRouter(prefix="/tasks", tags=["Tasks"])
task_service = TaskService()

@router.get("/", response_model=List[TaskResponse])
def read_tasks(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Lista las tareas del grupo del usuario actual que no han sido eliminadas.
    """
    return task_service.get_tasks_by_group(db, group_id=current_user.group_id)

@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(
    task_in: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Crea una nueva tarea asignándola al grupo del usuario.
    """
    return task_service.create_task(
        db, 
        task_in, 
        owner_id=str(current_user.id), 
        group_id=current_user.group_id
    )

@router.patch("/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: str,
    task_in: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Actualiza una tarea. Incluye validación de dependencias si se marca como completada.
    """
    return task_service.update_task(db, task_id, task_in, user_id=str(current_user.id))

@router.delete("/{task_id}")
def delete_task(
    task_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Borrado lógico de una tarea.
    """
    return task_service.soft_delete_task(db, task_id)

@router.post("/{task_id}/dependencies", response_model=TaskResponse)
def add_task_dependencies(
    task_id: str,
    dependency_in: TaskDependencyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Establece relaciones de dependencia entre tareas con validación de circularidad.
    """
    return task_service.add_dependencies(db, task_id, dependency_in)
