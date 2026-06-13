# Análisis: editarMiembro

> |[🏠️](/RUP/README.md)|**Análisis**|Diseño|Desarrollo|Pruebas|
> |-|-|-|-|-|

## Información del Artefacto
- **Fase RUP**: Elaboración
- **Disciplina**: Análisis
- **Estatus**: Corregido (Rigor RUP)
- **Patrón**: BCE / MVC conceptual

## Propósito
Análisis de colaboración del caso de uso `editarMiembro()` para permitir la modificación de roles y permisos de los integrantes de un grupo familiar.

## Diagrama de Colaboración (BCE)

<div align=center>

|![Análisis editarMiembro](colaboracion.svg)|
|-|
|**Nivel**: Análisis RUP (Agnóstico a la tecnología)|

</div>

## Clases de Análisis Identificadas

### Clases Model (Naranja #F2AC4E)
| Clase | Responsabilidad | Trazabilidad |
| :--- | :--- | :--- |
| **MiembroGrupo** | Entidad que representa la relación y el rol del usuario en el grupo. | Modelo del Dominio |
| **MiembroRepository** | Abstracción para la actualización persistente de las membresías. | Patrón Repository |

### Clases View (Azul #629EF9)
| Clase | Responsabilidad | Derivación |
| :--- | :--- | :--- |
| **GestionarMiembrosView** | Presentar la lista de miembros y permitir la edición de sus roles. | Prototipo / UI |

### Clases Controller (Verde #b5bd68)
| Clase | Responsabilidad | Caso de Uso |
| :--- | :--- | :--- |
| **MembresiasController** | Coordina la lógica de actualización de permisos y validaciones de rango. | editarMiembro() |

### Colaboraciones (Verde Claro #CDEBA5)
| Colaboración | Propósito | Invocación |
| :--- | :--- | :--- |
| **:Sistema Disponible** | Estado global de retorno tras la actualización. | Post-condición |

## Mensajes de Colaboración

| Origen | Destino | Mensaje | Intención |
| :--- | :--- | :--- | :--- |
| **:Sistema Disponible** | **GestionarMiembrosView** | `1: editarMiembro(g)` | Iniciar gestión de integrantes. |
| **GestionarMiembrosView** | **MembresiasController** | `2: actualizarRol(id, rol)` | Delegar cambio de privilegios. |
| **MembresiasController** | **MiembroRepository** | `3: guardarCambios(id, rol)` | Persistir la modificación. |
| **GestionarMiembrosView** | **:Sistema Disponible** | `4: sistemaDisponible(u)` | Regresar al menú principal. |

## Principios de Análisis Aplicados
1. **Separación de Concernientes**: El controlador de membresías se encarga exclusivamente de la relación Usuario-Grupo, liberando de carga al gestor general de grupos.
2. **Abstracción de Persistencia**: El repositorio encapsula el acceso a la tabla de relación/entidad de membresía.
