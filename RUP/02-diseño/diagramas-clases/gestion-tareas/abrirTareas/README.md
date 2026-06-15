# Diseño Técnico: Abrir Tareas (Listado)

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

Este documento describe el diseño técnico para la visualización del listado de tareas, implementado con React y FastAPI.

## Componentes Clave

1. **Capa UI (React):**
   - `DashboardPage`: Contenedor principal que orquestal el montaje de la vista.
   - `useTasks`: Hook personalizado que encapsula la lógica de fetching y estado global de tareas.
   - `TaskList`: Componente de presentación que itera sobre el array de tareas.

2. **Capa API (FastAPI):**
   - `TaskRouter`: Expone el endpoint `GET /tasks`. Valida el JWT y extrae el usuario actual.
   - `TaskService`: Implementa el filtrado según el rol. Los `ADMIN` ven todas las tareas, los `MEMBER` solo las propias.

3. **Capa de Datos:**
   - `TaskRepository`: Encapsula las consultas SQLAlchemy a la tabla `tasks`.

## Flujo de Datos
El flujo comienza en el montaje de la `DashboardPage`, que activa el hook `useTasks`. Este realiza una petición autenticada al backend. El backend aplica las reglas de visibilidad (RBAC) y retorna el JSON que finalmente actualiza el estado local del frontend.
