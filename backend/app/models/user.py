import uuid
import enum
from sqlalchemy import Column, String, Boolean, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base

class UserRole(str, enum.Enum):
    ADMIN = "ADMIN"
    ADMIN_MEMBER = "ADMIN_MEMBER"
    MEMBER = "MEMBER"

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(SQLEnum(UserRole), default=UserRole.MEMBER, nullable=False)
    group_id = Column(String, index=True, nullable=True)  # UUID string or name
    is_active = Column(Boolean, default=True)
