from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.user import UserLogin
from app.schemas.token import Token
from app.repositories.user_repository import UserRepository
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])

def get_auth_service(db: Session = Depends(get_db)) -> AuthService:
    """
    Proveedor de dependencia para AuthService.
    Encapsula la instanciación del repositorio y el servicio.
    """
    repository = UserRepository(db)
    return AuthService(repository)

@router.post("/login", response_model=Token)
async def login(
    credentials: UserLogin, 
    auth_service: AuthService = Depends(get_auth_service)
):
    """
    Endpoint de inicio de sesión.
    Recibe el servicio de autenticación mediante inyección de dependencias.
    """
    access_token = auth_service.login(credentials.username, credentials.password)
    
    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return {"access_token": access_token, "token_type": "bearer"}
