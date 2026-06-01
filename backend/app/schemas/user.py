from pydantic import BaseModel, ConfigDict
from uuid import UUID

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class UserLogin(UserBase):
    password: str

class User(UserBase):
    id: UUID
    is_active: bool

    model_config = ConfigDict(from_attributes=True)
