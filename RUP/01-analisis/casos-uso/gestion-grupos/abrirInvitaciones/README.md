# Análisis: abrirInvitaciones

> |[🏠️](/RUP/README.md)|**Análisis**|Diseño|Desarrollo|Pruebas|
> |-|-|-|-|-|

## Información del Artefacto
- **Fase RUP**: Elaboración
- **Disciplina**: Análisis
- **Estatus**: Corregido (Rigor RUP)
- **Patrón**: BCE / MVC conceptual

## Propósito
Análisis de colaboración del caso de uso `abrirInvitaciones()` para permitir al usuario revisar las solicitudes pendientes de ingreso a diversos grupos familiares.

## Diagrama de Colaboración (BCE)

<div align=center>

![Diagrama de Colaboración](/images/RUP/analisis-diseno/abrirInvitaciones/abrirInvitaciones.svg)

Código fuente: [abrirInvitaciones.puml](./abrirInvitaciones.puml) | **Nivel:** Análisis RUP (Agnóstico a la tecnología)

</div>

## Clases de Análisis Identificadas

### Clases Model (Naranja #F2AC4E)
| Clase | Responsabilidad | Trazabilidad |
| :--- | :--- | :--- |
| **Invitacion** | Entidad que representa la solicitud de ingreso. | Modelo del Dominio |
| **InvitacionRepository** | Abstracción para el filtrado de invitaciones por usuario. | Patrón Repository |

### Clases View (Azul #629EF9)
| Clase | Responsabilidad | Derivación |
| :--- | :--- | :--- |
| **ListarInvitacionesView** | Presentar la lista de invitaciones recibidas. | Prototipo / UI |

### Clases Controller (Verde #b5bd68)
| Clase | Responsabilidad | Caso de Uso |
| :--- | :--- | :--- |
| **InvitacionesController** | Coordina la búsqueda de invitaciones en estado pendiente. | abrirInvitaciones() |

### Colaboraciones (Verde Claro #CDEBA5)
| Colaboración | Propósito | Invocación |
| :--- | :--- | :--- |
| **:Sistema Disponible** | Estado global de retorno. | Post-condición |

## Mensajes de Colaboración

| Origen | Destino | Mensaje | Intención |
| :--- | :--- | :--- | :--- |
| **:Sistema Disponible** | **ListarInvitacionesView** | `1: abrirInvitaciones()` | Iniciar la vista de solicitudes. |
| **ListarInvitacionesView** | **InvitacionesController** | `2: obtenerInvitaciones(u)` | Solicitar datos de invitaciones. |
| **InvitacionesController** | **InvitacionRepository** | `3: buscarPendientesPorUsuario(u)` | Recuperar registros del dominio. |
| **ListarInvitacionesView** | **:Sistema Disponible** | `4: sistemaDisponible(u)` | Regresar al menú principal. |

## Principios de Análisis Aplicados
1. **Filtro de Dominio**: El controlador asume la responsabilidad de filtrar solo aquellas invitaciones que están en estado pendiente para el usuario actual.
2. **Nomenclatura Específica**: Se diferencia `InvitacionesController` del gestor general de grupos para mayor cohesión.
