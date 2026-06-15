# Diseño Técnico: Caso de Uso - cerrarSesion

> | [🏠 Inicio](../../../../README.md) | [🏗️ Análisis](../../../../RUP/01-analisis) | [🎨 Diseño](../../../../RUP/02-diseño) | [💻 Desarrollo](../../../../frontend/src) |

Este documento detalla la realización técnica del caso de uso `cerrarSesion`, transformando el análisis conceptual en una especificación lista para implementación bajo el stack React + FastAPI.

## 1. Diagrama de Secuencia de Diseño

![Diagrama de Secuencia](/images/RUP/analisis-diseno/diagramas-secuencia/cerrarSesion/secuencia-cerrarSesion.svg)

Código fuente: [secuencia-diseno.puml](./secuencia-diseno.puml)

## 2. Trazabilidad y Realización

| Componente Análisis | Implementación Física (Diseño) | Responsabilidad |
| :--- | :--- | :--- |
| **VistaNavegacion** (Boundary) | `Navbar.tsx` | UI para invocar la acción de cerrar sesión. |
| **GestorAutenticacion** (Boundary) | `AuthContext.tsx` | Limpieza del estado local y eliminación del token JWT. |
| **Cliente API** (Boundary) | `auth.service.ts` | Gestión de la invalidación de la sesión en el cliente. |
| **Router Auth** (Control) | `auth_router.py` | Punto de entrada para operaciones de sesión. |
| **Servicio Auth** (Control) | `auth_service.py` | Lógica de negocio asociada a la gestión de sesiones. |

--- 
**Arquitecto:** Gemini CLI Agent 
**Fecha:** 14 de junio de 2026