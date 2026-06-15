# Análisis: invitarUsuario

> | [🏠 Inicio](../../../../../README.md) | [🏗️ Análisis](../../../../../RUP/01-analisis/casos-uso/gestion-grupos/invitarUsuario) | [🎨 Diseño](../../../../../RUP/02-diseño/diagramas-secuencia/invitarUsuario) | [💻 Desarrollo](../../../../../frontend/src) | [🧪 Pruebas](../../../../../) |

## Información del Artefacto
- **Fase RUP**: Elaboración
- **Disciplina**: Análisis
- **Estatus**: Corregido (Rigor RUP)
- **Patrón**: BCE / MVC conceptual

## Propósito
Análisis de colaboración del caso de uso `invitarUsuario()` para permitir a un administrador de grupo invitar a nuevos miembros, asegurando que el invitado exista y no forme parte ya del grupo.

## Diagrama de Colaboración (BCE)

<div align=center>

![Diagrama de Colaboración](/images/RUP/analisis-diseno/invitarUsuario/invitarUsuario.svg)

Código fuente: [invitarUsuario.puml](./invitarUsuario.puml) | **Nivel:** Análisis RUP (Agnóstico a la tecnología)

</div>

## Clases de Análisis Identificadas

### Clases Model (Naranja #F2AC4E)
| Clase | Responsabilidad | Trazabilidad |
| :--- | :--- | :--- |
| **Usuario** | Entidad que representa al usuario potencial invitado. | Modelo del Dominio |
| **MiembroGrupo** | Entidad utilizada para verificar la no pertenencia previa. | Modelo del Dominio |
| **Invitacion** | Entidad que representa la nueva solicitud de unión. | Modelo del Dominio |
| **UsuarioRepository** | Provee acceso a la validación de existencia del invitado. | Patrón Repository |
| **MiembroRepository** | Provee acceso a la comprobación de membresías actuales. | Patrón Repository |
| **InvitacionRepository** | Gestiona la persistencia de la nueva invitación. | Patrón Repository |

### Clases View (Azul #629EF9)
| Clase | Responsabilidad | Derivación |
| :--- | :--- | :--- |
| **EnviarInvitacionView** | Capturar el identificador del invitado y confirmar envío. | Prototipo / UI |

### Clases Controller (Verde #b5bd68)
| Clase | Responsabilidad | Caso de Uso |
| :--- | :--- | :--- |
| **InvitacionesController** | Coordina las validaciones previas y la creación de la invitación. | invitarUsuario() |

### Colaboraciones (Verde Claro #CDEBA5)
| Colaboración | Propósito | Invocación |
| :--- | :--- | :--- |
| **:Sistema Disponible** | Estado global de retorno tras el envío. | Post-condición |

## Mensajes de Colaboración

| Origen | Destino | Mensaje | Intención |
| :--- | :--- | :--- | :--- |
| **:Sistema Disponible** | **EnviarInvitacionView** | `1: invitarUsuario(g)` | Iniciar flujo de invitación. |
| **EnviarInvitacionView** | **InvitacionesController** | `2: enviarInvitacion(g, id)` | Delegar proceso de invitación. |
| **InvitacionesController** | **UsuarioRepository** | `3: validarExistencia(id)` | Confirmar que el usuario existe. |
| **InvitacionesController** | **MiembroRepository** | `4: verificarPertenencia(g, id)` | Evitar duplicidad de membresía. |
| **InvitacionesController** | **InvitacionRepository** | `5: crearInvitacion(g, id)` | Registrar la invitación pendiente. |
| **EnviarInvitacionView** | **:Sistema Disponible** | `6: sistemaDisponible(u)` | Regresar al menú principal. |

## Principios de Análisis Aplicados
1. **Validación Preventiva**: El controlador centraliza las reglas de negocio (existencia y no pertenencia) antes de proceder a la creación del registro.
2. **Abstracción de Repositorios**: Se utilizan tres repositorios distintos para mantener la pureza de responsabilidades sobre cada entidad.
