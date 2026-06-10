from typing import Optional, List, Any
from datetime import datetime
from pydantic import BaseModel, ConfigDict, model_validator
from app.models.group import GroupMemberRole

class GroupBase(BaseModel):
    name: str
    description: Optional[str] = None

class GroupCreate(GroupBase):
    pass

class GroupUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    is_active: Optional[bool] = None

class GroupMemberResponse(BaseModel):
    user_id: str
    username: str
    role: GroupMemberRole
    joined_at: datetime

    model_config = ConfigDict(from_attributes=True)

    @model_validator(mode="before")
    @classmethod
    def extract_user_info(cls, data: Any) -> Any:
        if hasattr(data, "user") and data.user:
            return {
                "user_id": str(data.user_id),
                "username": data.user.username,
                "role": data.role,
                "joined_at": data.joined_at
            }
        return data

class GroupResponse(GroupBase):
    id: str
    is_active: bool
    created_at: datetime
    members: List[GroupMemberResponse] = []

    model_config = ConfigDict(from_attributes=True)

class MemberRoleUpdate(BaseModel):
    role: GroupMemberRole
