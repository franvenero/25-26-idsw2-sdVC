# Invitar Usuario

Este caso de uso permite a un administrador invitar a otros usuarios a unirse a su grupo.

## Flujo Principal
1. El **Usuario** ingresa el correo o nombre de usuario del invitado.
2. El **GestorGrupos** (Control) busca al **Usuario** (Entity) en el sistema.
3. El **GestorGrupos** valida con la entidad **MiembroGrupo** que el usuario no sea ya parte del grupo.
4. Si no es miembro, el **GestorGrupos** crea una nueva **Invitacion** (Entity).
5. Se notifica al usuario que la invitación ha sido enviada.

## Responsabilidades BCE
- **FormularioInvitacion (Boundary):** Interfaz para buscar e invitar usuarios.
- **GestorGrupos (Control):** Realiza las validaciones de existencia y pertenencia previa antes de proceder.
- **Usuario (Entity):** Provee la información de los usuarios registrados en el sistema.
- **MiembroGrupo (Entity):** Utilizada para verificar el estado actual de pertenencia.
- **Invitacion (Entity):** Registra la invitación pendiente para el usuario.
