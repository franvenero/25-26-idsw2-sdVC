# Caso de Uso: Marcar como Completada

## Propósito Analítico
Este caso de uso refleja el cambio de estado de una tarea hacia su finalización, capturando metadatos relevantes como la fecha de cierre.

### Lógica del Controlador
1. **Transición de Estado**: El **GestorTareas** es responsable de asegurar que la transición de estado de la `Tarea` sea válida.
2. **Registro de Trazabilidad**: Invoca métodos en la entidad para registrar el momento exacto de la finalización.
3. **Persistencia de Progreso**: Asegura que el cambio se refleje en la base de datos y pueda afectar a otros elementos (ej. progreso del grupo o resolución de tareas dependientes).
4. **Feedback Visual**: Indica a la frontera la actualización exitosa para que el usuario reciba la confirmación del cambio de estado (ej. tachado de la tarea o cambio de color).
