# Diseño Técnico: Caso de Uso - marcarCompletada

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

Este documento detalla la realización técnica del caso de uso `marcarCompletada`. La lógica de validación de dependencias y el cambio de estado de las tareas se ha encapsulado en un `TareasService` para mantener la cohesión en la capa de negocio y delegar la persistencia física al `TareaRepository`.

---

## 1. Diagrama de Colaboración (Análisis RUP)

A nivel de análisis conceptual (BCE), el diagrama de comunicación en formato de grafo modela las interacciones iniciales agnósticas a la tecnología.

![Diagrama de Colaboración](/images/RUP/analisis-diseno/marcarCompletada/marcarCompletada.svg)

* [Código fuente PlantUML (.puml)](/RUP/01-analisis/casos-uso/gestion-tareas/marcarCompletada/colaboracion.puml)

---

## 2. Diagrama de Secuencia (Diseño MVC)

A nivel de diseño físico, la realización técnica detalla el flujo de mensajes asíncronos para marcar una tarea como completada aplicando las reglas de negocio de dependencias.

![Diagrama de Secuencia](/images/RUP/analisis-diseno/diagramas-secuencia/marcarCompletada/secuencia-marcarCompletada.svg)

* [Código fuente PlantUML (.puml)](/RUP/02-diseño/diagramas-secuencia/marcarCompletada/secuencia.puml)

---

## 3. Trazabilidad: Análisis (BCE) a Diseño Técnico

| Componente Análisis | Implementación Física (Diseño) | Responsabilidad |
| :--- | :--- | :--- |
| **ListarTareasView** (Boundary) | `ListarTareasView` (React Component) | Checkbox e interacción de UI para marcar tarea como completada. |
| **TareasController** (Control) | `task_router.py` (FastAPI Router) | Endpoint `PATCH /tasks/{task_id}/estado` para recibir la petición. |
| **TareasService** (Control) | `task_service.py` | Lógica de negocio: validación de dependencias y delegación al repositorio. |
| **TareaRepository** (Entity Abstr.) | `task_repository.py` | Modificación del estado de persistencia de la tarea en la base de datos con `actualizar_estado`. |
| **Tarea** (Entity) | `models/task.py` (SQLAlchemy Model) | Definición estructural de los datos de la tarea. |

---
**Arquitecto:** Asistente de Documentación Técnica
**Fecha:** 22 de junio de 2026
