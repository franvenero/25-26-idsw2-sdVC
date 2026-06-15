# Diseño Técnico: Caso de Uso - crearTarea

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

Este documento detalla la realización técnica del caso de uso `crearTarea`, transformando el análisis conceptual en una especificación lista para implementación bajo el stack React + FastAPI.

## 1. Diagrama de Secuencia de Diseño

![Diagrama de Secuencia](/images/RUP/analisis-diseno/diagramas-secuencia/crearTarea/secuencia-crearTarea.svg)

Código fuente: [secuencia.puml](./secuencia.puml)

## 2. Trazabilidad y Realización

| Componente Análisis | Implementación Física (Diseño) | Responsabilidad |
| :--- | :--- | :--- |
| **VistaCrearTarea** (Boundary) | `TaskForm.tsx` | Formulario de captura de datos para nuevas tareas. |
| **Cliente API** (Boundary) | `task.service.ts` | Petición `POST` para creación de recursos. |
| **Router Tareas** (Control) | `task_router.py` | Endpoint `POST /tasks/` y validación de permisos (Admin). |
| **Servicio Tareas** (Control) | `task_service.py` | Lógica de asignación a grupo y validación de entrada. |
| **Repositorio** (Entity Abstr.) | `task_repository.py` | Inserción de la nueva tarea en el motor de base de datos. |
| **Entidad Tarea** (Entity) | `task.py` | Estructura de datos de la tarea persistida. |

--- 
**Arquitecto:** Gemini CLI Agent 
**Fecha:** 14 de junio de 2026