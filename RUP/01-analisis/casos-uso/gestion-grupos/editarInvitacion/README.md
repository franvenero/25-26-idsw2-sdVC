# Análisis: editarInvitacion

> |[🏠️](/RUP/README.md)|**Análisis**|Diseño|Desarrollo|Pruebas|
> |-|-|-|-|-|

## Información del Artefacto
- **Fase RUP**: Elaboración
- **Disciplina**: Análisis
- **Estatus**: Corregido (Rigor RUP)
- **Patrón**: BCE / MVC conceptual

## Propósito
Análisis de colaboración del caso de uso `editarInvitacion()` para permitir al usuario aceptar o rechazar solicitudes de unión a grupos, gestionando la creación de membresías en caso de aceptación.

## Diagrama de Colaboración (BCE)

<div align=center>

![Diagrama de Colaboración](/images/RUP/analisis-diseno/editarInvitacion/editarInvitacion.svg)

Código fuente: [editarInvitacion.puml](./editarInvitacion.puml) | **Nivel:** Análisis RUP (Agnóstico a la tecnología)

</div>

## Clases de Análisis Identificadas

### Clases Model (Naranja #F2AC4E)
| Clase | Responsabilidad | Trazabilidad |
| :--- | :--- | :--- |
| **Invitacion** | Entidad que representa la solicitud procesada. | Modelo del Dominio |
| **MiembroGrupo** | Entidad que representa la nueva relación de membresía. | Modelo del Dominio |
| **InvitacionRepository** | Gestiona la actualización del estado de la invitación. | Patrón Repository |
| **MiembroRepository** | Gestiona la creación de nuevos miembros en el grupo. | Patrón Repository |

### Clases View (Azul #629EF9)
| Clase | Responsabilidad | Derivación |
| :--- | :--- | :--- |
| **ListarInvitacionesView** | Capturar la acción del usuario (aceptar/rechazar). | Prototipo / UI |

### Clases Controller (Verde #b5bd68)
| Clase | Responsabilidad | Caso de Uso |
| :--- | :--- | :--- |
| **InvitacionesController** | Orquesta la resolución de la invitación y la creación de membresía. | editarInvitacion() |

### Colaboraciones (Verde Claro #CDEBA5)
| Colaboración | Propósito | Invocación |
| :--- | :--- | :--- |
| **:Sistema Disponible** | Estado de retorno tras procesar la solicitud. | Post-condición |

## Mensajes de Colaboración

| Origen | Destino | Mensaje | Intención |
| :--- | :--- | :--- | :--- |
| **:Sistema Disponible** | **ListarInvitacionesView** | `1: responderInvitacion(inv, r)` | Iniciar acción sobre una invitación. |
| **ListarInvitacionesView** | **InvitacionesController** | `2: resolverInvitacion(id, r)` | Delegar lógica de resolución. |
| **InvitacionesController** | **InvitacionRepository** | `3: actualizarEstado(id, r)` | Cambiar estado de la entidad. |
| **InvitacionesController** | **MiembroRepository** | `4: crearMiembro(g, u)` | Vincular usuario al grupo (si acepta). |
| **ListarInvitacionesView** | **:Sistema Disponible** | `5: sistemaDisponible(u)` | Regresar al menú principal. |

## Principios de Análisis Aplicados
1. **Lógica Condicional de Dominio**: El controlador evalúa la respuesta para decidir si debe invocar la creación de un nuevo miembro.
2. **Cohesión de Repositorios**: Se separan las responsabilidades de Invitaciones y Membresías en repositorios distintos.
