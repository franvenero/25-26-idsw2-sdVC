from typing import Optional
from app.repositories.user_repository import UserRepository
from app.core.security import verify_password, create_access_token
from app.models.user import User

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
        return create_access_token(subject=user.id)
