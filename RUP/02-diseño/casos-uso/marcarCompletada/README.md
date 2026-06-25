# Diseño Técnico: Caso de Uso - marcarCompletada

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis/casos-uso/marcarCompletada/README.md) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

---

## 1. Diagrama de Colaboración (Análisis RUP)

A nivel de análisis conceptual (BCE), el diagrama de comunicación en formato de grafo modela las interacciones iniciales agnósticas a la tecnología.

![Diagrama de Colaboración](../../../../images/RUP/analisis-diseno/marcarCompletada/marcarCompletada.svg)

* [Código fuente PlantUML (.puml)](../../../01-analisis/casos-uso/marcarCompletada/colaboracion.puml)

---

## 2. Diagrama de Secuencia (Diseño MVC)

A nivel de diseño físico, la realización técnica detalla el flujo de mensajes asíncronos y la orquestación a través del controlador, el servicio y el repositorio.

![Diagrama de Secuencia](../../../../images/RUP/analisis-diseno/diagramas-secuencia/marcarCompletada/secuencia-marcarCompletada.svg)

* [Código fuente PlantUML (.puml)](./secuencia.puml)

---

## 3. Especificación del Contrato de API (Endpoint)

Para actualizar el estado de completado de una tarea específica, validando previamente que no existan dependencias sin resolver.

- **Endpoint:** `PATCH /api/v1/tasks/{id}/estado`
- **Content-Type:** `application/json`

### Request Headers
```http
Authorization: Bearer <token_jwt>
```

### Request Body
```json
{
  "is_completed": true
}
```

### Response (Success 200 OK)
```json
{
  "id": 1,
  "titulo": "Comprar pan",
  "descripcion": "Ir a la panadería de la esquina",
  "is_completed": true,
  "grupo_id": 2
}
```

### Errores Manejados
| Código | Razón | Detalle |
| :--- | :--- | :--- |
| **401** | Unauthorized | Token inválido o ausente. |
| **404** | Not Found | La tarea con el ID especificado no existe. |
| **422** | Unprocessable Entity | Dependencias pendientes sin resolver o formato incorrecto. |
| **500** | Internal Server Error | Error interno en la base de datos o servidor. |

---

## 4. Trazabilidad: Análisis (BCE) a Diseño Técnico

| Componente Análisis | Implementación Física (Diseño) | Responsabilidad |
| :--- | :--- | :--- |
| **ListarTareasView** (Boundary) | `ListarTareasView` (React Component) | Checkbox e interacción de UI para marcar tarea como completada. |
| **ListarTareasView** (Boundary) | `task.service.ts` (Axios) | Petición HTTP PATCH `/tasks/{id}/estado`. |
| **TareasController** (Control) | `task_router.py` (FastAPI Router) | Endpoint `PATCH /tasks/{task_id}/estado` para recibir la petición. |
| **TareasService** (Control) | `task_service.py` | Lógica de negocio: validación de dependencias y delegación al repositorio. |
| **TareaRepository** (Entity Abstr.) | `task_repository.py` | Modificación del estado de persistencia de la tarea en la base de datos con `actualizar_estado`. |
| **Tarea** (Entity) | `models/task.py` (SQLAlchemy Model) | Definición estructural de los datos de la tarea. |
