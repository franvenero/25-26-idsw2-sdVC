# Análisis: eliminarGrupo

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

## Información del Artefacto
- **Fase RUP**: Elaboración
- **Disciplina**: Análisis
- **Estatus**: Corregido (Rigor RUP)
- **Patrón**: BCE / MVC conceptual

## Propósito
Análisis de colaboración del caso de uso `eliminarGrupo()` para garantizar la remoción segura de un grupo, gestionando la integridad referencial mediante la eliminación en cascada de membresías e invitaciones relacionadas.

## Diagrama de Colaboración (BCE)

<div align=center>

![Diagrama de Colaboración](/images/RUP/analisis-diseno/eliminarGrupo/eliminarGrupo.svg)

Código fuente: [eliminarGrupo.puml](./eliminarGrupo.puml) | **Nivel:** Análisis RUP (Agnóstico a la tecnología)

</div>

## Clases de Análisis Identificadas

### Clases Model (Naranja #F2AC4E)
| Clase | Responsabilidad | Trazabilidad |
| :--- | :--- | :--- |
| **Grupo** | Entidad principal a ser eliminada. | Modelo del Dominio |
| **MiembroGrupo** | Entidades de relación que deben eliminarse previamente. | Modelo del Dominio |
| **Invitacion** | Entidades relacionadas que deben limpiarse. | Modelo del Dominio |
| **GrupoRepository** | Coordina la lógica de eliminación física y la integridad. | Patrón Repository |

### Clases View (Azul #629EF9)
| Clase | Responsabilidad | Derivación |
| :--- | :--- | :--- |
| **ListarGruposView** | Capturar la solicitud de eliminación y confirmar al usuario. | Prototipo / UI |

### Clases Controller (Verde #b5bd68)
| Clase | Responsabilidad | Caso de Uso |
| :--- | :--- | :--- |
| **GruposController** | Orquestar el flujo de borrado y validaciones de autoría. | eliminarGrupo() |

### Colaboraciones (Verde Claro #CDEBA5)
| Colaboración | Propósito | Invocación |
| :--- | :--- | :--- |
| **:Sistema Disponible** | Estado global de retorno tras la eliminación exitosa. | Post-condición |

## Mensajes de Colaboración

| Origen | Destino | Mensaje | Intención |
| :--- | :--- | :--- | :--- |
| **:Sistema Disponible** | **ListarGruposView** | `1: eliminarGrupo(g)` | Iniciar proceso de borrado. |
| **ListarGruposView** | **GruposController** | `2: procesarEliminacion(id)` | Delegar coordinación del borrado. |
| **GruposController** | **GrupoRepository** | `3: eliminarGrupoCascada(id)` | Ejecutar eliminación física e integridad. |
| **ListarGruposView** | **:Sistema Disponible** | `4: sistemaDisponible(u)` | Regresar a la vista principal. |

## Principios de Análisis Aplicados
1. **Integridad de Datos**: Se explicita que la eliminación no es solo del objeto `Grupo`, sino de su grafo de dependencias (`MiembroGrupo`, `Invitacion`).
2. **Encapsulamiento de Transacción**: El repositorio asume la responsabilidad de la eliminación atómica en este nivel de abstracción.
