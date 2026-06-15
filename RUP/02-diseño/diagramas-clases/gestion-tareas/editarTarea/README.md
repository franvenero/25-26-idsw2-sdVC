# Diseño Técnico: Editar Tarea

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

Este documento detalla el diseño técnico para la modificación de tareas existentes.

## Arquitectura de la Solución

1. **Capa UI (React):**
   - `EditTaskModal`: Interfaz que precarga los datos de la tarea seleccionada y permite su edición parcial o total.
   - `useTasks`: Hook que gestiona la petición `PUT` hacia el backend.

2. **Capa API (FastAPI):**
   - `TaskUpdateSchema`: Esquema Pydantic con campos opcionales (`Optional`), permitiendo actualizaciones parciales (PATCH-like behavior en un PUT).
   - `TaskRouter`: Endpoint `PUT /tasks/{id}`.

3. **Lógica de Negocio y Seguridad:**
   - **Validación de Propiedad**: El `TaskService` verifica que el usuario que intenta editar sea el creador de la tarea o tenga rol `ADMIN`.
   - **Persistencia**: El `TaskRepository` aplica los cambios sobre la entidad recuperada de la base de datos.

## Control de Errores
- Si la tarea no existe: `404 Not Found`.
- Si el usuario no tiene permisos: `403 Forbidden`.
- Si los datos son inválidos: `422 Unprocessable Entity`.
