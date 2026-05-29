# Configuración Tecnológica y Arquitectónica del Proyecto

Este documento establece el puente entre la fase de Análisis y la de Diseño, definiendo las herramientas y patrones que regirán la implementación del sistema.

## 1. Stack Tecnológico Oficial

Para garantizar un sistema escalable, mantenible y moderno, se ha seleccionado el siguiente stack:

### Capa de Presentación (Frontend)
- **Framework:** [React](https://reactjs.org/) (v18+)
- **Lenguaje:** TypeScript (para tipado estático y robustez).
- **Herramienta de Construcción:** Vite (para un desarrollo rápido y empaquetado eficiente).
- **Gestión de Estado/Peticiones:** Axios para comunicación HTTP y Hooks de React para estado local/global.

### Capa de Servicios (Backend)
- **Lenguaje:** Python (v3.10+)
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (basado en Starlette y Pydantic, orientado a alto rendimiento y validación automática).
- **Servidor ASGI:** Uvicorn.
- **Seguridad:** OAuth2 con Password flow y tokens JWT (JSON Web Tokens).

### Capa de Datos
- **Motor de Base de Datos:** PostgreSQL (Producción) / SQLite (Desarrollo local).
- **ORM:** [SQLAlchemy](https://www.sqlalchemy.org/) (Patrón Data Mapper/Declarative).
- **Migraciones:** Alembic.

---

## 2. Impacto en el Modelado de Diseño (Diagramas de Secuencia)

La elección de este stack transforma los diagramas de secuencia de "análisis" (conceptuales) en diagramas de "diseño" (técnicos) bajo las siguientes premisas:

1.  **Asincronía en la Comunicación:** Las llamadas del Frontend al Backend se modelarán como peticiones HTTP asíncronas (Axios). En los diagramas, esto implica que el actor/interfaz no espera bloqueado, sino que maneja estados de "promesa" o "callback".
2.  **Validación de Contratos (Schemas):** FastAPI utiliza **Pydantic**. Los diagramas deben reflejar la validación automática de datos en el punto de entrada del Backend antes de procesar la lógica de negocio.
3.  **Seguridad Transversal:** Toda petición protegida debe incluir un interceptor de seguridad que valide el token **JWT** en la cabecera `Authorization`. Esto se representará como una interacción previa con un componente de Seguridad/Auth.
4.  **Abstracción de Datos:** Las interacciones con la base de datos no serán SQL puro, sino llamadas a métodos del **ORM SQLAlchemy**. Se modelará el flujo a través de Repositorios o Capas de Servicio que encapsulan la persistencia.

---

## 3. Propuesta de Estructura de Proyecto

Se seguirá una arquitectura de **Separación de Concernimientos** (SoC) con carpetas independientes para frontend y backend.

```text
/25-26-idsw2-sdVC
│
├── /frontend               # Proyecto React + Vite
│   ├── /src
│   │   ├── /api            # Servicios Axios y configuración de endpoints
│   │   ├── /components     # Componentes reutilizables (UI)
│   │   ├── /hooks          # Lógica de estado personalizada
│   │   ├── /pages          # Vistas principales (mapeo de rutas)
│   │   ├── /types          # Interfaces y tipos TypeScript
│   │   └── main.tsx        # Punto de entrada
│   └── vite.config.ts
│
├── /backend                # Proyecto FastAPI
│   ├── /app
│   │   ├── /api            # Rutas/Controllers (Endpoints)
│   │   ├── /core           # Configuración global, seguridad (JWT), constantes
│   │   ├── /models         # Modelos de base de datos (SQLAlchemy)
│   │   ├── /schemas        # Modelos de validación/Datan (Pydantic)
│   │   ├── /services       # Lógica de negocio y CRUD (Patrón Repository)
│   │   └── main.py         # Punto de entrada de la aplicación
│   ├── /migrations         # Scripts de Alembic
│   └── requirements.txt
│
└── /docs                   # Documentación adicional y diagramas (RUP)
```

---

**Arquitecto de Software:** Gemini CLI Agent
**Fecha:** 29 de mayo de 2026
