from typing import Optional, List
from pydantic import BaseModel, Field

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    group_id: Optional[str] = None # Hecho opcional para que el frontend no tenga que enviarlo

class TaskCreate(TaskBase):
    assigned_to_id: Optional[str] = None
    depends_on_ids: Optional[List[str]] = Field(default_factory=list)

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    is_completed: Optional[bool] = None
    assigned_to_id: Optional[str] = None

class TaskDependencyCreate(BaseModel):
    depends_on_ids: List[str]

class TaskResponse(TaskBase):
    id: str
    is_completed: bool
    is_deleted: bool
    owner_id: str
    assigned_to_id: Optional[str] = None
    dependencies: List['TaskResponse'] = []
    
    class Config:
        from_attributes = True
        # Aseguramos que group_id se incluya en la respuesta aunque sea opcional en el base
        json_schema_extra = {
            "example": {
                "id": "uuid",
                "title": "Comprar pan",
                "is_completed": False,
                "group_id": "familia_1"
            }
        }
