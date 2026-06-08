# Detalle de Caso de Uso: validarConflicto

## Descripción
Componente de validación transversal que asegura la integridad del grafo de tareas.

## Requisitos de Diseño Avanzado
Para el algoritmo detallado de detección de ciclos (DFS), consulte el documento de diseño de arquitectura:

[**Especificación de Diseño: validarConflicto**](../../../../RUP/02-diseño/diagramas-clases/validarConflicto/README.md)

## Reglas de Negocio Clave
1. El sistema rechaza cualquier relación que cause un bucle infinito (A -> B -> A).
2. Validación mandatoria en cada creación de vínculo de dependencia.
