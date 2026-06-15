# Análisis: abrirGrupos

> | [🏠 Inicio](../../../../../README.md) | [🏗️ Análisis](../../../../../RUP/01-analisis/casos-uso/gestion-grupos/abrirGrupos) | [🎨 Diseño](../../../../../RUP/02-diseño/diagramas-secuencia/abrirGrupos) | [💻 Desarrollo](../../../../../frontend/src) | [🧪 Pruebas](../../../../../) |

## Información del Artefacto
- **Fase RUP**: Elaboración
- **Disciplina**: Análisis
- **Estatus**: Corregido (Rigor RUP)
- **Patrón**: BCE / MVC conceptual

## Propósito
Análisis de colaboración del caso de uso `abrirGrupos()` para permitir al usuario visualizar y gestionar sus grupos familiares, asegurando la trazabilidad con el estado de sistema disponible.

## Diagrama de Colaboración (BCE)

<div align=center>

![Diagrama de Colaboración](/images/RUP/analisis-diseno/abrirGrupos/abrirGrupos.svg)

Código fuente: [abrirGrupos.puml](./abrirGrupos.puml) | **Nivel:** Análisis RUP (Agnóstico a la tecnología)

</div>

## Clases de Análisis Identificadas

### Clases Model (Naranja #F2AC4E)
| Clase | Responsabilidad | Trazabilidad |
| :--- | :--- | :--- |
| **Grupo** | Entidad que representa al grupo familiar y sus miembros. | Modelo del Dominio |
| **GrupoRepository** | Abstracción para el acceso conceptual a los datos de grupos. | Patrón Repository |

### Clases View (Azul #629EF9)
| Clase | Responsabilidad | Derivación |
| :--- | :--- | :--- |
| **ListarGruposView** | Presentar la lista de grupos y manejar la navegación. | Prototipo / UI |

### Clases Controller (Verde #b5bd68)
| Clase | Responsabilidad | Caso de Uso |
| :--- | :--- | :--- |
| **GruposController** | Coordina la recuperación de grupos asociados al usuario. | abrirGrupos() |

### Colaboraciones (Verde Claro #CDEBA5)
| Colaboración | Propósito | Invocación |
| :--- | :--- | :--- |
| **:Sistema Disponible** | Estado de espera del sistema antes y después del CU. | Origen / Destino |

## Mensajes de Colaboración

| Origen | Destino | Mensaje | Intención |
| :--- | :--- | :--- | :--- |
| **:Sistema Disponible** | **ListarGruposView** | `1: abrirGrupos()` | Iniciar la visualización de grupos. |
| **ListarGruposView** | **GruposController** | `2: listarGrupos(u)` | Solicitar datos al control. |
| **GruposController** | **GrupoRepository** | `3: obtenerGruposPorUsuario(u)` | Recuperar entidades del dominio. |
| **ListarGruposView** | **:Sistema Disponible** | `4: sistemaDisponible(u)` | Regresar al estado estable. |

## Principios de Análisis Aplicados
1. **Patrón de Navegación**: El caso de uso nace de `:Sistema Disponible` y muere en él, respetando el diagrama de contexto.
2. **Separación MVC**: La lógica de obtención de datos está delegada al controlador y repositorio.
3. **Pureza Conceptual**: Los mensajes describen "qué" se hace, no "cómo" (ej. no hay SQL ni HTTP).
