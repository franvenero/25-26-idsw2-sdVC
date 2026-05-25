# Análisis: configurarRecordatorio

> |[🏠️](/RUP/README.md)|**Análisis**|Diseño|Desarrollo|Pruebas|
> |-|-|-|-|-|

## Información del Artefacto
- **Fase RUP**: Elaboración
- **Disciplina**: Análisis
- **Estatus**: Corregido (Rigor RUP)
- **Patrón**: BCE / MVC conceptual

## Propósito
Análisis de colaboración del caso de uso `configurarRecordatorio()` para permitir la programación de alertas y notificaciones asociadas a una tarea, mejorando el seguimiento y cumplimiento de actividades.

## Diagrama de Colaboración (BCE)

<div align=center>

|![Análisis configurarRecordatorio](colaboracion.puml)|
|-|
|**Nivel**: Análisis RUP (Agnóstico a la tecnología)|

</div>

## Clases de Análisis Identificadas

### Clases Model (Naranja #F2AC4E)
| Clase | Responsabilidad | Trazabilidad |
| :--- | :--- | :--- |
| **Tarea** | Entidad que actúa como contenedor de los recordatorios. | Modelo del Dominio |
| **Recordatorio** | Entidad que encapsula los parámetros de la alerta. | Modelo del Dominio |
| **PlanificacionRepository** | Gestiona la persistencia de nuevos recordatorios vinculados. | Patrón Repository |

### Clases View (Azul #629EF9)
| Clase | Responsabilidad | Derivación |
| :--- | :--- | :--- |
| **RecordatorioView** | Interfaz para definir el tiempo y canal de notificación. | Prototipo / UI |

### Clases Controller (Verde #b5bd68)
| Clase | Responsabilidad | Caso de Uso |
| :--- | :--- | :--- |
| **PlanificacionController** | Coordina la creación del recordatorio y su vinculación. | configurarRecordatorio() |

### Colaboraciones (Verde Claro #CDEBA5)
| Colaboración | Propósito | Invocación |
| :--- | :--- | :--- |
| **:Sistema Disponible** | Estado global de retorno. | Post-condición |

## Mensajes de Colaboración

| Origen | Destino | Mensaje | Intención |
| :--- | :--- | :--- | :--- |
| **:Sistema Disponible** | **RecordatorioView** | `1: configurarRecordatorio(t)` | Iniciar flujo de alerta. |
| **RecordatorioView** | **PlanificacionController** | `2: registrarRecordatorio(id, d)` | Delegar creación al control. |
| **PlanificacionController** | **PlanificacionRepository** | `3: crearRecordatorioParaTarea(id, d)` | Persistir nueva alerta vinculada. |
| **RecordatorioView** | **:Sistema Disponible** | `4: sistemaDisponible(u)` | Finalizar y regresar. |

## Principios de Análisis Aplicados
1. **Composición de Dominio**: El análisis refleja que el recordatorio no tiene sentido sin su vinculación a una tarea específica.
2. **Abstracción de Persistencia**: Se delega la lógica de creación atómica al repositorio de planificación.
3. **Consistencia Visual**: Sigue el estándar de rectángulos y colores BCE.
