# Análisis: editarTarea

> |[🏠️](/RUP/README.md)|**Análisis**|Diseño|Desarrollo|Pruebas|
> |-|-|-|-|-|

## Información del Artefacto
- **Fase RUP**: Elaboración
- **Disciplina**: Análisis
- **Estatus**: Corregido (Rigor RUP)
- **Patrón**: BCE / MVC conceptual

## Propósito
Análisis de colaboración del caso de uso `editarTarea()` para permitir la modificación de atributos de una tarea existente, asegurando la consistencia de la información y su persistencia correcta.

## Diagrama de Colaboración (BCE)

<div align=center>

|![Análisis editarTarea](colaboracion.puml)|
|-|
|**Nivel**: Análisis RUP (Agnóstico a la tecnología)|

</div>

## Clases de Análisis Identificadas

### Clases Model (Naranja #F2AC4E)
| Clase | Responsabilidad | Trazabilidad |
| :--- | :--- | :--- |
| **Tarea** | Entidad que encapsula los datos a modificar. | Modelo del Dominio |
| **TareaRepository** | Abstracción para la actualización persistente de las tareas. | Patrón Repository |

### Clases View (Azul #629EF9)
| Clase | Responsabilidad | Derivación |
| :--- | :--- | :--- |
| **EditarTareaView** | Interfaz para la edición de los atributos de la tarea. | Prototipo / UI |

### Clases Controller (Verde #b5bd68)
| Clase | Responsabilidad | Caso de Uso |
| :--- | :--- | :--- |
| **TareasController** | Coordina la lógica de actualización y validaciones de negocio. | editarTarea() |

### Colaboraciones (Verde Claro #CDEBA5)
| Colaboración | Propósito | Invocación |
| :--- | :--- | :--- |
| **:Sistema Disponible** | Estado global de retorno tras la edición. | Post-condición |

## Mensajes de Colaboración

| Origen | Destino | Mensaje | Intención |
| :--- | :--- | :--- | :--- |
| **:Sistema Disponible** | **EditarTareaView** | `1: editarTarea(t)` | Iniciar la edición de la tarea. |
| **EditarTareaView** | **TareasController** | `2: actualizarTarea(id, d)` | Delegar la actualización de datos. |
| **TareasController** | **TareaRepository** | `3: guardarCambios(id, d)` | Persistir las modificaciones. |
| **EditarTareaView** | **:Sistema Disponible** | `4: sistemaDisponible(u)` | Regresar a la vista de tareas. |

## Principios de Análisis Aplicados
1. **Validación de Integridad**: El controlador asegura que los cambios cumplan con las reglas de negocio antes de invocar la persistencia.
2. **Encapsulamiento de Persistencia**: El uso del repositorio evita que el controlador dependa de detalles de implementación de datos.
3. **Flujo de Navegación Estándar**: Se respeta la transición al estado `:Sistema Disponible` tras la operación exitosa.
