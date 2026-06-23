from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.routers.deps import get_current_user
from app.models.user import User
from app.schemas.invitation import InvitationResponse, InvitationUpdate
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

@router.put("/{id}", response_model=InvitationResponse)
def editar_invitacion(
    id: str,
    invitation_data: InvitationUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Endpoint para editar una invitación (PUT /invitaciones/{id}).
    """
    service = InvitacionesService(db)
    updated_inv = service.editar_invitacion(id, invitation_data.model_dump(exclude_unset=True))
    if not updated_inv:
        raise HTTPException(status_code=404, detail="Invitación no encontrada")
    
    return InvitationResponse(
        id=updated_inv.id,
        group_id=updated_inv.group_id,
        user_id=str(updated_inv.user_id),
        sender_id=str(updated_inv.sender_id),
        status=updated_inv.status,
        created_at=updated_inv.created_at,
        group_name=updated_inv.group.name if updated_inv.group else None,
        sender_username=updated_inv.sender.username if updated_inv.sender else None
    )

