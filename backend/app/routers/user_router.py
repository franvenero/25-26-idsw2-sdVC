from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from app.core.database import get_db
from app.routers.deps import get_current_user
from app.models.user import User
from app.schemas.user import UserResponse, UserCreate, UserUpdateRole
from app.services.user_service import UserService

router = APIRouter(prefix="/members", tags=["members"])

@router.get("/", response_model=List[UserResponse])
def read_members(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    service = UserService(db)
    return service.get_members(current_user.group_id)

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def invite_member(
    user_data: UserCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    service = UserService(db)
    return service.create_member(user_data, current_user)

@router.patch("/{user_id}/role", response_model=UserResponse)
def update_member_role(
    user_id: UUID,
    role_data: UserUpdateRole,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    service = UserService(db)
    return service.change_role(user_id, role_data, current_user)

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def deactivate_member(
    user_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    service = UserService(db)
    service.deactivate_member(user_id, current_user)
    return None
