# Análisis: abrirTareas

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis) | [🎨 Diseño](/RUP/02-diseño/casos-uso/abrirTareas/README.md) | [💻 Desarrollo](/frontend/src) |

## Información del Artefacto
- **Fase RUP**: Elaboración
- **Disciplina**: Análisis
- **Estatus**: Corregido (Rigor RUP)
- **Patrón**: BCE / MVC conceptual

## Propósito
Análisis de colaboración del caso de uso `abrirTareas()` para permitir al usuario visualizar el listado de tareas pendientes y completadas dentro de un grupo familiar, facilitando la gestión centralizada.

## Diagrama de Colaboración (BCE)

<div align=center>

![Diagrama de Colaboración](/images/RUP/analisis-diseno/abrirTareas/abrirTareas.svg)

Código fuente: [abrirTareas.puml](./abrirTareas.puml) | **Nivel:** Análisis RUP (Agnóstico a la tecnología)

</div>

## Clases de Análisis Identificadas

### Clases Model (Naranja #F2AC4E)
| Clase | Responsabilidad | Trazabilidad |
| :--- | :--- | :--- |
| **Tarea** | Entidad que representa la unidad de trabajo o recordatorio. | Modelo del Dominio |
| **Grupo** | Contexto al que pertenecen las tareas. | Modelo del Dominio |
| **TareaRepository** | Abstracción para el filtrado y recuperación de tareas por grupo. | Patrón Repository |

### Clases View (Azul #629EF9)
| Clase | Responsabilidad | Derivación |
| :--- | :--- | :--- |
| **ListarTareasView** | Presentar la lista de tareas y permitir la navegación a acciones CRUD. | Prototipo / UI |

### Clases Controller (Verde #b5bd68)
| Clase | Responsabilidad | Caso de Uso |
| :--- | :--- | :--- |
| **TareasController** | Coordina la obtención de tareas filtradas por el grupo activo. | abrirTareas() |

### Colaboraciones (Verde Claro #CDEBA5)
| Colaboración | Propósito | Invocación |
| :--- | :--- | :--- |
| **:Sistema Disponible** | Estado global de navegación del sistema. | Origen / Destino |

## Mensajes de Colaboración

| Origen | Destino | Mensaje | Intención |
| :--- | :--- | :--- | :--- |
| **:Sistema Disponible** | **ListarTareasView** | `1: abrirTareas()` | Iniciar visualización de tareas. |
| **ListarTareasView** | **TareasController** | `2: listarTareas(g)` | Solicitar datos al controlador. |
| **TareasController** | **TareaRepository** | `3: obtenerTareasPorGrupo(g)` | Recuperar entidades del dominio. |
| **ListarTareasView** | **:Sistema Disponible** | `4: sistemaDisponible(u)` | Regresar al menú de navegación. |

## Principios de Análisis Aplicados
1. **Contextualización de Datos**: El controlador garantiza que solo se recuperen tareas pertenecientes al grupo en el que el usuario está operando.
2. **Abstracción de Repositorio**: Se utiliza `TareaRepository` para desacoplar la lógica de filtrado de la gestión directa de entidades.
3. **Navegación Circular**: Se mantiene la coherencia con el diagrama de estados al retornar a `:Sistema Disponible`.
