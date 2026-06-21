from typing import Optional
from fastapi import HTTPException, status
from app.repositories.user_repository import UserRepository
from app.core.security import verify_password, create_access_token, get_password_hash
from app.models.user import User
from app.schemas.user import UserCreate

class AuthService:
    def __init__(self, repository: UserRepository):
        self.repository = repository

    def authenticate_user(self, email_or_username: str, password: str) -> Optional[User]:
        # Intentar buscar por email (trazabilidad RUP)
        user = self.repository.buscarPorEmail(email_or_username)
        if not user:
            # Fallback por username para compatibilidad general
            user = self.repository.get_by_username(email_or_username)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

    def login(self, email: str, password: str) -> Optional[str]:
        """
        Autentica al usuario por email/username y genera el token JWT.
        """
        user = self.authenticate_user(email, password)
        if not user:
            return None
        return create_access_token(subject=str(user.id))

    def logout(self, token: str) -> bool:
        """
        Procesa la invalidación de la sesión (logout).
        En un entorno stateless, este método registra la salida o podría añadir
        el token a una blacklist (lista negra) en caché o base de datos.
        """
        # Simulación de la invalidación / registro de salida
        return True

    def register_user(self, user_in: UserCreate) -> User:
        # El servicio valida si el usuario ya existe
        if self.repository.get_by_username(user_in.username):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El nombre de usuario ya está registrado"
            )
        
        if user_in.email and self.repository.buscarPorEmail(user_in.email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El correo electrónico ya está registrado"
            )

        db_user = User(
            username=user_in.username,
            email=user_in.email,
            hashed_password=get_password_hash(user_in.password),
            role=user_in.role,
            group_id=user_in.group_id,
            is_active=True
        )
        return self.repository.create(db_user)
