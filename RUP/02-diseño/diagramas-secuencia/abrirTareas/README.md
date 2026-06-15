# Diseño Técnico: Caso de Uso - abrirTareas

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis/casos-uso/abrirTareas) | [🎨 Diseño](/RUP/02-diseño/diagramas-secuencia/abrirTareas) | [💻 Desarrollo](/frontend/src) |

Este documento detalla la realización técnica del caso de uso `abrirTareas`, transformando el análisis conceptual en una especificación lista para implementación bajo el stack React + FastAPI.

## 1. Diagrama de Secuencia de Diseño

![Diagrama de Secuencia](/images/RUP/analisis-diseno/diagramas-secuencia/abrirTareas/secuencia-abrirTareas.svg)

Código fuente: [secuencia.puml](./secuencia.puml)

## 2. Trazabilidad y Realización

| Componente Análisis | Implementación Física (Diseño) | Responsabilidad |
| :--- | :--- | :--- |
| **VistaTareas** (Boundary) | `DashboardPage.tsx` | Visualización de la lista de tareas del usuario. |
| **Cliente API** (Boundary) | `task.service.ts` | Gestión de peticiones HTTP para obtener tareas. |
| **Router Tareas** (Control) | `task_router.py` | Endpoint `GET /tasks/` y validación de sesión. |
| **Servicio Tareas** (Control) | `task_service.py` | Lógica para filtrar tareas por el grupo del usuario. |
| **Repositorio** (Entity Abstr.) | `task_repository.py` | Acceso a la base de datos mediante SQLAlchemy. |
| **Entidad Tarea** (Entity) | `task.py` | Modelo de datos de la tarea. |

--- 
**Arquitecto:** Gemini CLI Agent 
**Fecha:** 14 de junio de 2026