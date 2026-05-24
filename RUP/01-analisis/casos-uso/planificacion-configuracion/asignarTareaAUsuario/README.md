# Caso de Uso: Asignar Tarea a Usuario

## Flujo Principal
El usuario responsable de la planificación asigna la tarea a un usuario específico. El sistema valida que el usuario exista en el sistema y actualiza el rol de responsable en la tarea.

## Responsabilidades BCE

| Objeto | Tipo | Responsabilidad |
| :--- | :--- | :--- |
| **VistaAsignacion** | Boundary | Interfaz para seleccionar usuarios del sistema. |
| **GestorPlanificacion** | Control | Valida la disponibilidad del usuario y ejecuta la vinculación de responsabilidad. |
| **Usuario** | Entity | Representa al sujeto que recibirá la asignación. |
| **Tarea** | Entity | Registra al usuario asignado como responsable. |
