# Caso de Uso: Abrir Tareas

## Propósito Analítico
Este caso de uso actúa como el punto de entrada principal o "hub" para la gestión de tareas dentro de un contexto activo (como un grupo). Su propósito es presentar la lista de tareas al administrador y coordinar la navegación hacia otras operaciones de gestión (crear, editar, eliminar, completar).

### Lógica del Controlador
En el patrón BCE, el **Controlador (GestorTareas o GestorVistas)** tiene las siguientes responsabilidades para este flujo:
1. **Recuperación de Datos**: Coordina con la entidad `Grupo` y las entidades `Tarea` asociadas para recuperar la lista actualizada.
2. **Presentación (Distribución)**: Proporciona la información a la frontera (`VistaListaTareas`) para su visualización.
3. **Filtros**: Procesa solicitudes de filtrado provenientes de la frontera para reducir el conjunto de entidades mostradas según el estado u otros criterios.
4. **Enrutamiento**: Recibe las intenciones del usuario desde la vista (ej. "solicita editar tarea") y dirige el flujo de control hacia el caso de uso correspondiente.
