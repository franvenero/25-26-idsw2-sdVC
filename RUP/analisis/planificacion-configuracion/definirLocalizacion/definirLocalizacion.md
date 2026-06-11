# Análisis de Colaboración: definirLocalizacion()

## Propósito
Análisis de colaboración del caso de uso definirLocalizacion() para especificar el lugar físico o virtual donde se desarrollará la tarea, permitiendo una mejor coordinación logística familiar.

## Diagrama de Secuencia (Mermaid)

```mermaid
sequenceDiagram
    autonumber
    actor Usuario
    participant Frontend as Cliente (React)
    participant Backend as Servidor (FastAPI)
    participant BD as Base de Datos (SQL Server)

    Usuario->>Frontend: Introduce la ubicación (texto o coordenadas)
    Frontend->>Backend: PATCH /tasks/{task_id}/location (location_data)
    Backend->>BD: UPDATE tasks SET location = {location_data}
    BD-->>Backend: Confirmación de persistencia
    Backend-->>Frontend: 200 OK (Estado actualizado)
    Frontend-->>Usuario: Refleja la localización en la vista de tarea
```
