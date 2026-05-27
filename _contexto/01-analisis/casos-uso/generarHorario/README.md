# pySigHor > generarHorario > Análisis

> |[🏠️](/RUP/README.md)|[ 📊](https://raw.githubusercontent.com/mmasias/pySigHor/main/images/RUP/99-seguimiento/diagrama-contexto-administrador.svg)|[Detalle](/RUP/00-casos-uso/02-detalle/generarHorario/README.md)|**Análisis**|Diseño|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## información del artefacto

- **Proyecto**: pySigHor - Modernización del Sistema Generador de Horarios
- **Fase RUP**: Elaboration (Elaboración)
- **Disciplina**: Análisis y Diseño
- **Versión**: 1.0
- **Fecha**: 2025-07-25
- **Autor**: Equipo de desarrollo

## propósito

Análisis de colaboración del caso de uso `generarHorario()` mediante el patrón MVC, identificando las clases de análisis, sus responsabilidades y colaboraciones necesarias para implementar el proceso algorítmico de generación de horarios académicos.

## diagrama de colaboración

<div align=center>

|![Análisis: generarHorario()](/images/RUP/01-analisis/casos-uso/generarHorario/generarHorario-analisis.svg)|
|-|
|Código fuente: [colaboracion.puml](colaboracion.puml)|

</div>

## clases de análisis identificadas

### clases de vista (boundary)

#### GenerarHorarioView
**Estereotipo**: Vista (Boundary)  
**Responsabilidades**:
- Recibir la solicitud de generación de horario
- Presentar validaciones de datos mínimos insuficientes
- Presentar confirmación de reemplazo de horario existente
- Mostrar progreso durante el proceso de generación algorítmica
- Gestionar cancelación del proceso de generación
- Transferir automáticamente a visualización del horario generado

**Colaboraciones**:
- **Entrada**: Recibe `generarHorario()` desde `:Sistema Disponible`
- **Control**: Se comunica con `HorarioController`
- **Salida**: **<<include>>** `:Collaboration ConsultarHorario` tras generación exitosa
- **Salida**: **<<include>>** `:Collaboration CompletarGestion` tras cancelación/error

### clases de control

#### HorarioController
**Estereotipo**: Control  
**Responsabilidades**:
- Coordinar el proceso completo de generación de horarios
- Delegar validación de datos mínimos al validador
- Verificar existencia de horario previo para manejo de reemplazo
- Coordinar la ejecución del algoritmo de generación
- Gestionar estados de confirmación y cancelación
- Servir como intermediario entre vista, repositorio y generador algorítmico

**Colaboraciones**:
- **Vista**: Responde a solicitudes de `GenerarHorarioView`
- **Repositorio**: Delega operaciones de datos a `HorarioRepository`
- **Validador**: Delega validaciones a `Validador`
- **Generador**: Delega generación algorítmica a `HorarioGenerator`

### clases de entidad (entity)

#### HorarioRepository
**Estereotipo**: Entidad  
**Responsabilidades**:
- Abstraer el acceso a datos maestros del sistema
- Implementar conteo de entidades para validación mínima
- Verificar existencia de horario generado previamente
- Cargar datos maestros completos para el algoritmo
- Gestionar persistencia del horario generado
- Proporcionar datos de horario existente para confirmación

**Colaboraciones**:
- **Control**: Responde a `HorarioController`
- **Validador**: Proporciona datos para `Validador`
- **Generador**: Suministra datos maestros a `HorarioGenerator`

#### HorarioGenerator
**Estereotipo**: Entidad  
**Responsabilidades**:
- Encapsular la lógica del algoritmo de generación de 4 fases
- Ejecutar PrepararH(), GeneraPreHorario(), GeneraHorario(), casos especiales
- Procesar datos maestros (cursos, profesores, aulas, recursos)
- Aplicar algoritmos de optimización y resolución de conflictos
- Generar horario académico optimizado
- Coordinar persistencia del resultado generado

**Colaboraciones**:
- **Control**: Responde a `HorarioController`
- **Repositorio**: Solicita datos y persistencia a `HorarioRepository`

#### Validador
**Estereotipo**: Entidad  
**Responsabilidades**:
- Implementar validaciones de datos mínimos del sistema
- Verificar existencia de al menos 1 curso, 1 profesor, 1 aula
- Proporcionar información detallada sobre datos faltantes
- Validar integridad de datos maestros antes de generación
- Generar reportes de validación para el usuario

**Colaboraciones**:
- **Control**: Responde a `HorarioController`
- **Repositorio**: Consulta datos en `HorarioRepository`

## patrón de proceso algorítmico para generación

### generación con algoritmo complejo

Este análisis implementa proceso algorítmico que:
- **Valida datos mínimos**: Verificación de requisitos antes de ejecutar
- **Maneja conflictos**: Detección y confirmación de reemplazo de horario
- **Ejecuta algoritmo**: Proceso de 4 fases con optimización automática
- **Persiste automáticamente**: Guardado durante generación sin confirmación adicional
- **Transfiere resultado**: Paso automático a visualización del horario generado

## patrón de separación de responsabilidades algorítmicas

### distribución de la complejidad

La separación implementa:
- **HorarioController**: Coordinación del proceso y flujo de control
- **Validador**: Verificaciones previas y validaciones de integridad
- **HorarioGenerator**: Encapsulación completa del algoritmo de 4 fases
- **HorarioRepository**: Abstracción de persistencia y acceso a datos
- **GenerarHorarioView**: Interacción con usuario y presentación de estados

### algoritmo como servicio

- **Encapsulación**: HorarioGenerator oculta complejidad de 4 fases algorítmicas
- **Abstracción**: Controller trata generación como servicio de alto nivel
- **Separación**: Lógica algorítmica independiente de validaciones y persistencia
- **Reutilización**: Algoritmo puede ser invocado desde otros contextos futuros

## referencias

- [Caso de uso detallado](../../../00-casos-uso/02-detalle/generarHorario/README.md)
- [consultarHorario() - Caso de transferencia automática](../consultarHorario/README.md)
- [completarGestion() - Caso de navegación alternativa](../completarGestion/README.md)
- [Modelo del dominio](../../../00-casos-uso/00-modelo-del-dominio/modelo-dominio.md)
- [Análisis algorítmico original](../../../../reverseEngineering.md) - Algoritmo de 4 fases del sistema legacy
- [QyA.log](../../../../QyA.log) - Decisiones de diseño para implementación algorítmica