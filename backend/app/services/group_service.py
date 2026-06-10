from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import List
from app.models.group import Group, GroupMember, GroupMemberRole
from app.models.invitation import Invitation, InvitationStatus
from app.models.user import User
from app.schemas.group import GroupCreate, GroupUpdate, MemberRoleUpdate
from app.schemas.invitation import InvitationCreate

class GroupService:
    def __init__(self, db: Session):
        self.db = db

    def get_user_groups(self, user_id: str) -> List[Group]:
        # RN-GRU-01: Solo grupos donde el usuario tiene un registro activo
        return self.db.query(Group).join(GroupMember).filter(
            GroupMember.user_id == str(user_id),
            GroupMember.is_active == True,
            Group.is_active == True
        ).all()

    def create_group(self, user_id: str, group_data: GroupCreate) -> Group:
        # RN-GRU-03, 04, 05
        db_group = Group(
            name=group_data.name,
            description=group_data.description
        )
        self.db.add(db_group)
        self.db.flush()  # Para obtener el ID

        # Asignar creador como ADMIN
        member = GroupMember(
            user_id=str(user_id),
            group_id=db_group.id,
            role=GroupMemberRole.ADMIN
        )
        self.db.add(member)
        self.db.commit()
        self.db.refresh(db_group)
        return db_group

    def update_group(self, user_id: str, group_id: str, group_data: GroupUpdate) -> Group:
        # RN-GRU-06: Validar rol ADMIN
        member = self._get_member(user_id, group_id)
        if not member or member.role != GroupMemberRole.ADMIN:
            raise HTTPException(status_code=403, detail="Solo el administrador puede editar el grupo")

        db_group = self._get_group(group_id)
        for key, value in group_data.model_dump(exclude_unset=True).items():
            setattr(db_group, key, value)
        
        self.db.commit()
        self.db.refresh(db_group)
        return db_group

    def delete_group(self, user_id: str, group_id: str):
        # RN-GRU-08: Solo ADMIN
        member = self._get_member(user_id, group_id)
        if not member or member.role != GroupMemberRole.ADMIN:
            raise HTTPException(status_code=403, detail="Solo el administrador puede eliminar el grupo")

        db_group = self._get_group(group_id)
        # RN-GRU-09: Borrado lógico
        db_group.is_active = False
        
        # Desactivar todas las membresías
        self.db.query(GroupMember).filter(GroupMember.group_id == group_id).update({"is_active": False})
        
        self.db.commit()

    def get_pending_invitations(self, user_id: str) -> List[Invitation]:
        # RN-INV-01, 02
        return self.db.query(Invitation).filter(
            Invitation.user_id == str(user_id),
            Invitation.status == InvitationStatus.PENDING
        ).all()

    def invite_user(self, admin_id: str, group_id: str, invite_data: InvitationCreate) -> Invitation:
        # Validar permisos del que invita
        member = self._get_member(admin_id, group_id)
        if not member or member.role not in [GroupMemberRole.ADMIN, GroupMemberRole.ADMIN_MEMBER]:
            raise HTTPException(status_code=403, detail="No tienes permisos para invitar usuarios")

        # RN-INV-06: El usuario invitado debe existir
        invitee = self.db.query(User).filter(User.email == invite_data.email).first()
        if not invitee:
            raise HTTPException(status_code=404, detail="El usuario invitado no está registrado")

        # Validar que no sea ya miembro
        existing_member = self._get_member(invitee.id, group_id)
        if existing_member and existing_member.is_active:
            raise HTTPException(status_code=400, detail="El usuario ya es miembro del grupo")

        # RN-INV-05: No múltiples invitaciones pendientes
        existing_invitation = self.db.query(Invitation).filter(
            Invitation.group_id == group_id,
            Invitation.user_id == str(invitee.id),
            Invitation.status == InvitationStatus.PENDING
        ).first()
        if existing_invitation:
            raise HTTPException(status_code=400, detail="Ya existe una invitación pendiente para este usuario")

        db_invitation = Invitation(
            group_id=group_id,
            user_id=str(invitee.id),
            sender_id=str(admin_id)
        )
        self.db.add(db_invitation)
        self.db.commit()
        self.db.refresh(db_invitation)
        return db_invitation

    def accept_invitation(self, user_id: str, invitation_id: str):
        invitation = self.db.query(Invitation).filter(
            Invitation.id == invitation_id,
            Invitation.user_id == str(user_id),
            Invitation.status == InvitationStatus.PENDING
        ).first()
        if not invitation:
            raise HTTPException(status_code=404, detail="Invitación no encontrada o ya procesada")

        # RN-INV-03: Al aceptar, se une como MEMBER
        invitation.status = InvitationStatus.ACCEPTED
        
        # Crear o reactivar membresía
        member = self._get_member(user_id, invitation.group_id)
        if member:
            member.is_active = True
            member.role = GroupMemberRole.MEMBER
        else:
            member = GroupMember(
                user_id=str(user_id),
                group_id=invitation.group_id,
                role=GroupMemberRole.MEMBER
            )
            self.db.add(member)
        
        self.db.commit()

    def reject_invitation(self, user_id: str, invitation_id: str):
        # RN-INV-04
        invitation = self.db.query(Invitation).filter(
            Invitation.id == invitation_id,
            Invitation.user_id == str(user_id),
            Invitation.status == InvitationStatus.PENDING
        ).first()
        if not invitation:
            raise HTTPException(status_code=404, detail="Invitación no encontrada")

        invitation.status = InvitationStatus.REJECTED
        self.db.commit()

    def update_member_role(self, admin_id: str, group_id: str, target_user_id: str, role_data: MemberRoleUpdate):
        # RN-MEM-01: Solo ADMIN
        requester = self._get_member(admin_id, group_id)
        if not requester or requester.role != GroupMemberRole.ADMIN:
            raise HTTPException(status_code=403, detail="Solo el administrador puede cambiar roles")

        target_member = self._get_member(target_user_id, group_id)
        if not target_member:
            raise HTTPException(status_code=404, detail="El miembro no pertenece al grupo")

        target_member.role = role_data.role
        self.db.commit()
        return target_member

    def remove_member(self, requester_id: str, group_id: str, target_user_id: str):
        # RN-MEM-04: MEMBER solo puede eliminarse a sí mismo
        # RN-MEM-03: No puede quedar sin admins
        requester = self._get_member(requester_id, group_id)
        if not requester:
            raise HTTPException(status_code=403, detail="No perteneces a este grupo")

        is_self = str(requester_id) == str(target_user_id)
        
        if not is_self and requester.role != GroupMemberRole.ADMIN:
            raise HTTPException(status_code=403, detail="No tienes permisos para expulsar miembros")

        target_member = self._get_member(target_user_id, group_id)
        if not target_member:
            raise HTTPException(status_code=404, detail="El miembro no pertenece al grupo")

        # Validar RN-MEM-03
        if target_member.role == GroupMemberRole.ADMIN:
            other_admins = self.db.query(GroupMember).filter(
                GroupMember.group_id == group_id,
                GroupMember.role == GroupMemberRole.ADMIN,
                GroupMember.user_id != str(target_user_id),
                GroupMember.is_active == True
            ).count()
            if other_admins == 0:
                raise HTTPException(status_code=400, detail="El grupo no puede quedar sin administradores")

        target_member.is_active = False
        self.db.commit()

    # Helpers
    def _get_group(self, group_id: str) -> Group:
        group = self.db.query(Group).filter(Group.id == group_id, Group.is_active == True).first()
        if not group:
            raise HTTPException(status_code=404, detail="Grupo no encontrado")
        return group

    def _get_member(self, user_id: str, group_id: str) -> GroupMember:
        return self.db.query(GroupMember).filter(
            GroupMember.user_id == str(user_id),
            GroupMember.group_id == group_id,
            GroupMember.is_active == True
        ).first()
