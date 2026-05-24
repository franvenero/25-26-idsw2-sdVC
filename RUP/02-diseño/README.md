# Fase 2: Diseño (RUP)

En esta fase se transforman los modelos de análisis (BCE) en especificaciones técnicas detalladas que guiarán la construcción del sistema. A diferencia del análisis, que es agnóstico a la tecnología, el diseño define la realización técnica utilizando patrones de software y arquitecturas específicas.

## Objetivos de la Fase
- **Definición Arquitectónica**: Establecer la estructura de capas y la estrategia de comunicación entre componentes.
- **Detalle Técnico**: Especificar tipos de datos, visibilidad de atributos, firmas de métodos y tipos de retorno.
- **Diseño de Objetos**: Evolucionar las entidades de análisis en clases de diseño y los controladores en servicios o controladores técnicos.
- **Diseño de Persistencia**: Definir el esquema de base de datos y la estrategia de acceso a datos.

## Estructura de Artefactos
- `/arquitectura`: Documentación de la arquitectura de capas y decisiones tecnológicas.
- `/diagramas-clases`: Diagramas detallados con tipos, relaciones y métodos.
- `/diagramas-secuencia`: Realizaciones técnicas de los casos de uso mostrando la interacción entre objetos de diseño.
- `/casos-uso`: Detalles específicos de diseño para cada funcionalidad.

## Tecnologías Objetivo
El diseño está orientado a entornos de tipado fuerte como **.NET (C#)** o **Java**, aprovechando patrones como Repository, DTO y Dependency Injection.
