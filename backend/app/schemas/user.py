from pydantic import BaseModel, ConfigDict
from uuid import UUID
from app.models.user import UserRole

class UserBase(BaseModel):
    username: str
    role: UserRole = UserRole.MEMBER

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class User(UserBase):
    id: UUID
    is_active: bool

    model_config = ConfigDict(from_attributes=True)
