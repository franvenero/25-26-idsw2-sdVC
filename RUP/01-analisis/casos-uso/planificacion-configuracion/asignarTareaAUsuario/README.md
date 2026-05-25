# Análisis: asignarTareaAUsuario

> |[🏠️](/RUP/README.md)|**Análisis**|Diseño|Desarrollo|Pruebas|
> |-|-|-|-|-|

## Información del Artefacto
- **Fase RUP**: Elaboración
- **Disciplina**: Análisis
- **Estatus**: Corregido (Rigor RUP)
- **Patrón**: BCE / MVC conceptual

## Propósito
Análisis de colaboración del caso de uso `asignarTareaAUsuario()` para vincular formalmente a un miembro del grupo con una tarea específica, definiendo la responsabilidad de ejecución.

## Diagrama de Colaboración (BCE)

<div align=center>

|![Análisis asignarTareaAUsuario](colaboracion.puml)|
|-|
|**Nivel**: Análisis RUP (Agnóstico a la tecnología)|

</div>

## Clases de Análisis Identificadas

### Clases Model (Naranja #F2AC4E)
| Clase | Responsabilidad | Trazabilidad |
| :--- | :--- | :--- |
| **Tarea** | Entidad que recibe la asignación del responsable. | Modelo del Dominio |
| **Usuario** | Entidad que asume la responsabilidad de la tarea. | Modelo del Dominio |
| **PlanificacionRepository** | Gestiona la actualización persistente del vínculo de responsabilidad. | Patrón Repository |

### Clases View (Azul #629EF9)
| Clase | Responsabilidad | Derivación |
| :--- | :--- | :--- |
| **AsignacionView** | Interfaz para seleccionar al miembro del grupo asignado. | Prototipo / UI |

### Clases Controller (Verde #b5bd68)
| Clase | Responsabilidad | Caso de Uso |
| :--- | :--- | :--- |
| **PlanificacionController** | Coordina la vinculación entre tarea y responsable. | asignarTareaAUsuario() |

### Colaboraciones (Verde Claro #CDEBA5)
| Colaboración | Propósito | Intención |
| :--- | :--- | :--- |
| **:Sistema Disponible** | Estado global de retorno. | Post-condición |

## Mensajes de Colaboración

| Origen | Destino | Mensaje | Intención |
| :--- | :--- | :--- | :--- |
| **:Sistema Disponible** | **AsignacionView** | `1: asignarTarea(t)` | Iniciar flujo de asignación. |
| **AsignacionView** | **PlanificacionController** | `2: registrarAsignacion(idT, idU)` | Delegar vinculación al control. |
| **PlanificacionController** | **PlanificacionRepository** | `3: vincularResponsable(idT, idU)` | Persistir cambio en el dominio. |
| **AsignacionView** | **:Sistema Disponible** | `4: sistemaDisponible(u)` | Finalizar y regresar. |

## Principios de Análisis Aplicados
1. **Unicidad de Responsabilidad**: El controlador asegura que la asignación sea válida dentro del contexto del grupo.
2. **Repository Pattern**: Se utiliza un repositorio especializado en planificación para abstraer la actualización de la relación.
3. **Flujo Cerrado**: Se mantiene la consistencia con el ciclo de vida del sistema.
