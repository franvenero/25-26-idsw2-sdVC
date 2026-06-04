# Diseño Técnico: Crear Tarea

Este documento detalla el diseño técnico para la creación de nuevas tareas en el sistema.

## Componentes Técnicos

1. **Capa UI (React):**
   - `CreateTaskModal`: Formulario capturador de datos con validaciones locales básicas.
   - `useTasks`: Hook que gestiona la comunicación asíncrona mediante `POST`.

2. **Capa API (FastAPI):**
   - `TaskCreateSchema`: Esquema Pydantic que valida la entrada (título obligatorio, descripción opcional, etc.).
   - `TaskRouter`: Endpoint `POST /tasks`. Asocia automáticamente la tarea al `owner_id` del usuario autenticado.

3. **Capa de Lógica y Datos:**
   - `TaskService`: Asegura que el usuario tenga permisos para crear tareas (RBAC).
   - `TaskRepository`: Realiza la inserción en la base de datos PostgreSQL.

## Consideraciones de Diseño
- **Seguridad**: El `owner_id` nunca es enviado por el cliente; el backend lo extrae del JWT para evitar suplantaciones.
- **Feedback**: El frontend espera la confirmación (201 Created) antes de cerrar el formulario y refrescar el listado.
