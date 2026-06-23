# Diseño Técnico: Caso de Uso - iniciarSesion

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis/casos-uso/gestion-sesion/iniciarSesion/README.md) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

Este documento detalla la realización técnica del caso de uso `iniciarSesion`. La lógica de autenticación, validación de credenciales y generación del token JWT se ha delegado de manera exclusiva a un `AuthService` para mantener una alta cohesión y aislar las responsabilidades de negocio del controlador HTTP (router FastAPI).

---

## 1. Diagrama de Colaboración (Análisis RUP)

A nivel de análisis conceptual (BCE), el diagrama de comunicación en formato de grafo modela las interacciones iniciales agnósticas a la tecnología.

![Diagrama de Colaboración](/images/RUP/analisis-diseno/iniciarSesion/iniciarSesion.svg)

* [Código fuente PlantUML (.puml)](/RUP/01-analisis/casos-uso/gestion-sesion/iniciarSesion/colaboracion.puml)

---

## 2. Diagrama de Secuencia (Diseño MVC)

A nivel de diseño físico, la realización técnica detalla el flujo de mensajes asíncronos y la orquestación a través del controlador, el servicio de autenticación y el repositorio.

![Diagrama de Secuencia](/images/RUP/analisis-diseno/diagramas-secuencia/iniciarSesion/secuencia-iniciarSesion.svg)

* [Código fuente PlantUML (.puml)](/RUP/02-diseño/diagramas-secuencia/iniciarSesion/secuencia.puml)

---

## 3. Especificación del Contrato de API (Endpoint)

Para la autenticación, se sigue el estándar OAuth2 con Password Flow.

- **Endpoint:** `POST /api/v1/auth/login`
- **Content-Type:** `application/json`

### Request Body (Pydantic Schema: `UserLogin`)
```json
{
  "username": "usuario_ejemplo",
  "password": "password_seguro"
}
```

### Response (Success 200 OK)
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

### Errores Manejados
| Código | Razón | Detalle |
| :--- | :--- | :--- |
| **401** | Unauthorized | Credenciales inválidas (usuario o contraseña incorrectos). |
| **422** | Unprocessable Entity | Error de validación en el formato de los datos (Pydantic). |
| **500** | Internal Server Error | Error no controlado en el servidor o base de datos. |

---

## 4. Trazabilidad: Análisis (BCE) a Diseño Técnico

| Componente Análisis | Implementación Física (Diseño) | Responsabilidad |
| :--- | :--- | :--- |
| **LoginView** (Boundary) | `LoginPage.tsx` (React Component) | Captura de credenciales y gestión de estados de UI (loading/error). |
| **LoginView** (Boundary) | `api/auth.service.ts` (Axios) | Realización de la petición asíncrona al backend. |
| **SesionController** (Control) | `auth_router.py` (FastAPI Router) | Orquestación de la petición y delegación de la lógica. |
| **AuthService** (Control) | `auth_service.py` | Lógica de autenticación: verificación de hashes (bcrypt) y generación del JWT. |
| **UsuarioRepository** (Entity Abstr.) | `user_repository.py` | Consulta de la entidad `User` mediante SQLAlchemy con `buscarPorEmail`. |
| **Usuario** (Entity) | `models/user.py` (SQLAlchemy Model) | Definición estructural de los datos del usuario. |

---
**Arquitecto:** Asistente de Documentación Técnico
**Fecha:** 20 de junio de 2026
