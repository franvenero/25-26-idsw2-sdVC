import uuid
from sqlalchemy import Column, String, Boolean, ForeignKey, Table
from sqlalchemy.orm import relationship
from app.core.database import Base

# Tabla asociativa para la relación N:M recursiva de dependencias
task_dependencies = Table(
    "task_dependencies",
    Base.metadata,
    Column("task_id", ForeignKey("tasks.id", ondelete="CASCADE"), primary_key=True),
    Column("depends_on_id", ForeignKey("tasks.id", ondelete="CASCADE"), primary_key=True),
)

class Task(Base):
    __tablename__ = "tasks"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    is_completed = Column(Boolean, default=False)
    is_deleted = Column(Boolean, default=False)  # Borrado lógico
    
    owner_id = Column(String, ForeignKey("users.id"))
    assigned_to_id = Column(String, ForeignKey("users.id"), nullable=True)
    group_id = Column(String, ForeignKey("groups.id"), index=True, nullable=False)

    owner = relationship("User", foreign_keys=[owner_id], back_populates="tasks_owned")
    assigned_to = relationship("User", foreign_keys=[assigned_to_id], back_populates="tasks_assigned")
    group = relationship("Group", backref="tasks")

    # Relaciones de dependencia recursiva
    dependencies = relationship(
        "Task",
        secondary=task_dependencies,
        primaryjoin=id == task_dependencies.c.task_id,
        secondaryjoin=id == task_dependencies.c.depends_on_id,
        backref="required_by"
    )
