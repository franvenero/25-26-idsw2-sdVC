# Sesiones de VibeCoding / idsw2 / gII · uneatlantico / BREÑOTASK

<div align="center">

[![Proceso RUP](https://img.shields.io/badge/⚙️_PROCESO_RUP-003b6f?style=for-the-badge)](./RUP) [![Modelo del Dominio](https://img.shields.io/badge/🗂️_MODELO_DEL_DOMINIO-003b6f?style=for-the-badge)](./_contexto/modelosUML/modeloDeDominio) [![Casos de Uso](https://img.shields.io/badge/👥_CASOS_DE_USO-003b6f?style=for-the-badge)](./_contexto/01-analisis/casos-uso) [![Diagramas de Contexto](https://img.shields.io/badge/📊_DIAGRAMAS_DE_CONTEXTO-003b6f?style=for-the-badge)](./_contexto/actoresYCasosDeUso/diagramaContexto)

[![Detalle](https://img.shields.io/badge/🔍_DETALLE-003b6f?style=for-the-badge)](./_contexto/actoresYCasosDeUso/detalladoYPrototipado) [![Análisis](https://img.shields.io/badge/🧱_ANÁLISIS-003b6f?style=for-the-badge)](./RUP/01-analisis) [![Diseño](https://img.shields.io/badge/🎨_DISEÑO-003b6f?style=for-the-badge)](./RUP/02-diseño) [![Desarrollo](https://img.shields.io/badge/💻_DESARROLLO-003b6f?style=for-the-badge)](./frontend/src) 

[![Reuniones](https://img.shields.io/badge/🎥_REUNIONES-003b6f?style=for-the-badge)](./_contexto/modelosUML)  [![Log de Conversación](https://img.shields.io/badge/💬_LOG_DE_CONVERSACIÓN-003b6f?style=for-the-badge)](./conversation-log.md)

</div>

---

### Presentación del Sistema

BreñoTask es una plataforma web moderna diseñada para la gestión colaborativa de tareas, optimizando el flujo de trabajo mediante un sistema estricto de roles y dependencias. La aplicación permite a los usuarios organizarse en grupos, asignar responsabilidades y visualizar el progreso de proyectos complejos de manera estructurada y eficiente.

> **Nota de Arquitectura:** El sistema implementa el patrón cliente-servidor mediante una arquitectura desacoplada. La capa de presentación está desarrollada en React con TypeScript, garantizando una interfaz reactiva y tipado seguro. El motor de servicios y persistencia se fundamenta en FastAPI (Python), utilizando SQLAlchemy como ORM para la comunicación con Microsoft SQL Server, asegurando una gestión de datos robusta y escalable.

---

### Funcionalidades Clave

- **Control de Acceso Basado en Roles (RBAC):** Gestión jerárquica con tres niveles de autoridad (Administrador, Miembro Administrador, Miembro) para el aislamiento de responsabilidades y la protección de datos sensibles.

- **Motor de Dependencias Estrictas:** Validación de grafos dirigida (DFS) que bloquea la ejecución de actividades si existen predecesores pendientes, asegurando un orden lógico en la ejecución de procesos y evitando la creación de ciclos infinitos.

- **Persistencia y Estabilidad Relacional:** Integración optimizada con SQL Server, implementando identificadores globales estandarizados (String 36) y una gestión controlada de operaciones en cascada para garantizar la integridad referencial y prevenir conflictos cíclicos a nivel de esquema.

---

### Arquitectura y Stack Tecnológico

#### Frontend (Cliente)
- **Framework:** React con TypeScript (.tsx) para una interfaz de usuario tipada y mantenible.
- **Enrutamiento y Estado:** React Router DOM para la navegación protegida y Context API para la gestión del estado global de autenticación, integrados con Axios para el consumo asíncrono de servicios REST.

#### Backend (Servidor API RESTful)
- **Framework:** FastAPI (Python), seleccionado por su alto rendimiento y soporte nativo de operaciones asíncronas.
- **ORM & Validación:** SQLAlchemy como motor de mapeo objeto-relacional y Pydantic para el modelado de esquemas y validación estricta de datos.
- **Seguridad:** Implementación de autenticación basada en Tokens JWT (OAuth2) y protección de credenciales mediante el algoritmo de hash bcrypt.

#### Capa de Persistencia (Base de Datos)
- **Motor:** Microsoft SQL Server (LocalDB) como sistema de gestión de base de datos relacional de nivel empresarial.
- **Conector:** Integración mediante el Driver ODBC 17 (pyodbc), optimizando la comunicación entre el entorno Python y el motor de SQL Server.

> El sistema se rige bajo un patrón de diseño estricto de separación de responsabilidades (Cliente-Servidor), asegurando que la lógica de negocio y la persistencia permanezcan independientes de la interfaz de usuario.
