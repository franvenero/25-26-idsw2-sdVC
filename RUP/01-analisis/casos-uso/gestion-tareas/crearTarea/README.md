# Caso de Uso: Crear Tarea

## Propósito Analítico
Este caso de uso coordina la instanciación de nuevas tareas dentro del sistema. El **Controlador (GestorTareas)** actúa como mediador entre la interfaz de usuario y las entidades del dominio.

### Lógica del Controlador
1. **Inicialización**: Prepara el entorno para la creación, asegurando que existan las condiciones necesarias (ej. un grupo activo).
2. **Instanciación**: Orquesta la creación de la entidad `Tarea`.
3. **Asignación de Datos**: Transfiere los datos validados desde la frontera (`VistaCrearTarea`) a la entidad.
4. **Vinculación**: Asegura que la tarea quede correctamente relacionada con el `Grupo` responsable, manteniendo la integridad referencial definida en el modelo de dominio.
5. **Notificación**: Informa a la capa de presentación sobre el resultado de la operación.
