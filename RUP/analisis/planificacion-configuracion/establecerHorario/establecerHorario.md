# Análisis de Colaboración: establecerHorario()

## Propósito
Análisis de colaboración del caso de uso establecerHorario() para definir los parámetros temporales de una tarea, garantizando que el cronograma familiar esté actualizado y sincronizado.

## Diagrama de Secuencia (Mermaid)

```mermaid
sequenceDiagram
    autonumber
    actor Usuario
    participant Frontend as Cliente (React)
    participant Backend as Servidor (FastAPI)
    participant BD as Base de Datos (SQL Server)

    Usuario->>Frontend: Define fecha de inicio y fin
    Frontend->>Backend: PATCH /tasks/{task_id}/schedule (start_date, end_date)
    Backend->>Backend: Valida coherencia (inicio < fin)
    Backend->>BD: UPDATE tasks SET start_at = {start}, end_at = {end}
    BD-->>Backend: Confirmación de actualización
    Backend-->>Frontend: 200 OK (Horario sincronizado)
    Frontend-->>Usuario: Muestra el intervalo temporal en el calendario
```
