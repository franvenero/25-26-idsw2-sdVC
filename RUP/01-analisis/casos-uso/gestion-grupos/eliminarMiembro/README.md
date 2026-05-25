# Análisis: eliminarMiembro

> |[🏠️](/RUP/README.md)|**Análisis**|Diseño|Desarrollo|Pruebas|
> |-|-|-|-|-|

## Información del Artefacto
- **Fase RUP**: Elaboración
- **Disciplina**: Análisis
- **Estatus**: Corregido (Rigor RUP)
- **Patrón**: BCE / MVC conceptual

## Propósito
Análisis de colaboración del caso de uso `eliminarMiembro()` para permitir la remoción de un integrante de un grupo familiar, asegurando la limpieza de los vínculos de membresía.

## Diagrama de Colaboración (BCE)

<div align=center>

|![Análisis eliminarMiembro](colaboracion.puml)|
|-|
|**Nivel**: Análisis RUP (Agnóstico a la tecnología)|

</div>

## Clases de Análisis Identificadas

### Clases Model (Naranja #F2AC4E)
| Clase | Responsabilidad | Trazabilidad |
| :--- | :--- | :--- |
| **MiembroGrupo** | Entidad de relación que vincula al usuario con el grupo. | Modelo del Dominio |
| **MiembroRepository** | Abstracción para la eliminación persistente de la membresía. | Patrón Repository |

### Clases View (Azul #629EF9)
| Clase | Responsabilidad | Derivación |
| :--- | :--- | :--- |
| **GestionarMiembrosView** | Interfaz para seleccionar y confirmar la expulsión de un miembro. | Prototipo / UI |

### Clases Controller (Verde #b5bd68)
| Clase | Responsabilidad | Caso de Uso |
| :--- | :--- | :--- |
| **MembresiasController** | Coordina la lógica de expulsión y validación de permisos de administración. | eliminarMiembro() |

### Colaboraciones (Verde Claro #CDEBA5)
| Colaboración | Propósito | Invocación |
| :--- | :--- | :--- |
| **:Sistema Disponible** | Estado global de retorno tras la eliminación exitosa. | Post-condición |

## Mensajes de Colaboración

| Origen | Destino | Mensaje | Intención |
| :--- | :--- | :--- | :--- |
| **:Sistema Disponible** | **GestionarMiembrosView** | `1: expulsarMiembro(m)` | Iniciar proceso de expulsión. |
| **GestionarMiembrosView** | **MembresiasController** | `2: procesarExpulsion(id)` | Delegar remoción del integrante. |
| **MembresiasController** | **MiembroRepository** | `3: eliminarMembresia(id)` | Ejecutar eliminación física del registro. |
| **GestionarMiembrosView** | **:Sistema Disponible** | `4: sistemaDisponible(u)` | Regresar al menú principal. |

## Principios de Análisis Aplicados
1. **Clean Deletion**: Se enfoca en la remoción atómica del vínculo de membresía, manteniendo la integridad del grupo y del usuario de forma independiente.
2. **Uso de Colaboraciones Estándar**: Sigue el patrón de inicio y fin en `:Sistema Disponible`.
