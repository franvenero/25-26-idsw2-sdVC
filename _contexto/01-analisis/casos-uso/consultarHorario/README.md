# pySigHor > consultarHorario > Análisis

> |[🏠️](/RUP/README.md)|[ 📊](https://raw.githubusercontent.com/mmasias/pySigHor/main/images/RUP/99-seguimiento/diagrama-contexto-administrador.svg)|[Detalle](/RUP/00-casos-uso/02-detalle/consultarHorario/README.md)|**Análisis**|Diseño|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## información del artefacto

- **Proyecto**: pySigHor - Modernización del Sistema Generador de Horarios
- **Fase RUP**: Elaboration (Elaboración)
- **Disciplina**: Análisis y Diseño
- **Versión**: 1.0
- **Fecha**: 2025-07-25
- **Autor**: Equipo de desarrollo

## propósito

Análisis de colaboración del caso de uso `consultarHorario()` mediante el patrón MVC, identificando las clases de análisis, sus responsabilidades y colaboraciones necesarias para implementar la visualización del horario académico generado.

## diagrama de colaboración

<div align=center>

|![Análisis: consultarHorario()](/images/RUP/01-analisis/casos-uso/consultarHorario/consultarHorario-analisis.svg)|
|-|
|Código fuente: [colaboracion.puml](colaboracion.puml)|

</div>

## clases de análisis identificadas

### clases de vista (boundary)

#### ConsultarHorarioView
**Estereotipo**: Vista (Boundary)  
**Responsabilidades**:
- Recibir la solicitud de consulta de horario académico
- Presentar horario completo en formato tabular comprensible
- Mostrar mensaje informativo cuando no existe horario generado
- Gestionar navegación interna dentro del horario (futuras extensiones)
- Manejar salida de la consulta hacia el menú principal

**Colaboraciones**:
- **Entrada**: Recibe `consultarHorario()` desde `:Sistema Disponible` o transferencia automática
- **Control**: Se comunica con `HorarioController`
- **Salida**: **<<include>>** `:Collaboration CompletarGestion` al salir

### clases de control

#### HorarioController
**Estereotipo**: Control  
**Responsabilidades**:
- Coordinar el proceso de consulta de horario académico
- Verificar existencia de horario generado previamente
- Cargar datos completos del horario para visualización
- Gestionar navegación interna dentro del horario consultado
- Coordinar salida de la consulta hacia navegación principal
- Servir como intermediario entre vista y repositorio de horarios

**Colaboraciones**:
- **Vista**: Responde a solicitudes de `ConsultarHorarioView`
- **Repositorio**: Delega operaciones de datos a `HorarioRepository`

### clases de entidad (entity)

#### HorarioRepository
**Estereotipo**: Entidad  
**Responsabilidades**:
- Abstraer el acceso a datos del horario generado
- Implementar verificación de existencia de horario en el sistema
- Cargar horario completo con todos sus detalles académicos
- Proporcionar datos estructurados del horario para visualización
- Gestionar acceso eficiente a la información de horario

**Colaboraciones**:
- **Control**: Responde a `HorarioController`
- **Entidad**: Gestiona instancias de `Horario`

#### Horario
**Estereotipo**: Entidad  
**Responsabilidades**:
- Representar la información completa del horario académico generado
- Encapsular datos de sesiones: cursos, profesores, aulas, horarios
- Proporcionar metadatos: fecha de generación, estadísticas
- Mantener estructura de horario semanal académico
- Facilitar acceso a información para diferentes vistas de consulta

**Colaboraciones**:
- **Repositorio**: Es gestionado por `HorarioRepository`

## patrón de consulta simple para horarios

### consulta con manejo de ausencia

Este análisis implementa consulta directa que:
- **Verifica existencia**: Chequeo inmediato de disponibilidad de horario
- **Presenta completo**: Visualización de horario académico con todos los detalles
- **Maneja ausencia**: Información clara cuando no hay horario disponible
- **Permite navegación**: Flexibilidad para navegación interna futura y salida

## patrón de separación de responsabilidades para consulta

### distribución de la funcionalidad

La separación implementa:
- **HorarioController**: Coordinación del flujo de consulta y verificaciones
- **HorarioRepository**: Abstracción del acceso a datos de horario generado
- **Horario**: Encapsulación de la información académica estructurada
- **ConsultarHorarioView**: Presentación visual del horario y manejo de ausencia

### consulta como operación de solo lectura

- **Sin modificaciones**: Operación puramente de consulta sin cambios de estado
- **Verificación previa**: Chequeo de existencia antes de cargar datos
- **Presentación directa**: Visualización inmediata de información disponible
- **Manejo gracioso**: Ausencia de datos tratada informativamente, no como error

## referencias

- [Caso de uso detallado](../../../00-casos-uso/02-detalle/consultarHorario/README.md)
- [generarHorario() - Caso que genera el horario](../generarHorario/README.md)
- [completarGestion() - Caso de navegación de salida](../completarGestion/README.md)
- [Modelo del dominio](../../../00-casos-uso/00-modelo-del-dominio/modelo-dominio.md)
- [Análisis algorítmico original](../../../../reverseEngineering.md) - Estructura del horario legacy
- [QyA.log](../../../../QyA.log) - Decisiones de diseño para implementación de consulta