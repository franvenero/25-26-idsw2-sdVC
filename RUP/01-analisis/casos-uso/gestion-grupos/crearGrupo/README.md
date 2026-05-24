# Crear Grupo

Este caso de uso permite a un usuario crear un nuevo grupo de trabajo compartido.

## Flujo Principal
1. El **Usuario** completa los datos necesarios en el formulario.
2. El **FormularioGrupo** (Boundary) envía la información al **GestorGrupos** (Control).
3. El **GestorGrupos** instancia una nueva entidad **Grupo**.
4. El **GestorGrupos** crea automáticamente un registro en **MiembroGrupo** asignando al creador como administrador del grupo.
5. Se confirma la creación exitosa al usuario.

## Responsabilidades BCE
- **FormularioGrupo (Boundary):** Interfaz para la entrada de datos (nombre, descripción, etc.).
- **GestorGrupos (Control):** Orquestador de la creación del grupo y la vinculación inicial del creador.
- **Grupo (Entity):** Representa los datos del grupo creado.
- **MiembroGrupo (Entity):** Representa la relación entre un usuario y un grupo, incluyendo su rol.
