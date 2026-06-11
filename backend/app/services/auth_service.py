from typing import Optional
from app.repositories.user_repository import UserRepository
from app.core.security import verify_password, create_access_token, get_password_hash
from app.models.user import User
from app.schemas.user import UserCreate

class AuthService:
    def __init__(self, repository: UserRepository):
        self.repository = repository

    def authenticate_user(self, username: str, password: str) -> Optional[User]:
        user = self.repository.get_by_username(username)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

    def login(self, username: str, password: str) -> Optional[str]:
        user = self.authenticate_user(username, password)
        if not user:
            return None
        # Usamos el ID como subject del token
        return create_access_token(subject=user.id)

    def register_user(self, user_in: UserCreate) -> User:
        db_user = User(
            username=user_in.username,
            email=user_in.email,
            hashed_password=get_password_hash(user_in.password),
            role=user_in.role,
            group_id=user_in.group_id,
            is_active=True
        )
        return self.repository.create(db_user)
