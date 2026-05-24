# Abrir Invitaciones

Este caso de uso permite al usuario visualizar las invitaciones pendientes que ha recibido para unirse a grupos.

## Flujo Principal
1. El **Usuario** accede a la sección de invitaciones.
2. La **VistaInvitaciones** (Boundary) solicita al **GestorGrupos** (Control) las invitaciones para el usuario actual.
3. El **GestorGrupos** consulta la entidad **Invitacion** filtrando por el identificador del usuario.
4. El **GestorGrupos** devuelve la lista de invitaciones pendientes.
5. Se muestran las invitaciones en la interfaz.

## Responsabilidades BCE
- **VistaInvitaciones (Boundary):** Interfaz para visualizar y gestionar las invitaciones recibidas.
- **GestorGrupos (Control):** Orquestador de la búsqueda de invitaciones pendientes.
- **Invitacion (Entity):** Almacena el estado y los detalles de las invitaciones enviadas a los usuarios.
