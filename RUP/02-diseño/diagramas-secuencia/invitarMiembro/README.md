# Diseño Técnico: Caso de Uso - invitarMiembro

> | [🏠 Inicio](../../../../README.md) | [🏗️ Análisis](../../../../RUP/01-analisis) | [🎨 Diseño](../../../../RUP/02-diseño) | [💻 Desarrollo](../../../../frontend/src) |

Este documento detalla la realización técnica del caso de uso `invitarMiembro`, transformando el análisis conceptual en una especificación lista para implementación bajo el stack React + FastAPI.

## 1. Diagrama de Secuencia de Diseño

![Diagrama de Secuencia](/images/RUP/analisis-diseno/diagramas-secuencia/invitarMiembro/secuencia-invitarMiembro.svg)

Código fuente: [secuencia.puml](./secuencia.puml)

## 2. Trazabilidad y Realización

| Componente Análisis | Implementación Física (Diseño) | Responsabilidad |
| :--- | :--- | :--- |
| **VistaInvitacion** (Boundary) | `InvitationForm.tsx` | UI para ingresar el nombre de usuario a invitar. |
| **Cliente API** (Boundary) | `member.service.ts` | Petición `POST` para generar una nueva invitación. |
| **Router Grupos** (Control) | `group_router.py` | Endpoint `POST /groups/{id}/invitations`. |
| **Servicio Grupos** (Control) | `group_service.py` | Lógica de creación de invitación y validación de existencia de usuario. |
| **Repositorio** (Entity Abstr.) | `invitation_repository.py` | Registro de la invitación en la base de datos. |
| **Entidad Invitacion** (Entity) | `invitation.py` | Modelo de datos de la invitación. |

--- 
**Arquitecto:** Gemini CLI Agent 
**Fecha:** 14 de junio de 2026