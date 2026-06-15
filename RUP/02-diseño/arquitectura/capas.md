# Arquitectura de Capas: Realización del Diseño (Python MVC + Repository)

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

Esta sección describe la organización estructural del sistema BREÑOTASK, la cual implementa una arquitectura de tres capas optimizada para el lenguaje **Python**. Se basa en el patrón **MVC (Modelo-Vista-Controlador)** extendido mediante el **Patrón Repositorio**, garantizando un desacoplamiento efectivo entre la lógica de negocio y los mecanismos de persistencia.

## 1. Trazabilidad: De Análisis (BCE) a Diseño Técnico

En cumplimiento con la metodología RUP, el diseño técnico es la evolución natural del análisis conceptual. La siguiente tabla mapea la transformación de los estereotipos BCE hacia sus realizaciones físicas:

| Estereotipo Análisis (BCE) | Capa de Diseño Técnico | Implementación en Python/React |
| :--- | :--- | :--- |
| **Boundary** (Frontera) | **Capa de Presentación** | Componentes React (.tsx) y Endpoints de API (FastAPI Routers). |
| **Control** (Control) | **Capa de Lógica y Control** | Servicios de Negocio (`services/`) y Controladores de Orquestación. |
| **Entity** (Entidad) | **Capa de Datos** | Entidades SQLAlchemy (`models/`) y Repositorios de Persistencia. |

## 2. Diagrama Conceptual de la Arquitectura

```text
+-------------------------------------------------------+
|                CAPA DE PRESENTACIÓN (UI)              |
|   (React Context, Hooks, Components, FastAPI Routers) |
+---------------------------+---------------------------+
                            |
                            v
+-------------------------------------------------------+
|             CAPA DE LÓGICA Y CONTROL (BLL)            |
|       (Business Logic Services, Validators, RBAC)     |
+---------------------------+---------------------------+
                            |
                            v
+-------------------------------------------------------+
|                  CAPA DE DATOS (DAL)                  |
|     (Repository Pattern, SQLAlchemy Models, SQL Server)|
+-------------------------------------------------------+
```

## 3. Descripción Detallada de las Capas

### 3.1. Capa de Presentación (Views)
Es el punto de entrada al sistema. En el frontend (React), gestiona la captura de eventos y el estado visual mediante Hooks. En el backend (FastAPI), actúa como la frontera técnica (Boundary) que valida los esquemas de entrada (Pydantic) y despacha las peticiones hacia la lógica de negocio.

### 3.2. Capa de Lógica y Control (Controllers/Services)
Representa el núcleo inteligente del sistema. Evolución de los objetos de **Control** del análisis, esta capa orquestará los casos de uso, aplicará las Reglas de Negocio (como la prevención de dependencias circulares) y gestionará el Control de Acceso Basado en Roles (RBAC). No tiene conocimiento de cómo se guardan los datos ni de cómo se presentan.

### 3.3. Capa de Datos (Entities & Repositories)
Encapsula el estado y la persistencia. Las **Entidades** son la evolución de los objetos Entity del análisis, mapeadas físicamente mediante SQLAlchemy. El **Patrón Repositorio** abstrae el acceso a SQL Server, permitiendo que las capas superiores operen sobre abstracciones de colecciones de objetos en lugar de sentencias SQL crudas.

## 4. Justificación Técnica: Desacoplamiento en Python

El uso de esta arquitectura en un ecosistema Python + FastAPI ofrece ventajas críticas de ingeniería:

1. **Inversión de Dependencias**: Al utilizar Servicios y Repositorios, facilitamos la inyección de dependencias, permitiendo que la lógica de negocio sea testeable de forma aislada (Unit Testing) mediante el uso de "mocks".
2. **Abstracción de Persistencia**: El Patrón Repositorio permite que el cambio de motor de base de datos (como la reciente migración de SQLite a SQL Server) se realice modificando exclusivamente la Capa de Datos, sin impacto en la lógica de control.
3. **Mantenibilidad RUP**: La trazabilidad directa desde el análisis BCE facilita la incorporación de nuevos desarrolladores, quienes pueden rastrear el origen de una clase de diseño directamente desde su requerimiento funcional.
4. **Escalabilidad de Casos de Uso**: Al segmentar la lógica en Servicios, evitamos la creación de controladores "gordos", manteniendo el código DRY (Don't Repeat Yourself) y alineado con los principios SOLID.

---
**Arquitecto de Software:** Gemini CLI Agent
**Fecha:** 15 de junio de 2026
