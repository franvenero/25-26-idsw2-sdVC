from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.routers.deps import get_current_user
from app.models.user import User
from app.schemas.group import GroupCreate, GroupUpdate, GroupResponse, MemberRoleUpdate, GroupMemberResponse
from app.schemas.invitation import InvitationCreate, InvitationResponse
from app.services.group_service import GroupService

router = APIRouter(prefix="/groups", tags=["Groups"])

@router.get("/", response_model=List[GroupResponse])
def list_groups(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    service = GroupService(db)
    groups = service.get_user_groups(current_user.id)
    
    # Mapeo manual para asegurar que los nombres de usuario se incluyan
    response = []
    for g in groups:
        members_resp = [
            GroupMemberResponse(
                user_id=str(m.user_id),
                username=m.user.username,
                role=m.role,
                joined_at=m.joined_at
            ) for m in g.members if m.is_active
        ]
        response.append(GroupResponse(
            id=g.id,
            name=g.name,
            description=g.description,
            is_active=g.is_active,
            created_at=g.created_at,
            members=members_resp
        ))
    return response

@router.post("/", response_model=GroupResponse, status_code=status.HTTP_201_CREATED)
def create_group(
    group_data: GroupCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    service = GroupService(db)
    group = service.create_group(current_user.id, group_data)
    return GroupResponse.model_validate(group)

@router.patch("/{group_id}", response_model=GroupResponse)
def update_group(
    group_id: str,
    group_data: GroupUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    service = GroupService(db)
    group = service.update_group(current_user.id, group_id, group_data)
    return GroupResponse.model_validate(group)

@router.delete("/{group_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_group(
    group_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    service = GroupService(db)
    service.delete_group(current_user.id, group_id)
    return None

@router.get("/invitations/pending", response_model=List[InvitationResponse])
def list_pending_invitations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    service = GroupService(db)
    invitations = service.get_pending_invitations(current_user.id)
    
    response = []
    for inv in invitations:
        response.append(InvitationResponse(
            id=inv.id,
            group_id=inv.group_id,
            user_id=str(inv.user_id),
            sender_id=str(inv.sender_id),
            status=inv.status,
            created_at=inv.created_at,
            group_name=inv.group.name,
            sender_username=inv.sender.username
        ))
    return response

@router.post("/{group_id}/invitations", response_model=InvitationResponse, status_code=status.HTTP_201_CREATED)
def invite_user(
    group_id: str,
    invite_data: InvitationCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    service = GroupService(db)
    invitation = service.invite_user(current_user.id, group_id, invite_data)
    return InvitationResponse(
        id=invitation.id,
        group_id=invitation.group_id,
        user_id=str(invitation.user_id),
        sender_id=str(invitation.sender_id),
        status=invitation.status,
        created_at=invitation.created_at,
        group_name=invitation.group.name,
        sender_username=invitation.sender.username
    )

@router.put("/invitations/{invitation_id}/accept")
def accept_invitation(
    invitation_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    service = GroupService(db)
    service.accept_invitation(current_user.id, invitation_id)
    return {"message": "Invitación aceptada correctamente"}

@router.put("/invitations/{invitation_id}/reject")
def reject_invitation(
    invitation_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    service = GroupService(db)
    service.reject_invitation(current_user.id, invitation_id)
    return {"message": "Invitación rechazada correctamente"}

@router.put("/{group_id}/members/{user_id}/role", response_model=GroupMemberResponse)
def update_member_role(
    group_id: str,
    user_id: str,
    role_data: MemberRoleUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    service = GroupService(db)
    member = service.update_member_role(current_user.id, group_id, user_id, role_data)
    return GroupMemberResponse(
        user_id=str(member.user_id),
        username=member.user.username,
        role=member.role,
        joined_at=member.joined_at
    )

@router.delete("/{group_id}/members/{user_id}", status_code=status.HTTP_200_OK)
def remove_member(
    group_id: str,
    user_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    service = GroupService(db)
    service.remove_member(current_user.id, group_id, user_id)
    return {"message": "Miembro removido correctamente"}
