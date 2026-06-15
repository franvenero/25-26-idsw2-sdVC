# Diseño Técnico: Iniciar Sesión

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

Este documento describe la arquitectura física y el diseño de clases para el corte vertical de **Inicio de Sesión**, utilizando el stack tecnológico definido (React, FastAPI, PostgreSQL).

## Estructura de Capas

1.  **Capa UI (Frontend - React):**
    *   `LoginPage`: Componente de vista que captura las credenciales del usuario.
    *   `AuthContext`: Proveedor de estado global que encapsula la lógica de autenticación y persiste el token JWT en el navegador.

2.  **Capa DTO/Schemas (Pydantic):**
    *   `UserLoginSchema`: Define la estructura de entrada para la validación de datos en el Request.
    *   `TokenResponse`: Define la estructura del JSON de respuesta (Access Token).

3.  **Capa Router (API - FastAPI):**
    *   `AuthRouter`: Punto de entrada de la API. Utiliza la inyección de dependencias de FastAPI (`Depends`) para desacoplar el servicio de la ruta.

4.  **Capa de Servicio (Lógica de Negocio):**
    *   `AuthService`: Contiene la lógica pura de autenticación, verificación de hashes (bcrypt) y generación de tokens JWT. No tiene conocimiento directo de la base de datos, sino que usa el repositorio.

5.  **Capa de Datos (Persistencia):**
    *   `UserRepository`: Implementa el patrón Repository para aislar las consultas SQLAlchemy.
    *   `UserModel`: Representación física de la tabla `users` en PostgreSQL.

## Inyección de Dependencias

La arquitectura sigue el principio de inversión de dependencia para facilitar el testing y el mantenimiento:

### Backend (FastAPI)
*   El **Router** recibe el `AuthService` a través del sistema de inyección de FastAPI:
    ```python
    @router.post("/login")
    def login(data: UserLoginSchema, service: AuthService = Depends(get_auth_service)):
        ...
    ```
*   El **Servicio** recibe el `UserRepository` de manera similar, asegurando que cada componente solo dependa de abstracciones o componentes inyectados.

### Frontend (React)
*   Se utiliza el **Pattern Context** para inyectar las funciones de autenticación en cualquier componente de la jerarquía sin necesidad de "prop-drilling". `LoginPage` consume `AuthContext` mediante el hook `useAuth()`.

## Flujo de Comunicación
1. `LoginPage` -> `AuthContext.login(credentials)`
2. `AuthContext` -> `POST /api/auth/login` (AuthRouter)
3. `AuthRouter` -> `AuthService.authenticate_user()`
4. `AuthService` -> `UserRepository.get_by_username()`
5. El flujo retorna el JWT desde el Servicio hasta el Contexto, que lo almacena localmente.
