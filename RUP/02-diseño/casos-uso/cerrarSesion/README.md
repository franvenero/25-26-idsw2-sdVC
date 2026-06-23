# Diseño Técnico: Caso de Uso - cerrarSesion

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis/casos-uso/gestion-sesion/cerrarSesion/README.md) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

Este documento detalla la realización técnica del caso de uso `cerrarSesion`. La lógica de cierre de sesión e invalidación del token JWT se ha delegado de manera exclusiva a un `AuthService` para mantener la cohesión y aislar las responsabilidades de negocio en el backend.


---

## 1. Diagrama de Secuencia (Diseño MVC)

A nivel de diseño físico, la realización técnica detalla el flujo de mensajes y la orquestación a través de la barra de navegación React, el controlador de FastAPI y el servicio de autenticación.

![Diagrama de Secuencia](/images/RUP/analisis-diseno/diagramas-secuencia/cerrarSesion/secuencia-cerrarSesion.svg)

* [Código fuente PlantUML (.puml)](/RUP/02-diseño/diagramas-secuencia/cerrarSesion/secuencia.puml)

---

## 2. Trazabilidad: Análisis (BCE) a Diseño Técnico

| Componente Análisis | Implementación Física (Diseño) | Responsabilidad |
| :--- | :--- | :--- |
| **PrincipalView** (Boundary) | `NavbarView` (React Component) | UI para invocar la acción de cerrar sesión. |
| **PrincipalView** (Boundary) | `AuthContext.tsx` | Limpieza del estado local y eliminación del token JWT. |
| **PrincipalView** (Boundary) | `auth.service.ts` | Gestión de la invalidación de la sesión en el cliente (petición POST /logout). |
| **SesionController** (Control) | `auth_router.py` (FastAPI Router) | Punto de entrada para operaciones de sesión. |
| **SesionController** (Control) | `AuthService` (Lógica Autenticación) | Lógica de negocio asociada a la invalidación del token. |

---
**Arquitecto:** Asistente de Documentación Técnica
**Fecha:** 21 de junio de 2026