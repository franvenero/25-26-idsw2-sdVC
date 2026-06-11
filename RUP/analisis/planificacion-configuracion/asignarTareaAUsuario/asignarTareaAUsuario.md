# Análisis de Colaboración: asignarTareaAUsuario()

## Propósito
Análisis de colaboración del caso de uso asignarTareaAUsuario() para vincular formalmente a un miembro del grupo con una tarea específica, definiendo la responsabilidad de ejecución.

## Diagrama de Secuencia (Mermaid)

```mermaid
sequenceDiagram
    autonumber
    actor Usuario
    participant Frontend as Cliente (React)
    participant Backend as Servidor (FastAPI)
    participant BD as Base de Datos (SQL Server)

    Usuario->>Frontend: Selecciona un miembro para asignar
    Frontend->>Backend: PATCH /tasks/{task_id}/assign (user_id)
    Backend->>Backend: Valida que el usuario pertenezca al grupo
    Backend->>BD: UPDATE tasks SET assigned_to_id = {user_id}
    BD-->>Backend: Confirmación de actualización
    Backend-->>Frontend: 200 OK (Tarea actualizada)
    Frontend-->>Usuario: Muestra confirmación de asignación exitosa
```
