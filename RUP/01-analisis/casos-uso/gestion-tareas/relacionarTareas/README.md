# Análisis: relacionarTareas

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

## Información del Artefacto
- **Fase RUP**: Elaboración
- **Disciplina**: Análisis
- **Estatus**: Corregido (Rigor RUP)
- **Patrón**: BCE / MVC conceptual

## Propósito
Análisis de colaboración del caso de uso `relacionarTareas()` para permitir la creación de dependencias lógicas (predecesora/sucesora) entre actividades, facilitando la planificación secuencial.

## Diagrama de Colaboración (BCE)

<div align=center>

![Diagrama de Colaboración](/images/RUP/analisis-diseno/relacionarTareas/relacionarTareas.svg)

Código fuente: [relacionarTareas.puml](./relacionarTareas.puml) | **Nivel:** Análisis RUP (Agnóstico a la tecnología)

</div>

## Clases de Análisis Identificadas

### Clases Model (Naranja #F2AC4E)
| Clase | Responsabilidad | Trazabilidad |
| :--- | :--- | :--- |
| **Tarea** | Entidades que serán vinculadas. | Modelo del Dominio |
| **RelacionRepository** | Abstracción para la creación y validación de vínculos entre tareas. | Patrón Repository |
| **TareaRepository** | Provee acceso a las entidades para validación de existencia. | Patrón Repository |

### Clases View (Azul #629EF9)
| Clase | Responsabilidad | Derivación |
| :--- | :--- | :--- |
| **RelacionarTareasView** | Interfaz para seleccionar la tarea destino y el tipo de vínculo. | Prototipo / UI |

### Clases Controller (Verde #b5bd68)
| Clase | Responsabilidad | Caso de Uso |
| :--- | :--- | :--- |
| **TareasController** | Orquesta la creación de la relación y evita referencias circulares. | relacionarTareas() |

### Colaboraciones (Verde Claro #CDEBA5)
| Colaboración | Propósito | Invocación |
| :--- | :--- | :--- |
| **:Sistema Disponible** | Estado global de retorno tras la vinculación. | Post-condición |

## Mensajes de Colaboración

| Origen | Destino | Mensaje | Intención |
| :--- | :--- | :--- | :--- |
| **:Sistema Disponible** | **RelacionarTareasView** | `1: relacionarTareas(t)` | Iniciar flujo de vinculación. |
| **RelacionarTareasView** | **TareasController** | `2: establecerVinculo(id1, id2, t)` | Delegar creación de la relación. |
| **TareasController** | **RelacionRepository** | `3: crearRelacion(id1, id2, t)` | Persistir el vínculo en el dominio. |
| **RelacionarTareasView** | **:Sistema Disponible** | `4: sistemaDisponible(u)` | Regresar a la vista de gestión. |

## Principios de Análisis Aplicados
1. **Validación de Dependencias**: El controlador asume la lógica de negocio necesaria para prevenir errores lógicos en la red de tareas.
2. **Abstracción de Relaciones**: Se introduce `RelacionRepository` para manejar la complejidad de las asociaciones N:M o jerárquicas entre tareas.
3. **Consistencia de Navegación**: Se mantiene el patrón de retorno a `:Sistema Disponible`.
