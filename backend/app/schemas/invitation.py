from typing import Optional
from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr
from app.models.invitation import InvitationStatus

class InvitationBase(BaseModel):
    group_id: str

class InvitationCreate(InvitationBase):
    email: EmailStr

class InvitationUpdate(BaseModel):
    status: Optional[InvitationStatus] = None

class InvitationResponse(InvitationBase):
    id: str
    user_id: str
    sender_id: str
    status: InvitationStatus
    created_at: datetime
    group_name: Optional[str] = None
    sender_username: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
