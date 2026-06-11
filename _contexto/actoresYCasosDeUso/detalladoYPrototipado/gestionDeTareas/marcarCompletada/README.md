# Detalle de Caso de Uso: marcarCompletada

## Descripción
Permite a los usuarios marcar una tarea como realizada una vez que se han cumplido los requisitos.

## Requisitos de Diseño Avanzado
Para la implementación técnica y reglas de negocio detalladas (dependencias, validaciones de estado), consulte el documento de diseño de arquitectura:

[**Especificación de Diseño: marcarCompletada**](../../../../RUP/02-diseño/diagramas-clases/marcarCompletada/README.md)

## Reglas de Negocio Clave
1. Solo el asignado o administradores pueden completar.
2. No se puede completar si existen tareas predecesoras pendientes.
