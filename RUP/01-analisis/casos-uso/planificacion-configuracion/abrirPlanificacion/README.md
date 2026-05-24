# Caso de Uso: Abrir Planificación

## Flujo Principal
El usuario solicita ver la planificación de una tarea específica. El sistema carga todos los detalles relacionados con la temporalidad, ubicación, recordatorios y personal asignado a dicha tarea.

## Responsabilidades BCE

| Objeto | Tipo | Responsabilidad |
| :--- | :--- | :--- |
| **VistaPlanificacion** | Boundary | Interfaz donde se visualizan y gestionan los detalles de planificación de la tarea. |
| **GestorPlanificacion** | Control | Coordina la recuperación de información desde las distintas entidades asociadas a la tarea. |
| **Tarea** | Entity | Almacena la información base de la tarea. |
| **Horario** | Entity | Gestiona la información temporal (fechas, horas) de la tarea. |
| **Localizacion** | Entity | Almacena la ubicación física o virtual de la tarea. |
| **Recordatorio** | Entity | Gestiona las alertas programadas para la tarea. |
| **Usuario** | Entity | Representa al usuario responsable o asignado a la tarea. |
