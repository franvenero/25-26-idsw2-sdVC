# Fase de Análisis (RUP)

Esta carpeta contiene los artefactos que definen el **dominio del problema** y el valor que el sistema aporta a los usuarios.

## Objetivos
- Modelar la realización de los casos de uso mediante diagramas de comunicación.
- Definir la lógica de interacción entre los componentes del sistema, independientemente de la plataforma tecnológica.
- Preparar la transición hacia el diseño técnico mediante la identificación de responsabilidades de cada objeto.

## Contenido
- **Diagramas de Comunicación/Colaboración**: Flujos de alto nivel entre objetos del dominio.
- **Especificaciones de Casos de Uso**: Documentación detallada del comportamiento del sistema.
- **Modelado de Casos de Uso (.svg)**: Representación visual de las interacciones actor-sistema.

## Casos de Uso Analizados
| Caso de Uso | Estado | Descripción |
| :--- | :--- | :--- |
| **iniciarSesion** | Completado | Validación de credenciales y acceso. |
| **cerrarSesion** | Completado | Finalización segura de la sesión. |
| **crearTarea** | Completado | Instanciación y vinculación a grupo. |
| **editarTarea** | Completado | Modificación con validación de conflictos. |
| **eliminarTarea** | Completado | Remoción segura y desvinculación. |
| **marcarCompletada**| Completado | Transición de estado y registro de fin. |
| **abrirTareas** | Completado | Recuperación y presentación de la lista de tareas. |
| **relacionarTareas** | Completado | Vinculación y dependencias lógicas entre tareas. |
| **validarConflicto** | Completado | Algoritmo de negocio para detección de solapamientos. |

