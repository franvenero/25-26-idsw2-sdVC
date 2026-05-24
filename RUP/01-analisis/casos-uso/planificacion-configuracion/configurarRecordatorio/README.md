# Caso de Uso: Configurar Recordatorio

## Flujo Principal
El usuario programa alertas o notificaciones para una tarea. El sistema permite añadir múltiples recordatorios a una misma tarea, gestionando su persistencia y asociación.

## Responsabilidades BCE

| Objeto | Tipo | Responsabilidad |
| :--- | :--- | :--- |
| **VistaRecordatorio** | Boundary | Interfaz para definir el tiempo de antelación y tipo de recordatorio. |
| **GestorPlanificacion** | Control | Gestiona la adición de nuevos recordatorios a la lista de la tarea. |
| **Recordatorio** | Entity | Representa una alerta específica con su tiempo y estado. |
| **Tarea** | Entity | Mantiene la colección de recordatorios asociados. |
