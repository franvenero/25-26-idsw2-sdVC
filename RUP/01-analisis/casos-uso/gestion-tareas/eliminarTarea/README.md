# Análisis: eliminarTarea

> |[🏠️](/RUP/README.md)|**Análisis**|Diseño|Desarrollo|Pruebas|
> |-|-|-|-|-|

## Información del Artefacto
- **Fase RUP**: Elaboración
- **Disciplina**: Análisis
- **Estatus**: Corregido (Rigor RUP)
- **Patrón**: BCE / MVC conceptual

## Propósito
Análisis de colaboración del caso de uso `eliminarTarea()` para permitir la remoción segura de actividades del sistema, garantizando la limpieza de referencias y la integridad de los datos.

## Diagrama de Colaboración (BCE)

<div align=center>

![Diagrama de Colaboración](/images/RUP/analisis-diseno/eliminarTarea/eliminarTarea.svg)

Código fuente: [eliminarTarea.puml](./eliminarTarea.puml) | **Nivel:** Análisis RUP (Agnóstico a la tecnología)

</div>

## Clases de Análisis Identificadas

### Clases Model (Naranja #F2AC4E)
| Clase | Responsabilidad | Trazabilidad |
| :--- | :--- | :--- |
| **Tarea** | Entidad a ser eliminada del sistema. | Modelo del Dominio |
| **TareaRepository** | Abstracción para la eliminación física o lógica de la entidad. | Patrón Repository |

### Clases View (Azul #629EF9)
| Clase | Responsabilidad | Derivación |
| :--- | :--- | :--- |
| **ListarTareasView** | Capturar la solicitud de eliminación y confirmar al usuario. | Prototipo / UI |

### Clases Controller (Verde #b5bd68)
| Clase | Responsabilidad | Caso de Uso |
| :--- | :--- | :--- |
| **TareasController** | Coordina la lógica de borrado y validaciones de permisos. | eliminarTarea() |

### Colaboraciones (Verde Claro #CDEBA5)
| Colaboración | Propósito | Invocación |
| :--- | :--- | :--- |
| **:Sistema Disponible** | Estado global de retorno tras la eliminación exitosa. | Post-condición |

## Mensajes de Colaboración

| Origen | Destino | Mensaje | Intención |
| :--- | :--- | :--- | :--- |
| **:Sistema Disponible** | **ListarTareasView** | `1: eliminarTarea(t)` | Iniciar el proceso de borrado. |
| **ListarTareasView** | **TareasController** | `2: procesarEliminacion(id)` | Delegar la coordinación de la baja. |
| **TareasController** | **TareaRepository** | `3: eliminarTarea(id)` | Ejecutar eliminación persistente. |
| **ListarTareasView** | **:Sistema Disponible** | `4: sistemaDisponible(u)` | Regresar a la vista principal de tareas. |

## Principios de Análisis Aplicados
1. **Borrado Seguro**: El controlador asume la responsabilidad de verificar que la tarea pueda ser eliminada sin violar restricciones de integridad.
2. **Abstracción de Repositorio**: Se centraliza la eliminación física en el repositorio para facilitar futuros cambios en el mecanismo de persistencia.
3. **Consistencia Visual**: El flujo siempre retorna al usuario a un estado estable tras la confirmación.
