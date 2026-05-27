<div align=right>
 
|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](../../../../README.md) [![](https://img.shields.io/badge/-RUP-FFF?style=flat&logo=Elsevier&logoColor=black)](../../../README.md) [![](https://img.shields.io/badge/-Modelo_del_dominio-FFF?style=flat&logo=freedesktop.org&logoColor=black)](../../../00-casos-uso/00-modelo-del-dominio/modelo-dominio.md) [![](https://img.shields.io/badge/-Actores_&_Casos_de_Uso-FFF?style=flat&logo=crewunited&logoColor=black)](../../../00-casos-uso/01-actores-casos-uso/actores-casos-uso.md) [![](https://img.shields.io/badge/-Diagrama_de_contexto-FFF?style=flat&logo=diagramsdotnet&logoColor=black)](../../../00-casos-uso/01-actores-casos-uso/diagrama-contexto-administrador.md) [![](https://img.shields.io/badge/-Detalle_&_Prototipo-FFF?style=flat&logo=typeorm&logoColor=black)](../../../00-casos-uso/02-detalle/README.md) [![](https://img.shields.io/badge/-Análisis-FFF?style=flat&logo=multisim&logoColor=black)](../README.md)|
|-:|
|[![](https://img.shields.io/badge/-Estado-FFF?style=flat&logo=greensock&logoColor=black)](../../../README.md) [![](https://img.shields.io/badge/-Propuesta_de_dashboard-FFF?style=flat&logo=composer&logoColor=black)](https://raw.githubusercontent.com/mmasias/pySigHor/main/images/RUP/99-seguimiento/diagrama-contexto-administrador.svg) [![](https://img.shields.io/badge/-Reflexiones-FFF?style=flat&logo=hootsuite&logoColor=black)](../../../../extraDocs/README.md) [![](https://img.shields.io/badge/-Log_de_conversación-FFF?style=flat&logo=gnometerminal&logoColor=black)](../../../../conversation-log.md)|

</div>

# pySigHor > asignarProfesorACurso > Análisis

> |[🏠️](/RUP/README.md)|[ 📊](https://raw.githubusercontent.com/mmasias/pySigHor/main/images/RUP/99-seguimiento/diagrama-contexto-administrador.svg)|[Detalle](/RUP/00-casos-uso/02-detalle/asignarProfesorACurso/README.md)|**Análisis**|Diseño|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## información del artefacto

- **Proyecto**: pySigHor - Modernización del Sistema Generador de Horarios
- **Fase RUP**: Elaboration (Elaboración)
- **Disciplina**: Análisis y Diseño
- **Versión**: 1.0
- **Fecha**: 2025-07-27
- **Autor**: Equipo de desarrollo

## propósito

Análisis de colaboración del caso de uso `asignarProfesorACurso()` mediante el patrón MVC, identificando las clases de análisis, sus responsabilidades y colaboraciones necesarias para implementar gestión completa de asignaciones profesor-curso.

## diagrama de colaboración

<div align=center>

|![Análisis: asignarProfesorACurso()](/images/RUP/01-analisis/casos-uso/asignarProfesorACurso/asignarProfesorACurso-analisis.svg)|
|-|
|Código fuente: [colaboracion.puml](colaboracion.puml)|

</div>

## clases de análisis identificadas

### clases de vista (boundary)

#### AsignarProfesorACursoView
**Estereotipo**: Vista (Boundary)  
**Responsabilidades**:
- Recibir la solicitud de gestión de asignaciones para profesor específico
- Interactuar con el controlador para obtener cursos disponibles y asignados
- Presentar listas separadas de cursos disponibles y ya asignados al profesor
- Permitir solicitar asignación de cursos disponibles al profesor
- Permitir solicitar desasignación de cursos ya asignados al profesor
- Mantener sesión de gestión activa para múltiples cambios
- Permitir solicitar guardar asignaciones o cancelar gestión

**Colaboraciones**:
- **Entrada**: Recibe `asignarProfesorACurso(profesorId)` desde `:Profesor Abierto` (estado PROFESOR_ABIERTO)
- **Control**: Se comunica con `AsignacionProfesorCursoController`
- **Salida**: **&lt;&lt;include&gt;&gt;** `:Collaboration EditarProfesor` para regresar a edición de profesor

### clases de control

#### AsignacionProfesorCursoController
**Estereotipo**: Control  
**Responsabilidades**:
- Coordinar la carga de cursos disponibles y ya asignados al profesor
- Validar que el profesor existe y puede tener asignaciones
- Manejar la lógica de asignación y desasignación de cursos específicos
- Procesar guardado de cambios tras modificaciones de asignaciones
- Coordinar navegación entre gestión continua y finalización
- Servir como intermediario entre la vista y los repositorios

**Colaboraciones**:
- **Vista**: Responde a solicitudes de `AsignarProfesorACursoView`
- **Repositorios**: Delega operaciones a `ProfesorRepository` y `CursoRepository`

### clases de entidad (entity)

#### ProfesorRepository
**Estereotipo**: Entidad  
**Responsabilidades**:
- Abstraer el acceso a datos de profesores y sus asignaciones
- Proporcionar método para obtener profesor por ID con cursos asignados
- Implementar asignación y desasignación de cursos al profesor
- Validar restricciones de asignación antes de guardar
- Gestionar relación profesor-cursos con validaciones de negocio

**Colaboraciones**:
- **Control**: Responde a `AsignacionProfesorCursoController`
- **Entidad**: Gestiona instancias de `Profesor` y sus `AsignacionProfesorCurso`

#### CursoRepository
**Estereotipo**: Entidad  
**Responsabilidades**:
- Abstraer el acceso a datos de cursos disponibles en el sistema
- Proporcionar lista de cursos disponibles para asignación
- Proporcionar lista de cursos ya asignados a profesor específico
- Validar que los cursos en las asignaciones existen y están activos

**Colaboraciones**:
- **Control**: Responde a `AsignacionProfesorCursoController`
- **Entidad**: Gestiona instancias de `Curso`

#### Profesor
**Estereotipo**: Entidad  
**Responsabilidades**:
- Representar la información del profesor con sus asignaciones de cursos
- Encapsular atributos básicos del profesor para identificación
- Mantener relación con cursos asignados
- Validar cambios en asignaciones de cursos

**Colaboraciones**:
- **Repositorio**: Es gestionado por `ProfesorRepository`
- **Entidad**: Se relaciona con `AsignacionProfesorCurso`

#### AsignacionProfesorCurso
**Estereotipo**: Entidad  
**Responsabilidades**:
- Representar la relación específica entre profesor y curso asignado
- Encapsular información de la asignación (fecha, estado, observaciones)
- Mantener la integridad de la asignación profesor-curso
- Validar que no existan asignaciones duplicadas

**Colaboraciones**:
- **Entidad**: Relaciona `Profesor` con `Curso`
- **Repositorio**: Es gestionada por `ProfesorRepository`

#### Curso
**Estereotipo**: Entidad  
**Responsabilidades**:
- Representar la información de cursos disponibles para asignación
- Encapsular atributos: código, nombre, créditos, programa académico
- Mantener estado de disponibilidad para asignación
- Proporcionar información para presentación en gestión de asignaciones

**Colaboraciones**:
- **Repositorio**: Es gestionado por `CursoRepository`
- **Entidad**: Se relaciona con `AsignacionProfesorCurso`

## flujo de colaboración principal

### secuencia: asignar profesor a curso

1. **Inicio**: `:Profesor Abierto` → `AsignarProfesorACursoView.asignarProfesorACurso(profesorId)`
2. **Carga profesor**: `AsignarProfesorACursoView` → `AsignacionProfesorCursoController.cargarAsignacionesProfesor(profesorId)`
3. **Obtener profesor**: `AsignacionProfesorCursoController` → `ProfesorRepository.obtenerConAsignaciones(profesorId) : Profesor`
4. **Obtener cursos**: `AsignacionProfesorCursoController` → `CursoRepository.obtenerCursosDisponibles() : List<Curso>`
5. **Obtener asignados**: `AsignacionProfesorCursoController` → `CursoRepository.obtenerCursosAsignados(profesorId) : List<Curso>`
6. **Presentación**: `AsignarProfesorACursoView` presenta listas de cursos disponibles y asignados
7. **Gestión**: Administrador gestiona asignaciones en `AsignarProfesorACursoView`
8. **Guardado**: `AsignarProfesorACursoView` → `AsignacionProfesorCursoController.guardarAsignaciones(nuevasAsignaciones)`
9. **Persistencia**: `AsignacionProfesorCursoController` → `ProfesorRepository.actualizarAsignaciones(profesorId, asignaciones)`
10. **Continuación**: 
    - **Gestión continua**: Permanece en `AsignarProfesorACursoView` para más cambios
    - **Finalización**: `AsignarProfesorACursoView` → **&lt;&lt;include&gt;&gt;** `:Collaboration EditarProfesor.editarProfesor(profesorId)`

## patrón de gestión de asignaciones - "administración de relaciones"

### gestión continua de asignaciones

Este análisis implementa gestión de relaciones que:
- **Presenta asignaciones completas**: Lista separada de cursos disponibles y ya asignados
- **Permite gestión continua**: Múltiples ciclos de asignación/desasignación sin salir del contexto
- **Guarda cambios incrementales**: Cada modificación puede guardarse independientemente
- **Mantiene sesión activa**: El contexto de gestión se preserva durante las modificaciones

### responsabilidades de gestión continua

**AsignarProfesorACursoView** maneja gestión continua:
- **Presenta asignaciones**: Listas separadas de cursos disponibles y asignados al profesor
- **Captura modificaciones**: Cambios en asignaciones (asignar/desasignar cursos específicos)
- **Mantiene contexto**: Sesión de gestión activa para múltiples modificaciones
- **Permite guardado**: Guardado incremental sin salir del contexto de gestión

**AsignacionProfesorCursoController** coordina gestión continua:
- **Valida asignaciones**: Verifica que las nuevas asignaciones son válidas
- **Procesa incrementalmente**: Guarda cambios específicos sin afectar otras asignaciones
- **Mantiene coherencia**: Verifica integridad de asignaciones durante modificaciones
- **Gestiona navegación**: Permite continuar gestionando o finalizar

## patrones arquitectónicos aplicados

### patrón MVC para gestión de asignaciones

- **Model**: `Profesor` + `AsignacionProfesorCurso` + `Curso` + Repositorios (datos y persistencia)
- **View**: `AsignarProfesorACursoView` (gestión continua e interacción)
- **Controller**: `AsignacionProfesorCursoController` (coordinación y validación de asignaciones)

### patrón Repository con gestión de relaciones

- **Abstracción de persistencia**: Repositorios encapsulan lógica de actualización de asignaciones
- **Separación de responsabilidades**: Controlador no conoce detalles de persistencia de asignaciones
- **Transacciones**: Puede implementar guardado transaccional de asignaciones completas
- **Validaciones específicas**: Verifica restricciones de asignación en cada modificación

### gestión continua con múltiples ciclos

- **Ciclo 1**: Presentar asignaciones → Asignar/Desasignar → Guardar → Continuar
- **Ciclo 2**: Modificar más asignaciones → Guardar → Continuar o Finalizar
- **Flexibilidad**: Administrador controla cuándo finalizar la gestión
- **Contexto preservado**: Gestión de asignaciones se mantiene durante todos los ciclos

## consideraciones de diseño específicas para asignaciones profesor-curso

### separación de responsabilidades por entidades

El diseño separa claramente:
- **Profesor**: Datos básicos del profesor sin lógica de cursos
- **AsignacionProfesorCurso**: Relación específica profesor-curso con metadatos
- **Curso**: Información de cursos independiente de profesores
- **Repositorios especializados**: Cada entidad tiene su repositorio especializado

### validaciones de asignaciones

**AsignacionProfesorCursoController** debe verificar:
- **No duplicación**: Un profesor no puede estar asignado dos veces al mismo curso
- **Cursos válidos**: Todos los cursos a asignar existen y están activos
- **Capacidad del profesor**: Verificar límites de carga académica
- **Restricciones académicas**: Validar que el profesor puede dictar el curso específico

### patrón include para navegación específica

- **Separación de responsabilidades**: asignarProfesorACurso() se enfoca en gestión de asignaciones
- **Reutilización**: **&lt;&lt;include&gt;&gt;** editarProfesor() regresa al contexto de edición
- **Entrada específica**: Solo funciona desde `:Profesor Abierto` (estado PROFESOR_ABIERTO)
- **Navegación controlada**: Regresa específicamente a edición del mismo profesor

### flexibilidad de gestión continua

**AsignarProfesorACursoView** puede implementar:
- **Gestión visual**: Listas lado a lado con botones de asignación/desasignación
- **Gestión por filtros**: Búsqueda y filtrado de cursos disponibles
- **Guardado automático**: Guardado inmediato tras cada asignación/desasignación
- **Validación en tiempo real**: Verificación inmediata de restricciones de asignación

## diferencias con editarProfesor()

### asignarProfesorACurso() vs editarProfesor()

**asignarProfesorACurso():**
- **Objetivo**: Gestión específica de asignaciones profesor-curso
- **Interacción**: Gestión continua de relaciones en contexto especializado
- **Datos**: Solo asignaciones de cursos, no datos básicos del profesor
- **Navegación**: Regresa específicamente a edición del mismo profesor

**editarProfesor():**
- **Objetivo**: Modificación de datos básicos del profesor
- **Interacción**: Edición completa de todos los campos del profesor
- **Datos**: Información básica del profesor (nombres, apellidos, contacto, etc.)
- **Navegación**: Puede ir a lista de profesores o continuar editando

### complementariedad con edición de profesores

- **editarProfesor()**: Modifica datos básicos del profesor
- **asignarProfesorACurso()**: Gestiona asignaciones específicas de cursos
- **Separación clara**: Cada caso maneja un aspecto específico de la información del profesor
- **Navegación integrada**: asignarProfesorACurso() regresa a editarProfesor()

## impacto en el algoritmo de generación de horarios

### utilización de las asignaciones

Las asignaciones profesor-curso son utilizadas por:
- **generarHorario()**: El algoritmo considera las asignaciones para crear el horario académico
- **Restricciones**: Solo profesores asignados a cursos específicos pueden aparecer en horarios
- **Optimización**: Mejor distribución de horarios considerando carga de cada profesor

### validaciones relacionadas con el algoritmo

**AsignacionProfesorCursoController** debe considerar:
- **Disponibilidad de profesores**: Solo profesores activos pueden tener asignaciones
- **Impacto en horarios existentes**: Cambios en asignaciones pueden requerir regeneración
- **Coherencia algorítmica**: Asignaciones deben ser utilizables por el algoritmo de generación

## referencias

- [Caso de uso detallado](../../../00-casos-uso/02-detalle/asignarProfesorACurso/README.md)
- [editarProfesor() - Caso relacionado](../editarProfesor/README.md)
- [configurarPreferenciasProfesor() - Caso relacionado](../configurarPreferenciasProfesor/README.md)
- [generarHorario() - Caso dependiente](../generarHorario/README.md)
- [Modelo del dominio](../../../00-casos-uso/00-modelo-del-dominio/modelo-dominio.md)