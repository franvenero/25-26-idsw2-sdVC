from sqlalchemy.orm import Session
from app.models.task import Task

class TaskRepository:
    def __init__(self, db: Session):
        self.db = db

    def obtenerTareasPorGrupo(self, group_id: str) -> list[Task]:
        return self.db.query(Task).filter(
            Task.group_id == group_id,
            Task.is_deleted == False
        ).all()
