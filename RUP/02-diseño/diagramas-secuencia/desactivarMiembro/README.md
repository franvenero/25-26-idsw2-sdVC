# Diseño Técnico: Caso de Uso - desactivarMiembro

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

Este documento detalla la realización técnica del caso de uso `desactivarMiembro`, transformando el análisis conceptual en una especificación lista para implementación bajo el stack React + FastAPI.

## 1. Diagrama de Secuencia de Diseño

![Diagrama de Secuencia](/images/RUP/analisis-diseno/diagramas-secuencia/desactivarMiembro/secuencia-desactivarMiembro.svg)

Código fuente: [secuencia.puml](./secuencia.puml)

## 2. Trazabilidad y Realización

| Componente Análisis | Implementación Física (Diseño) | Responsabilidad |
| :--- | :--- | :--- |
| **VistaMiembros** (Boundary) | `GroupManagementPage.tsx` | Lista de miembros con opción de eliminación/desactivación. |
| **Cliente API** (Boundary) | `member.service.ts` | Petición `DELETE` para remover un miembro del grupo. |
| **Router Grupos** (Control) | `group_router.py` | Endpoint `DELETE /groups/{id}/members/{uid}`. |
| **Servicio Grupos** (Control) | `group_service.py` | Lógica para remover la asociación del usuario con el grupo. |
| **Repositorio** (Entity Abstr.) | `user_repository.py` | Actualización de la relación en la base de datos. |
| **Entidad Usuario** (Entity) | `user.py` | Representación del miembro en el sistema. |

--- 
**Arquitecto:** Gemini CLI Agent 
**Fecha:** 14 de junio de 2026