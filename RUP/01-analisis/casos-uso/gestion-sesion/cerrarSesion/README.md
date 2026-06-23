# Análisis: cerrarSesion

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis) | [🎨 Diseño](/RUP/02-diseño/diagramas-secuencia/cerrarSesion/README.md) | [💻 Desarrollo](/frontend/src) |

## Información del Artefacto
- **Fase RUP**: Elaboración
- **Disciplina**: Análisis
- **Estatus**: Corregido (Rigor RUP)
- **Patrón**: BCE / MVC conceptual

## Propósito
Análisis de colaboración del caso de uso `cerrarSesion()` para garantizar la finalización segura de la sesión activa, liberando recursos y transicionando el sistema a un estado de acceso restringido.

## Diagrama de Colaboración (BCE)

<div align=center>

![Diagrama de Colaboración](/images/RUP/analisis-diseno/cerrarSesion/cerrarSesion.svg)

Código fuente: [cerrarSesion.puml](./cerrarSesion.puml) | **Nivel:** Análisis RUP (Agnóstico a la tecnología)

</div>

## Clases de Análisis Identificadas

### Clases Model (Naranja #F2AC4E)
| Clase | Responsabilidad | Trazabilidad |
| :--- | :--- | :--- |
| **Sesion** | Entidad que representa el estado de autenticación a invalidar. | Concepto de Análisis |
| **SesionRepository** | Abstracción para la gestión del ciclo de vida de las sesiones. | Patrón Repository |

### Clases View (Azul #629EF9)
| Clase | Responsabilidad | Derivación |
| :--- | :--- | :--- |
| **MainView** | Punto de acceso para la solicitud de cierre de sesión. | Prototipo / UI |

### Clases Controller (Verde #b5bd68)
| Clase | Responsabilidad | Caso de Uso |
| :--- | :--- | :--- |
| **SesionController** | Coordina la invalidación de la sesión y el cambio de estado global. | cerrarSesion() |

### Colaboraciones (Verde Claro #CDEBA5)
| Colaboración | Propósito | Invocación |
| :--- | :--- | :--- |
| **:Sistema No Disponible** | Estado inicial/final del sistema sin usuario autenticado. | Post-condición |

## Mensajes de Colaboración

| Origen | Destino | Mensaje | Intención |
| :--- | :--- | :--- | :--- |
| **Usuario** | **MainView** | `1: cerrarSesion()` | Solicitar salida del sistema. |
| **MainView** | **SesionController** | `2: finalizarSesion()` | Delegar la lógica de cierre. |
| **SesionController** | **SesionRepository** | `3: invalidarSesionActual()` | Persistir la baja de la sesión. |
| **MainView** | **:Sistema No Disponible** | `4: sistemaNoDisponible()` | Transicionar al estado de logout. |

## Principios de Análisis Aplicados
1. **Inversión del Estado**: A diferencia de la mayoría de CUs, este transiciona de un estado operativo a uno de inactividad (`:Sistema No Disponible`).
2. **Especialización del Controlador**: Se utiliza `SesionController` para mantener la cohesión con `iniciarSesion`.
3. **Agnosticismo**: No se asume el uso de cookies, tokens o almacenamiento local; se trata como una invalidación lógica en el repositorio.
