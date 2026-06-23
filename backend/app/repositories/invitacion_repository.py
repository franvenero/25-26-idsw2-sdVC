from sqlalchemy.orm import Session
from app.models.invitation import Invitation

class InvitacionRepository:
    def __init__(self, db: Session):
        self.db = db

    def findAllByUsuario(self, user_id: str) -> list[Invitation]:
        """
        Obtiene todas las invitaciones de un usuario a través de SQLAlchemy.
        """
        return self.db.query(Invitation).filter(
            Invitation.user_id == str(user_id)
        ).all()

    def actualizar(self, invitation_id: str, data: dict) -> Invitation:
        """
        Actualiza los campos de una invitación específica.
        """
        inv = self.db.query(Invitation).filter(Invitation.id == invitation_id).first()
        if inv:
            for key, value in data.items():
                setattr(inv, key, value)
            self.db.commit()
            self.db.refresh(inv)
        return inv
