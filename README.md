# Sesiones de VibeCoding / idsw2 / gII · uneatlantico / BREÑOTASK

<div align="center">

[![Inicio](https://img.shields.io/badge/Inicio-F5F5F5?style=flat-square&labelColor=F5F5F5&color=F5F5F5)](./)
[![RUP](https://img.shields.io/badge/RUP-F5F5F5?style=flat-square&labelColor=F5F5F5&color=F5F5F5)](./RUP)
[![Modelo del dominio](https://img.shields.io/badge/Modelo_del_dominio-F5F5F5?style=flat-square&labelColor=F5F5F5&color=F5F5F5)](./_contexto/modelosUML/modeloDeDominio)
[![Actores & Casos de Uso](https://img.shields.io/badge/Actores_%26_Casos_de_Uso-F5F5F5?style=flat-square&labelColor=F5F5F5&color=F5F5F5)](./_contexto/01-analisis/casos-uso)
[![Diagrama de contexto](https://img.shields.io/badge/Diagrama_de_contexto-F5F5F5?style=flat-square&labelColor=F5F5F5&color=F5F5F5)](./_contexto/actoresYCasosDeUso/diagramaContexto)
[![Detalle & Prototipo](https://img.shields.io/badge/Detalle_%26_Prototipo-F5F5F5?style=flat-square&labelColor=F5F5F5&color=F5F5F5)](./frontend/src)
[![Análisis](https://img.shields.io/badge/Análisis-F5F5F5?style=flat-square&labelColor=F5F5F5&color=F5F5F5)](./RUP/01-analisis)
<br>
[![Log de conversación](https://img.shields.io/badge/Log_de_conversación-F5F5F5?style=flat-square&labelColor=F5F5F5&color=F5F5F5)](./conversation-log.md)

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
