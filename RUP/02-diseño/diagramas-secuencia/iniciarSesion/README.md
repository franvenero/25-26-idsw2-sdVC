# Diseño Técnico: Caso de Uso - iniciarSesion

> | [🏠 Inicio](../../../../README.md) | [🏗️ Análisis](../../../../RUP/01-analisis) | [🎨 Diseño](../../../../RUP/02-diseño) | [💻 Desarrollo](../../../../frontend/src) |

Este documento detalla la realización técnica del caso de uso `iniciarSesion`, transformando el análisis conceptual en una especificación lista para implementación bajo el stack React + FastAPI.

## 1. Especificación del Contrato de API (Endpoint)

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

## 2. Trazabilidad: Análisis (BCE) a Diseño Técnico

| Componente Análisis | Implementación Física (Diseño) | Responsabilidad |
| :--- | :--- | :--- |
| **VistaLogin** (Boundary) | `LoginPage.tsx` (React Component) | Captura de credenciales y gestión de estados de UI (loading/error). |
| **Cliente HTTP** (Boundary) | `api/auth.service.ts` (Axios) | Realización de la petición asíncrona al backend. |
| **GestorSesion** (Control) | `api/v1/endpoints/auth.py` (FastAPI Router) | Orquestación de la petición, validación de esquema y manejo de excepciones HTTP. |
| **Lógica de Negocio** (Control) | `services/auth_service.py` | Verificación de hashes (bcrypt) y generación del JWT. |
| **Repositorio** (Entity Abstr.) | `repositories/user_repository.py` | Consulta de la entidad `User` mediante SQLAlchemy. |
| **Entidad Usuario** (Entity) | `models/user.py` (SQLAlchemy Model) | Definición estructural de los datos del usuario. |

---

## 3. Flujo de Realización

La interacción se basa en una arquitectura asíncrona donde el frontend delega la validación de identidad al backend, el cual utiliza el patrón Repository para desacoplar la lógica de acceso a datos. La seguridad se garantiza mediante el hashing de contraseñas y la emisión de tokens efímeros.

---
**Arquitecto:** Gemini CLI Agent
**Fecha:** 29 de mayo de 2026
