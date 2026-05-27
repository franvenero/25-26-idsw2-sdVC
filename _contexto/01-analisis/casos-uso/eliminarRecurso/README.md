# pySigHor > eliminarRecurso > Análisis

> |[🏠️](/RUP/README.md)|[ 📊](https://raw.githubusercontent.com/mmasias/pySigHor/main/images/RUP/99-seguimiento/diagrama-contexto-administrador.svg)|[Detalle](/RUP/00-casos-uso/02-detalle/eliminarRecurso/README.md)|**Análisis**|Diseño|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## información del artefacto

- **Proyecto**: pySigHor - Modernización del Sistema Generador de Horarios
- **Fase RUP**: Elaboration (Elaboración)
- **Disciplina**: Análisis y Diseño
- **Versión**: 1.0
- **Fecha**: 2025-07-24
- **Autor**: Equipo de desarrollo

## propósito

Análisis de colaboración del caso de uso `eliminarRecurso()` mediante el patrón MVC, identificando las clases de análisis, sus responsabilidades y colaboraciones necesarias para implementar eliminación segura de recursos con confirmación previa.

## diagrama de colaboración

<div align=center>

|![Análisis: eliminarRecurso()](/images/RUP/01-analisis/casos-uso/eliminarRecurso/eliminarRecurso-analisis.svg)|
|-|
|Código fuente: [colaboracion.puml](colaboracion.puml)|

</div>

## clases de análisis identificadas

### clases de vista (boundary)

#### EliminarRecursoView
**Estereotipo**: Vista (Boundary)  
**Responsabilidades**:
- Recibir la solicitud de eliminación de recurso existente
- Presentar información completa del recurso a eliminar
- Mostrar advertencia sobre eliminación irreversible
- Permitir confirmación o cancelación de eliminación
- Gestionar navegación de vuelta a la lista de recursos

**Colaboraciones**:
- **Entrada**: Recibe `eliminarRecurso()` desde `:Recursos Abierto`
- **Control**: Se comunica con `RecursoController`
- **Salida**: **<<include>>** `:Collaboration AbrirRecursos` tras eliminación o cancelación

### clases de control

#### RecursoController
**Estereotipo**: Control  
**Responsabilidades**:
- Coordinar el proceso de eliminación segura de recurso
- Cargar datos completos del recurso para confirmación
- Validar que el recurso puede ser eliminado
- Procesar eliminación tras confirmación del administrador
- Gestionar reglas de negocio para eliminación
- Servir como intermediario entre la vista y el repositorio

**Colaboraciones**:
- **Vista**: Responde a solicitudes de `EliminarRecursoView`
- **Repositorio**: Delega operaciones de datos a `RecursoRepository`

### clases de entidad (entity)

#### RecursoRepository
**Estereotipo**: Entidad  
**Responsabilidades**:
- Abstraer el acceso a datos de recursos para eliminación
- Implementar carga de recurso por ID para confirmación
- Verificar dependencias antes de eliminación
- Implementar eliminación segura del recurso
- Gestionar integridad referencial durante eliminación

**Colaboraciones**:
- **Control**: Responde a `RecursoController`
- **Entidad**: Gestiona instancias de `Recurso`

#### Recurso
**Estereotipo**: Entidad  
**Responsabilidades**:
- Representar la información completa del recurso a eliminar
- Encapsular todos los atributos para mostrar en confirmación: código, nombre, descripción del recurso
- Mantener información sobre dependencias
- Validar que puede ser eliminado según reglas de negocio
- Proporcionar información para advertencias de eliminación

**Colaboraciones**:
- **Repositorio**: Es gestionado por `RecursoRepository`

## patrón de eliminación segura para recursos

### eliminación con confirmación previa

Este análisis implementa eliminación segura que:
- **Presenta información completa**: Todos los datos del recurso a eliminar
- **Muestra dependencias**: Información sobre uso del recurso
- **Requiere confirmación**: Paso obligatorio de confirmación del administrador
- **Valida eliminación**: Verificaciones de integridad antes de proceder

## referencias

- [Caso de uso detallado](../../../00-casos-uso/02-detalle/eliminarRecurso/README.md)
- [crearRecurso() - Caso complementario](../crearRecurso/README.md)
- [editarRecurso() - Caso complementario](../editarRecurso/README.md)
- [abrirRecursos() - Contexto de navegación](../abrirRecursos/README.md)
- [eliminarEdificio() - Patrón de referencia](../eliminarEdificio/README.md)
- [eliminarAula() - Patrón de referencia](../eliminarAula/README.md)
- [Modelo del dominio](../../../00-casos-uso/00-modelo-del-dominio/modelo-dominio.md)