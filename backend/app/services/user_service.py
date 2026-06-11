from sqlalchemy.orm import Session
from uuid import UUID
from typing import List, Optional
from fastapi import HTTPException, status
from app.models.user import User, UserRole
from app.schemas.user import UserCreate, UserUpdateRole
from app.core.security import get_password_hash
from app.repositories.user_repository import UserRepository

class UserService:
    def __init__(self, db: Session):
        self.db = db
        self.repo = UserRepository(db)

    def get_members(self, group_id: str) -> List[User]:
        return self.db.query(User).filter(User.group_id == group_id).all()

    def create_member(self, user_data: UserCreate, current_user: User) -> User:
        # Permission check: Only ADMIN or ADMIN_MEMBER can create members
        if current_user.role not in [UserRole.ADMIN, UserRole.ADMIN_MEMBER]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not enough permissions to create members"
            )

        # Check if email exists
        existing_email = self.db.query(User).filter(User.email == user_data.email).first()
        if existing_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        # Check if username exists
        existing_user = self.repo.get_by_username(user_data.username)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already registered"
            )

        # BR-MEM-04: ADMIN_MEMBER can only create members for their own group
        if current_user.role == UserRole.ADMIN_MEMBER:
            group_id = current_user.group_id
        else:
            group_id = user_data.group_id or current_user.group_id

        # Generate default password if not provided
        password = user_data.password or "Cambiar123!"
        
        new_user = User(
            username=user_data.username,
            email=user_data.email,
            hashed_password=get_password_hash(password),
            role=user_data.role,
            group_id=group_id,
            is_active=True
        )
        
        return self.repo.create(new_user)

    def change_role(self, user_id: UUID, role_data: UserUpdateRole, current_user: User) -> User:
        target_user = self.db.query(User).filter(User.id == user_id).first()
        if not target_user:
            raise HTTPException(status_code=404, detail="User not found")

        # BR-MEM-02: Hierarchy rules
        if current_user.role == UserRole.ADMIN_MEMBER:
            if target_user.role in [UserRole.ADMIN, UserRole.ADMIN_MEMBER]:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Cannot modify another admin or group admin"
                )
            if role_data.role == UserRole.ADMIN:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Cannot promote to super ADMIN"
                )

        target_user.role = role_data.role
        self.db.commit()
        self.db.refresh(target_user)
        return target_user

    def deactivate_member(self, user_id: UUID, current_user: User) -> None:
        target_user = self.db.query(User).filter(User.id == user_id).first()
        if not target_user:
            raise HTTPException(status_code=404, detail="User not found")

        # BR-MEM-02: Hierarchy rules
        if current_user.role == UserRole.ADMIN_MEMBER:
            if target_user.role in [UserRole.ADMIN, UserRole.ADMIN_MEMBER]:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Cannot deactivate another admin or group admin"
                )

        # BR-MEM-03: Logic deletion
        target_user.is_active = False
        self.db.commit()
