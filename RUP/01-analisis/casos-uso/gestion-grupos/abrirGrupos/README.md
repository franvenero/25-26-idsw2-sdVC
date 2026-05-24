# Abrir Grupos

Este caso de uso permite al usuario visualizar la lista de grupos a los que pertenece o que administra.

## Flujo Principal
1. El **Usuario** solicita abrir la vista de grupos.
2. La **VistaGrupos** (Boundary) solicita al **GestorGrupos** (Control) los grupos asociados al usuario.
3. El **GestorGrupos** consulta la entidad **Grupo** para obtener la lista correspondiente.
4. El **GestorGrupos** retorna la lista a la **VistaGrupos**.
5. La **VistaGrupos** presenta la información al usuario.

## Responsabilidades BCE
- **VistaGrupos (Boundary):** Interfaz de usuario que muestra la lista de grupos y captura la intención de navegación.
- **GestorGrupos (Control):** Coordina la recuperación de datos y la lógica de negocio para filtrar grupos por usuario.
- **Grupo (Entity):** Almacena y provee acceso a la información persistente de los grupos.
