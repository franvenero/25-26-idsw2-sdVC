# Análisis: crearTarea

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis/casos-uso/gestion-tareas/crearTarea) | [🎨 Diseño](/RUP/02-diseño/diagramas-secuencia/crearTarea) | [💻 Desarrollo](/frontend/src) |

## Información del Artefacto
- **Fase RUP**: Elaboración
- **Disciplina**: Análisis
- **Estatus**: Corregido (Rigor RUP)
- **Patrón**: BCE / MVC conceptual

## Propósito
Análisis de colaboración del caso de uso `crearTarea()` para permitir la instanciación de nuevas actividades o recordatorios dentro de un grupo familiar, asegurando la integridad de los datos y su vinculación correcta.

## Diagrama de Colaboración (BCE)

<div align=center>

![Diagrama de Colaboración](/images/RUP/analisis-diseno/crearTarea/crearTarea.svg)

Código fuente: [crearTarea.puml](./crearTarea.puml) | **Nivel:** Análisis RUP (Agnóstico a la tecnología)

</div>

## Clases de Análisis Identificadas

### Clases Model (Naranja #F2AC4E)
| Clase | Responsabilidad | Trazabilidad |
| :--- | :--- | :--- |
| **Tarea** | Entidad que encapsula la información de la nueva actividad. | Modelo del Dominio |
| **Grupo** | Entidad que actúa como contenedor de la tarea. | Modelo del Dominio |
| **TareaRepository** | Abstracción para la persistencia y validación de nuevas tareas. | Patrón Repository |

### Clases View (Azul #629EF9)
| Clase | Responsabilidad | Derivación |
| :--- | :--- | :--- |
| **CrearTareaView** | Capturar los atributos de la tarea (título, descripción, fecha). | Prototipo / UI |

### Clases Controller (Verde #b5bd68)
| Clase | Responsabilidad | Caso de Uso |
| :--- | :--- | :--- |
| **TareasController** | Coordina la creación de la tarea y su asociación al grupo. | crearTarea() |

### Colaboraciones (Verde Claro #CDEBA5)
| Colaboración | Propósito | Invocación |
| :--- | :--- | :--- |
| **:Sistema Disponible** | Estado global de retorno tras la creación exitosa. | Post-condición |

## Mensajes de Colaboración

| Origen | Destino | Mensaje | Intención |
| :--- | :--- | :--- | :--- |
| **:Sistema Disponible** | **CrearTareaView** | `1: crearTarea()` | Iniciar formulario de nueva tarea. |
| **CrearTareaView** | **TareasController** | `2: registrarTarea(d, g)` | Delegar creación y vinculación. |
| **TareasController** | **TareaRepository** | `3: crearTareaEnGrupo(d, g)` | Persistir tarea vinculada al grupo. |
| **CrearTareaView** | **:Sistema Disponible** | `4: sistemaDisponible(u)` | Finalizar y regresar a la vista de tareas. |

## Principios de Análisis Aplicados
1. **Delegación de Creación**: El controlador no instancia la tarea directamente, sino que delega la operación atómica al repositorio para asegurar la integridad.
2. **Contexto Obligatorio**: Se garantiza que toda tarea nazca vinculada a un grupo familiar, respetando el modelo de dominio.
3. **Pureza BCE**: Clara separación entre captura de datos (Vista), orquestación (Control) y persistencia conceptual (Repositorio).
