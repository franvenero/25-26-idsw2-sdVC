# Diseño Técnico: Caso de Uso - abrirInvitaciones

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

Este documento detalla la realización técnica del caso de uso `abrirInvitaciones`. La lógica de negocio para obtener las invitaciones del usuario actual se ha encapsulado en un `InvitacionesService` delegando el acceso a datos al `InvitacionRepository`.

---

## 1. Diagrama de Colaboración (Análisis RUP)

A nivel de análisis conceptual (BCE), el diagrama de comunicación en formato de grafo modela las interacciones iniciales agnósticas a la tecnología.

![Diagrama de Colaboración](/images/RUP/analisis-diseno/abrirInvitaciones/abrirInvitaciones.svg)

* [Código fuente PlantUML (.puml)](/RUP/01-analisis/casos-uso/gestion-grupos/abrirInvitaciones/colaboracion.puml)

---

## 2. Diagrama de Secuencia (Diseño MVC)

A nivel de diseño físico, la realización técnica detalla el flujo de mensajes asíncronos para listar las invitaciones pendientes del usuario.

![Diagrama de Secuencia](/images/RUP/analisis-diseno/diagramas-secuencia/abrirInvitaciones/secuencia-abrirInvitaciones.svg)

* [Código fuente PlantUML (.puml)](/RUP/02-diseño/diagramas-secuencia/abrirInvitaciones/secuencia.puml)

---

## 3. Trazabilidad: Análisis (BCE) a Diseño Técnico

| Componente Análisis | Implementación Física (Diseño) | Responsabilidad |
| :--- | :--- | :--- |
| **InvitacionesView** (Boundary) | `InvitacionesView` (React Component) | Interfaz gráfica para listar las invitaciones pendientes del usuario. |
| **InvitacionesController** (Control) | `invitaciones_controller.py` (FastAPI Router) | Endpoint `GET /invitaciones` para recibir la petición y retornar JSON. |
| **InvitacionesService** (Control) | `invitaciones_service.py` | Lógica de negocio: delegación al repositorio de invitaciones. |
| **InvitacionRepository** (Entity Abstr.) | `invitacion_repository.py` | Consulta mediante SQLAlchemy para recuperar las filas de `Invitation` con `findAllByUsuario`. |
| **Invitacion** (Entity) | `models/invitation.py` (SQLAlchemy Model) | Definición estructural de los datos de la invitación. |

---
**Arquitecto:** Asistente de Documentación Técnica
**Fecha:** 23 de junio de 2026
