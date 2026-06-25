# Análisis: crearGrupo

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

## Información del Artefacto
- **Fase RUP**: Elaboración
- **Disciplina**: Análisis
- **Estatus**: Corregido (Rigor RUP)
- **Patrón**: BCE / MVC conceptual

## Propósito
Análisis de colaboración del caso de uso `crearGrupo()` para permitir la creación de un nuevo entorno colaborativo, asegurando que el creador sea registrado automáticamente como administrador del mismo.

## Diagrama de Colaboración (BCE)

<div align=center>

![Diagrama de Colaboración](/images/RUP/analisis-diseno/crearGrupo/colaboracion.svg)

Código fuente: [colaboracion.puml](./colaboracion.puml) | **Nivel:** Análisis RUP (Agnóstico a la tecnología)

</div>

## Clases de Análisis Identificadas

### Clases Model (Naranja #F2AC4E)
| Clase | Responsabilidad | Trazabilidad |
| :--- | :--- | :--- |
| **Grupo** | Entidad que representa el nuevo grupo creado. | Modelo del Dominio |
| **MiembroGrupo** | Entidad que vincula al usuario con el grupo y define su rol. | Modelo del Dominio |
| **GrupoRepository** | Abstracción para la persistencia del grupo y su membresía inicial. | Patrón Repository |

### Clases View (Azul #629EF9)
| Clase | Responsabilidad | Derivación |
| :--- | :--- | :--- |
| **CrearGrupoView** | Capturar los datos del nuevo grupo (nombre, descripción). | Prototipo / UI |

### Clases Controller (Verde #b5bd68)
| Clase | Responsabilidad | Caso de Uso |
| :--- | :--- | :--- |
| **GruposController** | Coordina la creación del grupo y la asignación del rol de administrador. | crearGrupo() |

### Colaboraciones (Verde Claro #CDEBA5)
| Colaboración | Propósito | Invocación |
| :--- | :--- | :--- |
| **:Sistema Disponible** | Estado global del sistema al que se retorna tras el éxito. | Post-condición |

## Mensajes de Colaboración

| Origen | Destino | Mensaje | Intención |
| :--- | :--- | :--- | :--- |
| **:Sistema Disponible** | **CrearGrupoView** | `1: crearGrupo()` | Iniciar formulario de creación. |
| **CrearGrupoView** | **GruposController** | `2: registrarGrupo(d, c)` | Delegar creación y vinculación. |
| **GruposController** | **GrupoRepository** | `3: crearGrupoConAdmin(d, c)` | Persistir grupo y primer miembro. |
| **CrearGrupoView** | **:Sistema Disponible** | `4: sistemaDisponible(u)` | Finalizar y regresar a la vista principal. |

## Principios de Análisis Aplicados
1. **Atomicidad Conceptual**: El controlador garantiza que no exista un grupo sin al menos un miembro administrador (el creador).
2. **Repository Pattern**: Se utiliza el repositorio para encapsular la complejidad de la doble persistencia (`Grupo` y `MiembroGrupo`).
3. **Flujo Cerrado**: El usuario siempre es devuelto a un estado seguro tras la operación.
