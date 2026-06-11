# Sesiones de VibeCoding / idsw2 / gII · uneatlantico / VIBETASK

[ Análisis ](./RUP/01-analisis) | [ Diseño ](./RUP/02-diseño) | [ Frontend (React) ](./frontend/src) | [ Backend (FastAPI) ](./backend/app) | [ Base de Datos ](./backend/seed.py) | [ Bitácora de Desarrollo ](./conversation-log.md)

---

### Presentación del Sistema

VibeTask es una plataforma web moderna diseñada para la gestión colaborativa de tareas, optimizando el flujo de trabajo mediante un sistema estricto de roles y dependencias. La aplicación permite a los usuarios organizarse en grupos, asignar responsabilidades y visualizar el progreso de proyectos complejos de manera estructurada y eficiente.

> **Nota de Arquitectura:** El sistema implementa el patrón cliente-servidor mediante una arquitectura desacoplada. La capa de presentación está desarrollada en React con TypeScript, garantizando una interfaz reactiva y tipado seguro. El motor de servicios y persistencia se fundamenta en FastAPI (Python), utilizando SQLAlchemy como ORM para la comunicación con Microsoft SQL Server, asegurando una gestión de datos robusta y escalable.

---

### Funcionalidades Clave

- **Control de Acceso Basado en Roles (RBAC):** Gestión jerárquica con tres niveles de autoridad (Administrador, Miembro Administrador, Miembro) para el aislamiento de responsabilidades y la protección de datos sensibles.

- **Motor de Dependencias Estrictas:** Validación de grafos dirigida (DFS) que bloquea la ejecución de actividades si existen predecesores pendientes, asegurando un orden lógico en la ejecución de procesos y evitando la creación de ciclos infinitos.

- **Persistencia y Estabilidad Relacional:** Integración optimizada con SQL Server, implementando identificadores globales estandarizados (String 36) y una gestión controlada de operaciones en cascada para garantizar la integridad referencial y prevenir conflictos cíclicos a nivel de esquema.
