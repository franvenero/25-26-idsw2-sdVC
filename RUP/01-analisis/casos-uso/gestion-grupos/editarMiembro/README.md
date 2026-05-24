# Editar Miembro

Este caso de uso permite modificar el rol o los permisos de un usuario dentro de un grupo.

## Flujo Principal
1. El **Usuario** (administrador) selecciona a un miembro y cambia su rol.
2. El **GestorGrupos** (Control) recibe la solicitud de actualización.
3. El **GestorGrupos** localiza el registro de **MiembroGrupo** (Entity).
4. El **GestorGrupos** actualiza el rol en la entidad.
5. Se confirma la actualización al administrador.

## Responsabilidades BCE
- **VistaMiembros (Boundary):** Lista los integrantes del grupo y ofrece opciones de edición.
- **GestorGrupos (Control):** Coordina el cambio de privilegios dentro del grupo.
- **MiembroGrupo (Entity):** Almacena la relación específica de un usuario con un grupo y sus facultades.
