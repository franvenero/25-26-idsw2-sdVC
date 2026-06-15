# Diseño Técnico: Caso de Uso - completarGestion

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

Este documento detalla la realización técnica del caso de uso `completarGestion`, transformando el análisis conceptual en una especificación lista para implementación bajo el stack React + FastAPI.

## 1. Diagrama de Secuencia de Diseño

![Diagrama de Secuencia](/images/RUP/analisis-diseno/diagramas-secuencia/completarGestion/secuencia-completarGestion.svg)

Código fuente: [secuencia-diseno.puml](./secuencia-diseno.puml)

## 2. Trazabilidad y Realización

| Componente Análisis | Implementación Física (Diseño) | Responsabilidad |
| :--- | :--- | :--- |
| **VistaGestion** (Boundary) | `DashboardPage.tsx` | Interfaz para marcar tareas o proyectos como completados. |
| **Cliente API** (Boundary) | `task.service.ts` | Envío de actualizaciones de estado al servidor. |
| **Router Tareas** (Control) | `task_router.py` | Endpoint `PATCH /tasks/{id}` para actualizar el estado. |
| **Servicio Tareas** (Control) | `task_service.py` | Lógica de validación de dependencias antes de completar. |
| **Repositorio** (Entity Abstr.) | `task_repository.py` | Persistencia del cambio de estado en la base de datos. |
| **Entidad Tarea** (Entity) | `task.py` | Atributos de estado y completitud. |

--- 
**Arquitecto:** Gemini CLI Agent 
**Fecha:** 14 de junio de 2026