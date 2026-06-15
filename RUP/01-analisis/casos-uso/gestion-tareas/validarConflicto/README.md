# Análisis: validarConflicto

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

## Información del Artefacto
- **Fase RUP**: Elaboración
- **Disciplina**: Análisis
- **Estatus**: Corregido (Rigor RUP)
- **Patrón**: BCE / MVC conceptual

## Propósito
Análisis de colaboración del caso de uso `validarConflicto()` para detectar solapamientos temporales o de recursos entre tareas, garantizando la viabilidad de la planificación familiar.

## Diagrama de Colaboración (BCE)

<div align=center>

![Diagrama de Colaboración](/images/RUP/analisis-diseno/validarConflicto/validarConflicto.svg)

Código fuente: [validarConflicto.puml](./validarConflicto.puml) | **Nivel:** Análisis RUP (Agnóstico a la tecnología)

</div>

## Clases de Análisis Identificadas

### Clases Model (Naranja #F2AC4E)
| Clase | Responsabilidad | Trazabilidad |
| :--- | :--- | :--- |
| **Tarea** | Entidad sujeta a validación cronológica. | Modelo del Dominio |
| **TareaRepository** | Abstracción para la búsqueda de colisiones temporales en el conjunto de tareas. | Patrón Repository |

### Clases View (Azul #629EF9)
| Clase | Responsabilidad | Derivación |
| :--- | :--- | :--- |
| **DetalleTareaView** | Presentar alertas de conflicto y permitir la corrección de horarios. | Prototipo / UI |

### Clases Controller (Verde #b5bd68)
| Clase | Responsabilidad | Caso de Uso |
| :--- | :--- | :--- |
| **TareasController** | Orquesta el proceso de validación cruzada entre tareas del mismo contexto. | validarConflicto() |

### Colaboraciones (Verde Claro #CDEBA5)
| Colaboración | Propósito | Invocación |
| :--- | :--- | :--- |
| **:Sistema Disponible** | Estado global de retorno tras la validación. | Post-condición |

## Mensajes de Colaboración

| Origen | Destino | Mensaje | Intención |
| :--- | :--- | :--- | :--- |
| **:Sistema Disponible** | **DetalleTareaView** | `1: validarHorario(d)` | Iniciar verificación de colisión. |
| **DetalleTareaView** | **TareasController** | `2: verificarConflictos(id, d)` | Delegar el cálculo de solapamientos. |
| **TareasController** | **TareaRepository** | `3: buscarSolapamientos(id, d)` | Consultar colisiones en el dominio. |
| **DetalleTareaView** | **:Sistema Disponible** | `4: sistemaDisponible(u)` | Finalizar validación y regresar. |

## Principios de Análisis Aplicados
1. **Cohesión Funcional**: Se separa la lógica de validación de conflictos como una responsabilidad específica del controlador de tareas, permitiendo su reutilización en flujos de creación y edición.
2. **Consultas de Dominio**: El repositorio asume la carga de buscar en el conjunto de entidades aquellas que interfieran con la propuesta temporal, manteniendo al controlador enfocado en la decisión de negocio.
3. **Transparencia de Estados**: Sigue el ciclo de vida estándar del sistema definido por las colaboraciones globales.
