from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Sistema de Gestión de Tareas Compartidas"
    API_V1_STR: str = "/api/v1"
    
    # Seguridad
    SECRET_KEY: str = "70923847a98b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2" # En producción usar variable de entorno
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 días

    # Base de Datos - Migración a SQL Server (LocalDB)
    # Usamos autenticación de Windows y el driver ODBC 17
    DATABASE_URL: str = "mssql+pyodbc://(localdb)\\MSSQLLocalDB/VibeTaskDB?driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes"

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://127.0.0.1:5173"]

    class Config:
        case_sensitive = True

settings = Settings()
