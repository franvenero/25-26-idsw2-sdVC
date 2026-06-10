from pydantic import BaseModel, ConfigDict, EmailStr
from uuid import UUID
from typing import Optional
from app.models.user import UserRole

class UserBase(BaseModel):
    username: str
    email: EmailStr
    role: UserRole = UserRole.MEMBER
    group_id: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdateRole(BaseModel):
    role: UserRole

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(UserBase):
    id: UUID
    is_active: bool

    model_config = ConfigDict(from_attributes=True)
