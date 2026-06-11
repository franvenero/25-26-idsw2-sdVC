# Detalle de Caso de Uso: relacionarTareas

## Descripción
Permite crear vínculos de dependencia entre tareas para organizar el flujo de trabajo.

## Requisitos de Diseño Avanzado
Para la implementación técnica y reglas de negocio detalladas (relación N:M recursiva, validación de ciclos), consulte el documento de diseño de arquitectura:

[**Especificación de Diseño: relacionarTareas**](../../../../RUP/02-diseño/diagramas-clases/relacionarTareas/README.md)

## Reglas de Negocio Clave
1. Soporta relaciones múltiples (una tarea puede depender de varias).
2. Se debe validar que no existan conflictos circulares antes de crear la relación.
