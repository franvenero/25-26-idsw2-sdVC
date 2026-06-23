# Diseño Técnico: Caso de Uso - editarInvitacion

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

Este documento detalla la realización técnica del caso de uso `editarInvitacion`. La lógica de negocio para la validación y edición de las invitaciones se ha encapsulado en `InvitacionesService`, delegando la persistencia de datos en `InvitacionRepository`.

---

## 1. Diagrama de Colaboración (Análisis RUP)

A nivel de análisis conceptual (BCE), el diagrama de comunicación en formato de grafo modela las interacciones iniciales agnósticas a la tecnología.

![Diagrama de Colaboración](/images/RUP/analisis-diseno/editarInvitacion/editarInvitacion.svg)

* [Código fuente PlantUML (.puml)](/RUP/01-analisis/casos-uso/gestion-grupos/editarInvitacion/colaboracion.puml)

---

## 2. Diagrama de Secuencia (Diseño MVC)

A nivel de diseño físico, la realización técnica detalla el flujo de mensajes asíncronos y la orquestación a través de la interfaz de React, el controlador FastAPI, el servicio y la base de datos PostgreSQL utilizando SQLAlchemy.

![Diagrama de Secuencia](/images/RUP/analisis-diseno/diagramas-secuencia/editarInvitacion/secuencia-editarInvitacion.svg)

* [Código fuente PlantUML (.puml)](/RUP/02-diseño/diagramas-secuencia/editarInvitacion/secuencia.puml)

---

## 3. Trazabilidad: Análisis (BCE) a Diseño Técnico

| Componente Análisis | Implementación Física (Diseño) | Responsabilidad |
| :--- | :--- | :--- |
| **EditarInvitacionView** (Boundary) | `EditarInvitacionView` (React Component) | Interfaz de usuario para editar una invitación y enviar la petición HTTP PUT. |
| **InvitacionesController** (Control) | `invitaciones_controller.py` (FastAPI Router) | Endpoint `PUT /invitaciones/{id}` para recibir la petición y delegar al servicio. |
| **InvitacionesService** (Control) | `invitaciones_service.py` | Lógica de negocio: validación y delegación al repositorio. |
| **InvitacionRepository** (Entity Abstr.) | `invitacion_repository.py` | Persistencia en base de datos PostgreSQL mediante SQLAlchemy con `actualizar`. |
| **EntidadInvitacion** (Entity) | `models/invitation.py` (SQLAlchemy Model) | Definición estructural de los datos de la invitación. |

---
**Arquitecto:** Software Architect Expert (RUP)
**Fecha:** 23 de junio de 2026
