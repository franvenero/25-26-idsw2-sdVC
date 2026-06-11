# Análisis de Colaboración: configurarRecordatorio()

## Propósito
Análisis de colaboración del caso de uso configurarRecordatorio() para permitir la programación de alertas y notificaciones asociadas a una tarea, mejorando el seguimiento y cumplimiento de actividades.

## Diagrama de Secuencia (Mermaid)

```mermaid
sequenceDiagram
    autonumber
    actor Usuario
    participant Frontend as Cliente (React)
    participant Backend as Servidor (FastAPI)
    participant BD as Base de Datos (SQL Server)

    Usuario->>Frontend: Establece fecha/hora de alerta
    Frontend->>Backend: POST /tasks/{task_id}/reminders (datetime)
    Backend->>Backend: Valida formato temporal
    Backend->>BD: INSERT INTO reminders (task_id, trigger_at)
    BD-->>Backend: Confirmación de registro
    Backend-->>Frontend: 201 Created (Alarma programada)
    Frontend-->>Usuario: Notifica que el recordatorio está activo
```
