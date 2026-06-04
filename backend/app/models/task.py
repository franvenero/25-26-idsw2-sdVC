from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
import uuid
from app.core.database import Base

class TaskStatus(str, enum.Enum):
    PENDIENTE = "PENDIENTE"
    EN_PROGRESO = "EN_PROGRESO"
    COMPLETADA = "COMPLETADA"

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    status = Column(SQLEnum(TaskStatus), default=TaskStatus.PENDIENTE, nullable=False)
    
    # Claves Foráneas vinculadas al UUID de User
    creator_id = Column(ForeignKey("users.id"), nullable=False)
    assigned_to_id = Column(ForeignKey("users.id"), nullable=True)
    
    # Campo opcional para vincular a un grupo (según diseño RUP)
    # Por ahora se deja como nullable hasta que el módulo de grupos esté implementado
    group_id = Column(String, nullable=True) 
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relaciones
    creator = relationship("User", foreign_keys=[creator_id], backref="created_tasks")
    assigned_to = relationship("User", foreign_keys=[assigned_to_id], backref="assigned_tasks")
