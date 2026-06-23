from sqlalchemy.orm import Session
from app.repositories.invitacion_repository import InvitacionRepository

class InvitacionesService:
    def __init__(self, db: Session):
        self.db = db
        self.repo = InvitacionRepository(db)

    def obtener_invitaciones(self, usuario_id: str):
        """
        Obtiene las invitaciones del usuario delegando al repositorio correspondiente.
        """
        return self.repo.findAllByUsuario(usuario_id)

    def editar_invitacion(self, invitation_id: str, data: dict):
        """
        Edita una invitación aplicando validaciones y delegando la persistencia.
        """
        return self.repo.actualizar(invitation_id, data)
