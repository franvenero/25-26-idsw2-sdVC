import uuid
import enum
from sqlalchemy import Column, String, Boolean, ForeignKey, Enum as SQLEnum, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class GroupMemberRole(str, enum.Enum):
    ADMIN = "ADMIN"
    ADMIN_MEMBER = "ADMIN_MEMBER"
    MEMBER = "MEMBER"

class Group(Base):
    __tablename__ = "groups"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relaciones
    members = relationship("GroupMember", back_populates="group", cascade="all, delete-orphan")
    invitations = relationship("Invitation", back_populates="group", cascade="all, delete-orphan")

class GroupMember(Base):
    __tablename__ = "group_members"

    user_id = Column(ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    group_id = Column(ForeignKey("groups.id", ondelete="CASCADE"), primary_key=True)
    role = Column(SQLEnum(GroupMemberRole), default=GroupMemberRole.MEMBER, nullable=False)
    is_active = Column(Boolean, default=True)
    joined_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relaciones
    user = relationship("User", backref="group_memberships")
    group = relationship("Group", back_populates="members")
