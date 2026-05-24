# Caso de Uso: Establecer Horario

## Flujo Principal
El usuario define los parámetros temporales de una tarea (fecha de inicio, fin, duración). El sistema crea o actualiza la entidad Horario y la vincula formalmente con la Tarea correspondiente.

## Responsabilidades BCE

| Objeto | Tipo | Responsabilidad |
| :--- | :--- | :--- |
| **VistaHorario** | Boundary | Formulario para la captura de datos temporales. |
| **GestorPlanificacion** | Control | Lógica de negocio para la creación/actualización de horarios y su vinculación con la tarea. |
| **Horario** | Entity | Almacena los atributos temporales específicos. |
| **Tarea** | Entity | Entidad principal a la que se le asigna el horario. |
