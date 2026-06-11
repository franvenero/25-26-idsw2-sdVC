# Análisis de Colaboración: abrirPlanificacion()

## Propósito
Análisis de colaboración del caso de uso abrirPlanificacion() para visualizar y gestionar de forma centralizada todos los parámetros de configuración de una tarea (horario, localización, recordatorios y asignación).

## Diagrama de Secuencia (Mermaid)

```mermaid
sequenceDiagram
    autonumber
    actor Usuario
    participant Frontend as Cliente (React)
    participant Backend as Servidor (FastAPI)
    participant BD as Base de Datos (SQL Server)

    Usuario->>Frontend: Solicita abrir configuración de tarea
    Frontend->>Backend: GET /tasks/{task_id}/config (fetch details)
    Backend->>BD: SELECT * FROM tasks WHERE id = {task_id}
    BD-->>Backend: Retorna datos de configuración
    Backend-->>Frontend: 200 OK (Datos de la tarea)
    Frontend->>Frontend: Renderiza panel centralizado de gestión
    Frontend-->>Usuario: Muestra interfaz de configuración completa
```
