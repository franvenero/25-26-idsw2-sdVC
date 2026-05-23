# Caso de Uso: Eliminar Tarea

## Propósito Analítico
Este caso de uso se encarga de la remoción segura de tareas del sistema, asegurando que no queden referencias huérfanas o se viole la integridad de los datos.

### Lógica del Controlador
1. **Validación de Estado**: El **GestorTareas** verifica si la tarea es elegible para ser eliminada (ej. si no tiene subtareas críticas asociadas o si el rol del usuario lo permite).
2. **Desvinculación**: Antes de la destrucción, el controlador debe gestionar la ruptura de relaciones con `Grupo`, `Usuario` y otras tareas vinculadas (`RelacionTareas`).
3. **Ciclo de Vida**: Ejecuta la destrucción lógica o física de la entidad `Tarea`.
4. **Actualización de Interfaz**: Coordina con la frontera para refrescar la lista de tareas y confirmar la acción al usuario.
