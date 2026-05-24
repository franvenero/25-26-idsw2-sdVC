# Eliminar Grupo

Este caso de uso permite la eliminación definitiva de un grupo y toda su información relacionada.

## Flujo Principal
1. El **Usuario** (administrador) solicita la eliminación del grupo.
2. El **GestorGrupos** (Control) inicia el proceso de limpieza.
3. El **GestorGrupos** solicita a la entidad **Invitacion** que elimine todas las invitaciones pendientes asociadas al grupo.
4. El **GestorGrupos** solicita a la entidad **MiembroGrupo** que elimine todos los registros de membresía.
5. Finalmente, el **GestorGrupos** elimina la entidad **Grupo**.
6. Se informa al usuario de la eliminación exitosa.

## Responsabilidades BCE
- **VistaGrupos (Boundary):** Provee el control para disparar la eliminación.
- **GestorGrupos (Control):** Coordina la eliminación en cascada de las entidades relacionadas para mantener la integridad.
- **Invitacion (Entity):** Gestiona la eliminación de registros de invitación.
- **MiembroGrupo (Entity):** Gestiona la eliminación de registros de miembros.
- **Grupo (Entity):** Representa el grupo a ser eliminado.
