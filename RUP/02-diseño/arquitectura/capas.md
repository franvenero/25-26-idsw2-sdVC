# Arquitectura de Capas

Para el sistema de Gestión de Tareas Compartidas, se adopta una **Arquitectura de 3 Capas (N-Tier)**. Esta elección es ideal para proyectos escalables en .NET o Java, permitiendo una clara separación de responsabilidades y facilitando las pruebas unitarias.

## Diagrama Conceptual
```
[ Presentation Layer (UI) ]
          |
          v
[ Business Logic Layer (BLL) ]
          |
          v
[ Data Access Layer (DAL) ]
```

## Descripción de las Capas

### 1. Presentation Layer (Interfaz de Usuario)
- **Responsabilidad**: Gestionar la interacción con el usuario y presentar los datos.
- **Componentes**: Controladores de API (ASP.NET Web API / Spring Boot), Vistas (React/Angular) o interfaces de escritorio.
- **Realización RUP**: Evolución de los objetos *Boundary*.

### 2. Business Logic Layer (Lógica de Negocio)
- **Responsabilidad**: Procesar las reglas de negocio, validaciones complejas y coordinación de flujos.
- **Componentes**: Services, Business Engines, DTOs (Data Transfer Objects).
- **Realización RUP**: Evolución de los objetos *Control* (ej. `TaskService`, `GroupService`).

### 3. Data Access Layer (Acceso a Datos)
- **Responsabilidad**: Comunicación con el motor de base de datos (SQL Server, PostgreSQL) y persistencia.
- **Componentes**: Repositories, ORM (Entity Framework / Hibernate), Entities (Modelos de BD).
- **Realización RUP**: Evolución de los objetos *Entity*.

## Justificación para .NET / Java
1. **Mantenibilidad**: Cambiar la base de datos (DAL) no afecta la interfaz de usuario (UI).
2. **Tipado Fuerte**: Facilita el uso de DTOs para mover datos entre capas de forma segura.
3. **Inyección de Dependencias**: Tanto .NET como Java (Spring/CDI) soportan de forma nativa la inyección de interfaces, lo que permite desacoplar la BLL de la implementación concreta de la DAL.
4. **Escalabilidad**: Permite que diferentes equipos trabajen en capas distintas simultáneamente.
