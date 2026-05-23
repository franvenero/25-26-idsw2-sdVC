# Caso de Uso: Editar Tarea

## Propósito Analítico
Este caso de uso gestiona la modificación de la información de tareas existentes y asegura que los cambios no introduzcan inconsistencias, especialmente en la programación temporal.

### Lógica del Controlador
1. **Recuperación**: Obtiene el estado actual de la entidad `Tarea` para su visualización en la frontera.
2. **Validación de Reglas de Negocio**: Antes de persistir cambios, el **GestorTareas** consulta a la entidad `ConflictoHorario` para verificar que la nueva programación (si ha cambiado) no solape con otras responsabilidades del usuario o recursos.
3. **Sincronización**: Actualiza los atributos de la `Tarea` y sus objetos asociados (`Horario`, `Localizacion`, `Recordatorio`).
4. **Gestión de Errores**: Si se detecta un conflicto, el controlador debe gestionar el flujo de retorno a la vista con la información específica del error para que el usuario pueda corregirlo.
