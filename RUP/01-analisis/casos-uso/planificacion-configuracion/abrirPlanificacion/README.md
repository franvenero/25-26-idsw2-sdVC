# Análisis: abrirPlanificacion

> |[🏠️](/RUP/README.md)|**Análisis**|Diseño|Desarrollo|Pruebas|
> |-|-|-|-|-|

## Información del Artefacto
- **Fase RUP**: Elaboración
- **Disciplina**: Análisis
- **Estatus**: Corregido (Rigor RUP)
- **Patrón**: BCE / MVC conceptual

## Propósito
Análisis de colaboración del caso de uso `abrirPlanificacion()` para visualizar y gestionar de forma centralizada todos los parámetros de configuración de una tarea (horario, localización, recordatorios y asignación).

## Diagrama de Colaboración (BCE)

<div align=center>

|![Análisis abrirPlanificacion](colaboracion.puml)|
|-|
|**Nivel**: Análisis RUP (Agnóstico a la tecnología)|

</div>

## Clases de Análisis Identificadas

### Clases Model (Naranja #F2AC4E)
| Clase | Responsabilidad | Trazabilidad |
| :--- | :--- | :--- |
| **Tarea** | Entidad central de la planificación. | Modelo del Dominio |
| **Horario** | Entidad que encapsula la temporalidad de la tarea. | Modelo del Dominio |
| **Localizacion** | Entidad que representa el lugar de la actividad. | Modelo del Dominio |
| **Recordatorio** | Entidades de alerta asociadas a la tarea. | Modelo del Dominio |
| **PlanificacionRepository** | Abstracción para la recuperación agregada de la configuración. | Patrón Repository |

### Clases View (Azul #629EF9)
| Clase | Responsabilidad | Derivación |
| :--- | :--- | :--- |
| **PlanificacionView** | Panel central de configuración y visualización de detalles. | Prototipo / UI |

### Clases Controller (Verde #b5bd68)
| Clase | Responsabilidad | Caso de Uso |
| :--- | :--- | :--- |
| **PlanificacionController** | Coordina la carga y orquestación de datos de planificación. | abrirPlanificacion() |

### Colaboraciones (Verde Claro #CDEBA5)
| Colaboración | Propósito | Invocación |
| :--- | :--- | :--- |
| **:Sistema Disponible** | Estado global de navegación. | Origen / Destino |

## Mensajes de Colaboración

| Origen | Destino | Mensaje | Intención |
| :--- | :--- | :--- | :--- |
| **:Sistema Disponible** | **PlanificacionView** | `1: abrirPlanificacion(t)` | Iniciar vista de configuración. |
| **PlanificacionView** | **PlanificacionController** | `2: obtenerDetalles(id)` | Solicitar datos agregados. |
| **PlanificacionController** | **PlanificacionRepository** | `3: buscarConfiguracion(id)` | Recuperar grafo de entidades relacionadas. |
| **PlanificacionView** | **:Sistema Disponible** | `4: sistemaDisponible(u)` | Regresar a la vista de gestión. |

## Principios de Análisis Aplicados
1. **Agregación de Dominio**: El controlador trata la planificación como una unidad conceptual que abarca múltiples entidades físicas.
2. **Repository Pattern Agregado**: `PlanificacionRepository` simplifica el acceso a múltiples entidades relacionadas (`Horario`, `Localizacion`, `Recordatorio`).
3. **Consistencia Visual**: Mantiene el patrón de rectángulos BCE y colores estandarizados.
