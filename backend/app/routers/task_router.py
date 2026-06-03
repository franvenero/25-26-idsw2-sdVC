from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.task import TaskCreate, TaskUpdate, TaskStatusUpdate, TaskResponse
from app.services.task_service import TaskService
from app.models.user import User
from app.routers.deps import get_current_user

router = APIRouter(prefix="/tasks", tags=["Tasks"])

def get_task_service(db: Session = Depends(get_db)) -> TaskService:
    return TaskService(db)

@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    task_data: TaskCreate,
    current_user: User = Depends(get_current_user),
    task_service: TaskService = Depends(get_task_service)
):
    return task_service.create_task(task_data, current_user)

@router.get("/", response_model=List[TaskResponse])
async def get_tasks(
    current_user: User = Depends(get_current_user),
    task_service: TaskService = Depends(get_task_service)
):
    return task_service.get_tasks(current_user)

@router.put("/{task_id}", response_model=TaskResponse)
async def update_task(
    task_id: int,
    task_data: TaskUpdate,
    current_user: User = Depends(get_current_user),
    task_service: TaskService = Depends(get_task_service)
):
    return task_service.update_task(task_id, task_data, current_user)

@router.patch("/{task_id}/status", response_model=TaskResponse)
async def update_task_status(
    task_id: int,
    status_data: TaskStatusUpdate,
    current_user: User = Depends(get_current_user),
    task_service: TaskService = Depends(get_task_service)
):
    return task_service.update_task_status(task_id, status_data, current_user)

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    task_id: int,
    current_user: User = Depends(get_current_user),
    task_service: TaskService = Depends(get_task_service)
):
    task_service.delete_task(task_id, current_user)
    return None
