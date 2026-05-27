# pySigHor > crearRecurso > Análisis

> |[🏠️](/RUP/README.md)|[ 📊](https://raw.githubusercontent.com/mmasias/pySigHor/main/images/RUP/99-seguimiento/diagrama-contexto-administrador.svg)|[Detalle](/RUP/00-casos-uso/02-detalle/crearRecurso/README.md)|**Análisis**|Diseño|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## información del artefacto

- **Proyecto**: pySigHor - Modernización del Sistema Generador de Horarios
- **Fase RUP**: Elaboration (Elaboración)
- **Disciplina**: Análisis y Diseño
- **Versión**: 1.0
- **Fecha**: 2025-07-24
- **Autor**: Equipo de desarrollo

## propósito

Análisis de colaboración del caso de uso `crearRecurso()` mediante el patrón MVC, identificando las clases de análisis, sus responsabilidades y colaboraciones necesarias para implementar creación rápida de recursos con transferencia automática a edición completa.

## diagrama de colaboración

<div align=center>

|![Análisis: crearRecurso()](/images/RUP/01-analisis/casos-uso/crearRecurso/crearRecurso-analisis.svg)|
|-|
|Código fuente: [colaboracion.puml](colaboracion.puml)|

</div>

## clases de análisis identificadas

### clases de vista (boundary)

#### CrearRecursoView
**Estereotipo**: Vista (Boundary)  
**Responsabilidades**:
- Recibir la solicitud de creación de recurso nuevo
- Presentar solicitud de datos mínimos del recurso
- Permitir entrada de código y nombre del recurso
- Gestionar validación de campos obligatorios
- Mostrar mensajes de error de validación o duplicación
- Transferir automáticamente a edición completa tras creación exitosa

**Colaboraciones**:
- **Entrada**: Recibe `crearRecurso()` desde `:Recursos Abierto`
- **Control**: Se comunica con `RecursoController`
- **Salida**: **<<include>>** `:Collaboration EditarRecurso` tras creación exitosa

### clases de control

#### RecursoController
**Estereotipo**: Control  
**Responsabilidades**:
- Coordinar el proceso de creación rápida de recurso
- Validar datos mínimos proporcionados (código y nombre)
- Verificar unicidad del código del recurso en el sistema
- Procesar creación del recurso con datos esenciales
- Gestionar reglas de negocio para creación mínima
- Coordinar transferencia automática a edición completa
- Servir como intermediario entre la vista y el repositorio

**Colaboraciones**:
- **Vista**: Responde a solicitudes de `CrearRecursoView`
- **Repositorio**: Delega operaciones de datos a `RecursoRepository`

### clases de entidad (entity)

#### RecursoRepository
**Estereotipo**: Entidad  
**Responsabilidades**:
- Abstraer el acceso a datos de recursos para creación
- Implementar verificación de unicidad de código de recurso
- Crear nuevo recurso en el sistema con datos mínimos
- Generar identificador único para el recurso creado
- Gestionar persistencia de datos básicos del recurso
- Proporcionar el recurso creado para transferencia a edición

**Colaboraciones**:
- **Control**: Responde a `RecursoController`
- **Entidad**: Gestiona instancias de `Recurso`

#### Recurso
**Estereotipo**: Entidad  
**Responsabilidades**:
- Representar la información mínima del recurso recién creado
- Encapsular datos esenciales: código del recurso y nombre
- Mantener estado inicial válido para el recurso
- Validar datos mínimos según reglas de negocio
- Proporcionar base para expansión en edición completa
- Servir como entidad de transferencia entre casos de uso

**Colaboraciones**:
- **Repositorio**: Es gestionado por `RecursoRepository`

## patrón de creación rápida para recursos - "el delgado"

### creación con datos mínimos

Este análisis implementa creación rápida que:
- **Solicita datos esenciales únicamente**: Código y nombre del recurso
- **Valida unicidad**: Verificación de código único en el sistema
- **Crea inmediatamente**: Persistencia rápida con datos mínimos
- **Transfiere automáticamente**: Paso directo a edición completa sin interrupción

## patrón de transferencia automática

### filosofía Create→Update (C→U)

La transferencia automática implementa:
- **crearRecurso()** como "el delgado": Entrada rápida al sistema
- **editarRecurso()** como "el gordo": Configuración completa y detallada
- **Flujo continuo**: Sin pasos intermedios o confirmaciones adicionales
- **Experiencia integrada**: El usuario percibe un proceso único y fluido

## referencias

- [Caso de uso detallado](../../../00-casos-uso/02-detalle/crearRecurso/README.md)
- [editarRecurso() - Caso destino](../editarRecurso/README.md)
- [eliminarRecurso() - Caso complementario](../eliminarRecurso/README.md)
- [abrirRecursos() - Contexto de navegación](../abrirRecursos/README.md)
- [crearEdificio() - Patrón de referencia](../crearEdificio/README.md)
- [crearAula() - Patrón de referencia](../crearAula/README.md)
- [Modelo del dominio](../../../00-casos-uso/00-modelo-del-dominio/modelo-dominio.md)