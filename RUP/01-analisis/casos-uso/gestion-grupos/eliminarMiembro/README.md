# Eliminar Miembro

Este caso de uso permite expulsar a un usuario de un grupo.

## Flujo Principal
1. El **Usuario** (administrador) solicita la eliminación de un miembro del grupo.
2. El **GestorGrupos** (Control) recibe la petición.
3. El **GestorGrupos** solicita a la entidad **MiembroGrupo** que elimine el registro de vinculación.
4. Se confirma la eliminación exitosa.

## Responsabilidades BCE
- **VistaMiembros (Boundary):** Provee la interfaz para gestionar a los integrantes.
- **GestorGrupos (Control):** Procesa la lógica de expulsión de miembros.
- **MiembroGrupo (Entity):** Elimina la persistencia del vínculo entre el usuario y el grupo.
