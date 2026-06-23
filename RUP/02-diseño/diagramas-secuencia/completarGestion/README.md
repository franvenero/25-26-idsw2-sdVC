# Diseño Técnico: Caso de Uso - completarGestion

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis/casos-uso/gestion-sesion/completarGestion/README.md) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

Este documento detalla la realización técnica del caso de uso `completarGestion`. Este flujo modela la navegación del usuario de vuelta a la vista principal tras finalizar la gestión, y al ser una transición de rutas del frontend, se encapsula principalmente en la capa de presentación y control de rutas en React sin requerir base de datos directa en este paso exacto.

---

## 1. Diagrama de Colaboración (Análisis RUP)

A nivel de análisis conceptual (BCE), el diagrama de comunicación en formato de grafo modela las interacciones iniciales agnósticas a la tecnología.

![Diagrama de Colaboración](/images/RUP/analisis-diseno/completarGestion/completarGestion.svg)

* [Código fuente PlantUML (.puml)](/RUP/01-analisis/casos-uso/gestion-sesion/completarGestion/colaboracion.puml)

---

## 2. Diagrama de Secuencia (Diseño MVC)

A nivel de diseño físico, la realización técnica detalla el flujo de mensajes asíncronos y la redirección de rutas del frontend.

![Diagrama de Secuencia](/images/RUP/analisis-diseno/diagramas-secuencia/completarGestion/secuencia-completarGestion.svg)

* [Código fuente PlantUML (.puml)](/RUP/02-diseño/diagramas-secuencia/completarGestion/secuencia.puml)

---

## 3. Trazabilidad: Análisis (BCE) a Diseño Técnico

| Componente Análisis | Implementación Física (Diseño) | Responsabilidad |
| :--- | :--- | :--- |
| **TareasView** (Boundary) | `TareasView` (React Component) | Interfaz que contiene el botón "Volver/Finalizar" para completar la gestión de tareas. |
| **DashboardController** (Control) | `Router Frontend/Backend` | Manejador de rutas en React que verifica cambios pendientes y redirige. |
| **DashboardView** (Boundary) | `DashboardView` (React Component) | Vista principal del menú a la que es redirigido el usuario. |

---
**Arquitecto:** Asistente de Documentación Técnica
**Fecha:** 22 de junio de 2026
