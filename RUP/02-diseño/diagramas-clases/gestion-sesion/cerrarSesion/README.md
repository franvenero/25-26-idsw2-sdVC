# Diseño Técnico: Cerrar Sesión

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

Este documento describe la realización técnica del caso de uso **Cerrar Sesión**, centrándose en la seguridad y la limpieza de estado tanto en el cliente como en el servidor.

## Estrategia de Invalidación

Para garantizar un cierre de sesión seguro, se implementa una estrategia dual:

1.  **Frontend (React):**
    *   `AuthContext.logout()` invoca la API y, tras recibir la confirmación, ejecuta `clearSession()`.
    *   `clearSession()` elimina el JWT de la memoria volátil (state) y del almacenamiento persistente del navegador (`localStorage` o `sessionStorage`).

2.  **Backend (FastAPI):**
    *   `AuthRouter` recibe la petición de cierre de sesión.
    *   `AuthService` utiliza un `TokenBlacklistRepository` para registrar el token saliente.
    *   Cualquier petición futura con este token será rechazada por el middleware de autenticación al consultar la "lista negra" (almacenada en Redis para alto rendimiento o PostgreSQL para persistencia simple).

## Componentes Físicos
*   **NavBar**: Proporciona el punto de interacción (botón de salida).
*   **AuthContext**: Orquesta el flujo de cierre de sesión en el cliente.
*   **AuthRouter**: Endpoint `/auth/logout` que requiere el token actual.
*   **TokenBlacklistRepository**: Abstracción de la persistencia para tokens invalidados.
