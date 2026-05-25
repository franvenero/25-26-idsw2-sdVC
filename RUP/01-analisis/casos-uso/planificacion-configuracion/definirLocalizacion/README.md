# Análisis: definirLocalizacion

> |[🏠️](/RUP/README.md)|**Análisis**|Diseño|Desarrollo|Pruebas|
> |-|-|-|-|-|

## Información del Artefacto
- **Fase RUP**: Elaboración
- **Disciplina**: Análisis
- **Estatus**: Corregido (Rigor RUP)
- **Patrón**: BCE / MVC conceptual

## Propósito
Análisis de colaboración del caso de uso `definirLocalizacion()` para especificar el lugar físico o virtual donde se desarrollará la tarea, permitiendo una mejor coordinación logística familiar.

## Diagrama de Colaboración (BCE)

<div align=center>

|![Análisis definirLocalizacion](colaboracion.puml)|
|-|
|**Nivel**: Análisis RUP (Agnóstico a la tecnología)|

</div>

## Clases de Análisis Identificadas

### Clases Model (Naranja #F2AC4E)
| Clase | Responsabilidad | Trazabilidad |
| :--- | :--- | :--- |
| **Tarea** | Entidad que recibe la especificación espacial. | Modelo del Dominio |
| **Localizacion** | Entidad que encapsula los datos de ubicación. | Modelo del Dominio |
| **PlanificacionRepository** | Gestiona la vinculación persistente entre tarea y lugar. | Patrón Repository |

### Clases View (Azul #629EF9)
| Clase | Responsabilidad | Derivación |
| :--- | :--- | :--- |
| **LocalizacionView** | Interfaz para la entrada de datos de ubicación. | Prototipo / UI |

### Clases Controller (Verde #b5bd68)
| Clase | Responsabilidad | Caso de Uso |
| :--- | :--- | :--- |
| **PlanificacionController** | Coordina la creación/actualización de la localización. | definirLocalizacion() |

### Colaboraciones (Verde Claro #CDEBA5)
| Colaboración | Propósito | Invocación |
| :--- | :--- | :--- |
| **:Sistema Disponible** | Estado global de retorno. | Post-condición |

## Mensajes de Colaboración

| Origen | Destino | Mensaje | Intención |
| :--- | :--- | :--- | :--- |
| **:Sistema Disponible** | **LocalizacionView** | `1: definirLocalizacion(t)` | Iniciar flujo de ubicación. |
| **LocalizacionView** | **PlanificacionController** | `2: registrarLocalizacion(id, d)` | Delegar especificación al control. |
| **PlanificacionController** | **PlanificacionRepository** | `3: establecerLocalizacion(id, d)` | Persistir vínculo espacial. |
| **LocalizacionView** | **:Sistema Disponible** | `4: sistemaDisponible(u)` | Finalizar y regresar. |

## Principios de Análisis Aplicados
1. **Contexto Espacial**: El análisis explicita la relación 1:1 o 1:N entre tareas y localizaciones según el dominio.
2. **Abstracción de Datos**: Se utiliza el repositorio para manejar la complejidad de crear o reutilizar objetos de localización.
3. **Consistencia Visual**: Mantiene el patrón de rectángulos BCE.
