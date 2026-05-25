# Análisis: establecerHorario

> |[🏠️](/RUP/README.md)|**Análisis**|Diseño|Desarrollo|Pruebas|
> |-|-|-|-|-|

## Información del Artefacto
- **Fase RUP**: Elaboración
- **Disciplina**: Análisis
- **Estatus**: Corregido (Rigor RUP)
- **Patrón**: BCE / MVC conceptual

## Propósito
Análisis de colaboración del caso de uso `establecerHorario()` para definir los parámetros temporales de una tarea, garantizando que el cronograma familiar esté actualizado y sincronizado.

## Diagrama de Colaboración (BCE)

<div align=center>

|![Análisis establecerHorario](colaboracion.puml)|
|-|
|**Nivel**: Análisis RUP (Agnóstico a la tecnología)|

</div>

## Clases de Análisis Identificadas

### Clases Model (Naranja #F2AC4E)
| Clase | Responsabilidad | Trazabilidad |
| :--- | :--- | :--- |
| **Tarea** | Entidad principal a la que se le asigna el tiempo. | Modelo del Dominio |
| **Horario** | Entidad que encapsula los atributos temporales. | Modelo del Dominio |
| **PlanificacionRepository** | Gestiona la vinculación persistente entre tarea y horario. | Patrón Repository |

### Clases View (Azul #629EF9)
| Clase | Responsabilidad | Derivación |
| :--- | :--- | :--- |
| **HorarioView** | Formulario para la captura de fechas y horas. | Prototipo / UI |

### Clases Controller (Verde #b5bd68)
| Clase | Responsabilidad | Caso de Uso |
| :--- | :--- | :--- |
| **PlanificacionController** | Coordina la lógica de asignación temporal y validación de rangos. | establecerHorario() |

### Colaboraciones (Verde Claro #CDEBA5)
| Colaboración | Propósito | Invocación |
| :--- | :--- | :--- |
| **:Sistema Disponible** | Estado global de retorno. | Post-condición |

## Mensajes de Colaboración

| Origen | Destino | Mensaje | Intención |
| :--- | :--- | :--- | :--- |
| **:Sistema Disponible** | **HorarioView** | `1: establecerHorario(t)` | Iniciar flujo temporal. |
| **HorarioView** | **PlanificacionController** | `2: registrarHorario(id, d)` | Delegar especificación al control. |
| **PlanificacionController** | **PlanificacionRepository** | `3: establecerHorario(id, d)` | Persistir vínculo temporal. |
| **HorarioView** | **:Sistema Disponible** | `4: sistemaDisponible(u)` | Finalizar y regresar. |

## Principios de Análisis Aplicados
1. **Integridad Temporal**: El análisis asume que el controlador validará la coherencia de fechas antes de invocar al repositorio.
2. **Repository Pattern**: Se centraliza la creación de la entidad `Horario` en el repositorio de planificación para mantener la pureza del controlador.
3. **Consistencia Visual**: Mantiene el patrón de rectángulos BCE y colores estandarizados.
