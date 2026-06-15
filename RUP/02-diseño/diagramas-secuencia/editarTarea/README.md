# Diseño Técnico: Caso de Uso - editarTarea

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

Este documento detalla la realización técnica del caso de uso `editarTarea`, transformando el análisis conceptual en una especificación lista para implementación bajo el stack React + FastAPI.

## 1. Diagrama de Secuencia de Diseño

![Diagrama de Secuencia](/images/RUP/analisis-diseno/diagramas-secuencia/editarTarea/secuencia-editarTarea.svg)

Código fuente: [secuencia.puml](./secuencia.puml)

## 2. Trazabilidad y Realización

| Componente Análisis | Implementación Física (Diseño) | Responsabilidad |
| :--- | :--- | :--- |
| **VistaEditarTarea** (Boundary) | `TaskForm.tsx` | Formulario pre-cargado para la edición de tareas existentes. |
| **Cliente API** (Boundary) | `task.service.ts` | Petición `PATCH` para actualización parcial de recursos. |
| **Router Tareas** (Control) | `task_router.py` | Endpoint `PATCH /tasks/{id}` y validación de propiedad. |
| **Servicio Tareas** (Control) | `task_service.py` | Lógica de actualización y verificación de estados. |
| **Repositorio** (Entity Abstr.) | `task_repository.py` | Persistencia de los cambios en la base de datos. |
| **Entidad Tarea** (Entity) | `task.py` | Modelo de datos de la tarea a modificar. |

--- 
**Arquitecto:** Gemini CLI Agent 
**Fecha:** 14 de junio de 2026