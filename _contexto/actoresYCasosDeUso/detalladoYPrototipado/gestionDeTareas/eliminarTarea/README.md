# Detalle de Caso de Uso: eliminarTarea

## Descripción
Permite remover una tarea del sistema manteniendo la integridad histórica.

## Requisitos de Diseño Avanzado
Para la implementación técnica y reglas de negocio detalladas (borrado lógico, cascada de dependencias), consulte el documento de diseño de arquitectura:

[**Especificación de Diseño: eliminarTarea**](../../../../RUP/02-diseño/diagramas-clases/eliminarTarea/README.md)

## Reglas de Negocio Clave
1. Borrado lógico (`is_deleted = True`).
2. Las tareas eliminadas no bloquean el progreso de sus sucesoras.
