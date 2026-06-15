# Diseño Técnico: Gestión de Miembros

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

Este documento detalla el diseño de clases para el módulo de **Gestión de Miembros**, enfocándose en la administración de roles, desactivación lógica y jerarquía dentro del grupo familiar.

## 1. Diagrama de Clases de Diseño
![Diagrama de Clases](/images/RUP/analisis-diseno/diagramas-clases/gestion-grupos/gestionMiembros/clase-gestionMiembros.svg)

Código fuente: [diagramaClases.puml](./diagramaClases.puml)
Nivel: Diseño RUP

## 2. Propósito Técnico
El propósito de este diseño es materializar las reglas de negocio de membresía (BR-MEM-01 a BR-MEM-03), definiendo cómo la Capa de Servicio (`UserService`) interactúa con el `UserRepository` para gestionar el ciclo de vida de los usuarios dentro de un grupo, respetando la matriz de permisos RBAC y asegurando que las acciones administrativas (como desactivar un miembro) sean consistentes con el modelo de datos de SQL Server.

---
**Arquitecto:** Gemini CLI Agent
**Fecha:** 14 de junio de 2026
