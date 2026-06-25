# Análisis: editarGrupo

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

## Información del Artefacto
- **Fase RUP**: Elaboración
- **Disciplina**: Análisis
- **Estatus**: Corregido (Rigor RUP)
- **Patrón**: BCE / MVC conceptual

## Propósito
Análisis de colaboración del caso de uso `editarGrupo()` para permitir la actualización de la información descriptiva de un grupo familiar.

## Diagrama de Colaboración (BCE)

<div align=center>

![Diagrama de Colaboración](/images/RUP/analisis-diseno/editarGrupo/colaboracion.svg)

Código fuente: [colaboracion.puml](./colaboracion.puml) | **Nivel:** Análisis RUP (Agnóstico a la tecnología)

</div>

## Clases de Análisis Identificadas

### Clases Model (Naranja #F2AC4E)
| Clase | Responsabilidad | Trazabilidad |
| :--- | :--- | :--- |
| **Grupo** | Entidad que encapsula los datos del grupo a modificar. | Modelo del Dominio |
| **GrupoRepository** | Abstracción para la actualización persistente de los datos. | Patrón Repository |

### Clases View (Azul #629EF9)
| Clase | Responsabilidad | Derivación |
| :--- | :--- | :--- |
| **EditarGrupoView** | Interfaz para la edición de atributos del grupo. | Prototipo / UI |

### Clases Controller (Verde #b5bd68)
| Clase | Responsabilidad | Caso de Uso |
| :--- | :--- | :--- |
| **GruposController** | Coordina la búsqueda y actualización del grupo. | editarGrupo() |

### Colaboraciones (Verde Claro #CDEBA5)
| Colaboración | Propósito | Invocación |
| :--- | :--- | :--- |
| **:Sistema Disponible** | Estado global del sistema al que se retorna. | Post-condición |

## Mensajes de Colaboración

| Origen | Destino | Mensaje | Intención |
| :--- | :--- | :--- | :--- |
| **:Sistema Disponible** | **EditarGrupoView** | `1: editarGrupo(g)` | Iniciar la edición del grupo. |
| **EditarGrupoView** | **GruposController** | `2: actualizarGrupo(id, d)` | Delegar la lógica de negocio. |
| **GruposController** | **GrupoRepository** | `3: guardarCambios(id, d)` | Persistir las modificaciones. |
| **EditarGrupoView** | **:Sistema Disponible** | `4: sistemaDisponible(u)` | Regresar al menú principal. |

## Principios de Análisis Aplicados
1. **Delegación de Persistencia**: El controlador no conoce el mecanismo de guardado, solo invoca la intención al repositorio.
2. **Coherencia de Estado**: Se asegura que el flujo de edición comience con una entidad válida.
