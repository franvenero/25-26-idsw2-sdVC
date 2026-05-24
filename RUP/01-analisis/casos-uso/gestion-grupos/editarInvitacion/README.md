# Editar Invitación

Este caso de uso permite a un usuario aceptar o rechazar una invitación para unirse a un grupo.

## Flujo Principal
1. El **Usuario** selecciona la opción de aceptar o rechazar en una invitación específica.
2. El **GestorGrupos** (Control) recupera la información de la **Invitacion** (Entity).
3. Si la acción es "ACEPTAR":
    - El **GestorGrupos** crea un nuevo registro en **MiembroGrupo** (Entity) vinculando al usuario con el grupo con el rol de colaborador.
4. Independientemente de la acción (aceptar o rechazar), el **GestorGrupos** solicita a la entidad **Invitacion** que elimine el registro de la invitación procesada.
5. Se notifica el resultado y se actualiza la interfaz.

## Responsabilidades BCE
- **VistaInvitaciones (Boundary):** Provee los controles para responder a las invitaciones.
- **GestorGrupos (Control):** Lógica de decisión para la creación de membresías y limpieza de invitaciones.
- **Invitacion (Entity):** Almacena y permite la eliminación del registro de invitación.
- **MiembroGrupo (Entity):** Crea la nueva relación oficial entre el usuario y el grupo si se acepta la invitación.
