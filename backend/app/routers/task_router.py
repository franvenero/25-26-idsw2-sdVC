from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.routers.deps import get_db, get_current_user
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse, TaskDependencyCreate
from app.services.task_service import TaskService
from app.models.user import User

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.get("/", response_model=List[TaskResponse])
def read_tasks(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Lista las tareas del grupo del usuario actual que no han sido eliminadas.
    Delegación a la capa de servicio (obtenerTareasPorGrupo).
    """
    service = TaskService(db)
    return service.obtenerTareasPorGrupo(group_id=current_user.group_id)

@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(
    task_in: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Crea una nueva tarea asignándola al grupo del usuario.
    Solo administradores y miembros administradores pueden crear tareas.
    """
    from app.models.user import UserRole
    if current_user.role == UserRole.MEMBER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Los miembros no tienen permisos para crear tareas"
        )
        
    service = TaskService(db)
    return service.create_task(
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
    Se aplican restricciones de rol para completar tareas.
    """
    service = TaskService(db)
    return service.update_task(
        task_id, 
        task_in, 
        user_id=str(current_user.id),
        user_role=current_user.role
    )

@router.patch("/{task_id}/estado", response_model=TaskResponse)
def complete_task(
    task_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Marca una tarea como completada (PATCH /tasks/{id}/estado).
    """
    service = TaskService(db)
    return service.marcar_completada(task_id)

@router.delete("/{task_id}")
def delete_task(
    task_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Borrado lógico de una tarea.
    """
    service = TaskService(db)
    return service.soft_delete_task(task_id)

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
    service = TaskService(db)
    return service.add_dependencies(task_id, dependency_in)
