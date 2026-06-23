# Análisis: Caso de Uso - marcarCompletada

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis) | [🎨 Diseño](/RUP/02-diseño/diagramas-secuencia/marcarCompletada/README.md) | [💻 Desarrollo](/frontend/src) |

## Propósito
Este documento describe el análisis conceptual del caso de uso `marcarCompletada` utilizando la nomenclatura BCE genérica. Este flujo detalla el proceso mediante el cual un usuario completa una tarea y se valida su estado.

---

## 1. Diagrama de Colaboración (Análisis RUP)

A nivel de análisis conceptual (BCE), el diagrama de comunicación en formato de grafo modela las interacciones iniciales agnósticas a la tecnología.

![Diagrama de Colaboración](/images/RUP/analisis-diseno/marcarCompletada/marcarCompletada.svg)

* [Código fuente PlantUML (.puml)](./colaboracion.puml)

---

## 2. Clases de Análisis Identificadas (BCE)

| Componente | Tipo | Responsabilidad |
| :--- | :--- | :--- |
| **Usuario** | Actor | Usuario que interactúa con la vista para marcar una tarea como completada. |
| **ListarTareasView** | Boundary | Vista encargada de renderizar la lista de tareas y capturar el evento del checkbox. |
| **TareasController** | Control | Controlador conceptual que valida dependencias y gestiona el flujo del cambio de estado. |
| **TareaRepository** | Entity | Repositorio conceptual encargado de abstraer la modificación de la tarea. |
| **Tarea** | Entity | Representa los datos conceptuales de la tarea modificada. |
| **:Tareas Abierto** | State/Rectangle | Estado correspondiente a la vista de gestión de tareas activa. |

---

## 3. Mensajes de Colaboración

| Origen | Destino | Mensaje |
| :--- | :--- | :--- |
| **Usuario** | **ListarTareasView** | `1: marcarCompletada(idTarea)` |
| **ListarTareasView** | **TareasController** | `2: actualizarEstadoTarea(idTarea, estado)` |
| **TareasController** | **TareaRepository** | `3: modificarTarea(idTarea, estado)` |
| **TareaRepository** | **Tarea** | (Relación estructural / Consulta) |
| **ListarTareasView** | **:Tareas Abierto** | `4: actualizaEstado()` |

---
**Arquitecto:** Asistente de Documentación Técnica
**Fecha:** 23 de junio de 2026
