# Análisis: marcarCompletada

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis/casos-uso/gestion-tareas/marcarCompletada) | [🎨 Diseño](/RUP/02-diseño/diagramas-secuencia/marcarCompletada) | [💻 Desarrollo](/frontend/src) |

## Información del Artefacto
- **Fase RUP**: Elaboración
- **Disciplina**: Análisis
- **Estatus**: Corregido (Rigor RUP)
- **Patrón**: BCE / MVC conceptual

## Propósito
Análisis de colaboración del caso de uso `marcarCompletada()` para registrar la finalización de una tarea, actualizando su estado y capturando la trazabilidad del cierre.

## Diagrama de Colaboración (BCE)

<div align=center>

![Diagrama de Colaboración](/images/RUP/analisis-diseno/marcarCompletada/marcarCompletada.svg)

Código fuente: [marcarCompletada.puml](./marcarCompletada.puml) | **Nivel:** Análisis RUP (Agnóstico a la tecnología)

</div>

## Clases de Análisis Identificadas

### Clases Model (Naranja #F2AC4E)
| Clase | Responsabilidad | Trazabilidad |
| :--- | :--- | :--- |
| **Tarea** | Entidad cuyo estado de finalización debe ser actualizado. | Modelo del Dominio |
| **TareaRepository** | Abstracción para la actualización del estado y fecha de cierre. | Patrón Repository |

### Clases View (Azul #629EF9)
| Clase | Responsabilidad | Derivación |
| :--- | :--- | :--- |
| **ListarTareasView** | Capturar la acción de completar y mostrar el cambio visual. | Prototipo / UI |

### Clases Controller (Verde #b5bd68)
| Clase | Responsabilidad | Caso de Uso |
| :--- | :--- | :--- |
| **TareasController** | Coordina la transición de estado y el registro de metadatos. | marcarCompletada() |

### Colaboraciones (Verde Claro #CDEBA5)
| Colaboración | Propósito | Invocación |
| :--- | :--- | :--- |
| **:Sistema Disponible** | Estado global de retorno tras la actualización. | Post-condición |

## Mensajes de Colaboración

| Origen | Destino | Mensaje | Intención |
| :--- | :--- | :--- | :--- |
| **:Sistema Disponible** | **ListarTareasView** | `1: marcarCompletada(t)` | Iniciar la acción de cierre. |
| **ListarTareasView** | **TareasController** | `2: registrarFinalizacion(id)` | Delegar el cambio de estado. |
| **TareasController** | **TareaRepository** | `3: cambiarEstadoACompletada(id)` | Persistir el fin de la actividad. |
| **ListarTareasView** | **:Sistema Disponible** | `4: sistemaDisponible(u)` | Regresar a la visualización de la lista. |

## Principios de Análisis Aplicados
1. **Transición de Estado Atómica**: El controlador garantiza que el cambio de estado y la marca de tiempo se realicen en una única operación conceptual.
2. **Feedback Inmediato**: Se asegura que el flujo retorne a un estado donde el usuario pueda verificar visualmente el cambio de estado de la tarea.
