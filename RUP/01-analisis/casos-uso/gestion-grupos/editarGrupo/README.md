# Editar Grupo

Este caso de uso permite modificar la información básica de un grupo existente.

## Flujo Principal
1. El **Usuario** modifica los campos deseados en la interfaz.
2. El **FormularioGrupo** (Boundary) envía los cambios al **GestorGrupos** (Control).
3. El **GestorGrupos** localiza la entidad **Grupo** correspondiente.
4. El **GestorGrupos** solicita a la entidad que actualice sus datos.
5. Se notifica el éxito de la operación al usuario.

## Responsabilidades BCE
- **FormularioGrupo (Boundary):** Permite la edición de los atributos del grupo.
- **GestorGrupos (Control):** Gestiona la lógica de actualización y validación de permisos (implícito).
- **Grupo (Entity):** Encapsula los datos del grupo y su persistencia.
