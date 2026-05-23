# Caso de Uso: Validar Conflicto

## Propósito Analítico
Aunque a menudo se invoca como un subflujo o una inclusión de otros casos de uso más amplios (como `editarTarea` o `crearTarea`), este análisis separa la responsabilidad de validar cruces y solapamientos de horarios para mantener alta cohesión.

### Lógica del Controlador
Dentro del patrón BCE, el **Controlador (GestorTareas o un Validador especializado)** interactúa fuertemente con las entidades del modelo temporal:
1. **Recepción de Datos Previos**: Recibe de la frontera los datos propuestos que implican temporalidad o asignación de recursos.
2. **Evaluación de Reglas de Negocio**: Interactúa con la entidad `ConflictoHorario` (o con las entidades que representan la disponibilidad) para ejecutar el algoritmo de solapamiento de horarios.
3. **Decisión de Flujo**: Retorna el resultado (booleano o lista de errores) hacia el flujo principal.
4. **Retroalimentación**: Si existe conflicto, instruye a la frontera para que presente de forma clara los campos o periodos afectados, permitiendo al usuario tomar una decisión informada (corregir o cancelar).
