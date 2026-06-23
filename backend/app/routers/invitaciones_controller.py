from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.routers.deps import get_current_user
from app.models.user import User
from app.schemas.invitation import InvitationResponse
from app.services.invitaciones_service import InvitacionesService

router = APIRouter(prefix="/invitaciones", tags=["Invitaciones"])

@router.get("/", response_model=List[InvitationResponse])
def get_invitaciones(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Endpoint para obtener las invitaciones del usuario actual (GET /invitaciones).
    """
    service = InvitacionesService(db)
    invitations = service.obtener_invitaciones(current_user.id)
    
    response = []
    for inv in invitations:
        response.append(InvitationResponse(
            id=inv.id,
            group_id=inv.group_id,
            user_id=str(inv.user_id),
            sender_id=str(inv.sender_id),
            status=inv.status,
            created_at=inv.created_at,
            group_name=inv.group.name if inv.group else None,
            sender_username=inv.sender.username if inv.sender else None
        ))
    return response
