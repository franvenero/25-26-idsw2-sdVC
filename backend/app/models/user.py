import uuid
import enum
from sqlalchemy import Column, String, Boolean, Enum as SQLEnum
from sqlalchemy.orm import relationship
from app.core.database import Base

class UserRole(str, enum.Enum):
    ADMIN = "Administrador"
    ADMIN_MEMBER = "Miembro Administrador"
    MEMBER = "Miembro"

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    username = Column(String(255), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(SQLEnum(UserRole), default=UserRole.MEMBER, nullable=False)
    group_id = Column(String(36), index=True, nullable=True)  # UUID string or name
    is_active = Column(Boolean, default=True)

    # Relaciones con Task
    tasks_owned = relationship("Task", foreign_keys="[Task.owner_id]", back_populates="owner")
    tasks_assigned = relationship("Task", foreign_keys="[Task.assigned_to_id]", back_populates="assigned_to")
