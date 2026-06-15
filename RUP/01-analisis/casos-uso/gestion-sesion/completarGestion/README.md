# Análisis: completarGestion

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

## Información del Artefacto
- **Fase RUP**: Elaboración
- **Disciplina**: Análisis
- **Estatus**: Corregido (Rigor RUP)
- **Patrón**: BCE / MVC conceptual

## Propósito
Análisis de colaboración del caso de uso `completarGestion()` para proveer una visión consolidada del estado de las tareas y grupos del usuario, actuando como dashboard de control.

## Diagrama de Colaboración (BCE)

<div align=center>

![Diagrama de Colaboración](/images/RUP/analisis-diseno/completarGestion/completarGestion.svg)

Código fuente: [completarGestion.puml](./completarGestion.puml) | **Nivel:** Análisis RUP (Agnóstico a la tecnología)

</div>

## Clases de Análisis Identificadas

### Clases Model (Naranja #F2AC4E)
| Clase | Responsabilidad | Trazabilidad |
| :--- | :--- | :--- |
| **Tarea** | Entidades que representan el trabajo pendiente. | Modelo del Dominio |
| **Grupo** | Entidades que representan el contexto de colaboración. | Modelo del Dominio |
| **TareaRepository** | Proveedor de resúmenes de tareas por usuario. | Patrón Repository |
| **GrupoRepository** | Proveedor de información de grupos activos. | Patrón Repository |

### Clases View (Azul #629EF9)
| Clase | Responsabilidad | Derivación |
| :--- | :--- | :--- |
| **ResumenGestionView** | Dashboard principal que consolida la información del usuario. | Prototipo / UI |

### Clases Controller (Verde #b5bd68)
| Clase | Responsabilidad | Caso de Uso |
| :--- | :--- | :--- |
| **TareasController** | Orquesta la recolección de métricas y estados de múltiples entidades. | completarGestion() |

### Colaboraciones (Verde Claro #CDEBA5)
| Colaboración | Propósito | Invocación |
| :--- | :--- | :--- |
| **:Sistema Disponible** | Estado operativo central del sistema. | Origen / Destino |

## Mensajes de Colaboración

| Origen | Destino | Mensaje | Intención |
| :--- | :--- | :--- | :--- |
| **:Sistema Disponible** | **ResumenGestionView** | `1: completarGestion()` | Acceder al resumen global. |
| **ResumenGestionView** | **TareasController** | `2: obtenerResumen(u)` | Solicitar consolidación de datos. |
| **TareasController** | **GrupoRepository** | `3: obtenerGruposActivos(u)` | Recuperar contextos de trabajo. |
| **TareasController** | **TareaRepository** | `4: obtenerTareasPendientes(u)` | Recuperar carga de trabajo. |
| **ResumenGestionView** | **:Sistema Disponible** | `5: sistemaDisponible(u)` | Regresar al menú de navegación. |

## Principios de Análisis Aplicados
1. **Consolidación Multi-Dominio**: El controlador asume la responsabilidad de interactuar con diferentes repositorios para construir una vista unificada que la entidad por sí sola no posee.
2. **Reutilización de Controladores**: Se asigna a `TareasController` para centralizar la lógica de "Hub de Tareas", evitando la proliferación de controladores de dashboard.
3. **Dashboard Conceptual**: La vista se diseña como un orquestador de información, no solo como una tabla de datos.
