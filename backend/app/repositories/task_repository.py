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

    def actualizar_estado(self, task_id: str, is_completed: bool) -> Task:
        task = self.db.query(Task).filter(Task.id == task_id).first()
        if task:
            task.is_completed = is_completed
            self.db.commit()
            self.db.refresh(task)
        return task
