# Diseño Técnico: Caso de Uso - abrirInvitaciones

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis/casos-uso/abrirInvitaciones/README.md) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

---

## 1. Diagrama de Colaboración (Análisis RUP)

A nivel de análisis conceptual (BCE), el diagrama de comunicación en formato de grafo modela las interacciones iniciales agnósticas a la tecnología.

![Diagrama de Colaboración](../../../../images/RUP/analisis-diseno/abrirInvitaciones/abrirInvitaciones.svg)

* [Código fuente PlantUML (.puml)](../../../01-analisis/casos-uso/abrirInvitaciones/colaboracion.puml)

---

## 2. Diagrama de Secuencia (Diseño MVC)

A nivel de diseño físico, la realización técnica detalla el flujo de mensajes asíncronos y la orquestación a través del controlador, el servicio y el repositorio.

![Diagrama de Secuencia](../../../../images/RUP/analisis-diseno/diagramas-secuencia/abrirInvitaciones/secuencia-abrirInvitaciones.svg)

* [Código fuente PlantUML (.puml)](./secuencia.puml)

---

## 3. Especificación del Contrato de API (Endpoint)

Para listar las invitaciones pendientes recibidas por el usuario actual.

- **Endpoint:** `GET /api/v1/invitaciones`
- **Content-Type:** `application/json`

### Request Headers
```http
Authorization: Bearer <token_jwt>
```

### Response (Success 200 OK)
```json
[
  {
    "id": 1,
    "grupo_id": 3,
    "grupo_nombre": "Familia Gomez",
    "remitente_id": 10,
    "remitente_nombre": "Juan Gomez",
    "estado": "pendiente"
  }
]
```

### Errores Manejados
| Código | Razón | Detalle |
| :--- | :--- | :--- |
| **401** | Unauthorized | Token inválido o ausente. |
| **422** | Unprocessable Entity | Formato incorrecto de parámetros. |
| **500** | Internal Server Error | Error no controlado en la base de datos o servidor. |

---

## 4. Trazabilidad: Análisis (BCE) a Diseño Técnico

| Componente Análisis | Implementación Física (Diseño) | Responsabilidad |
| :--- | :--- | :--- |
| **InvitacionesView** (Boundary) | `InvitacionesView` (React Component) | Interfaz gráfica para listar las invitaciones pendientes del usuario. |
| **InvitacionesView** (Boundary) | `api/invitaciones.service.ts` (Axios) | Petición HTTP GET `/invitaciones`. |
| **InvitacionesController** (Control) | `invitaciones_controller.py` (FastAPI Router) | Endpoint `GET /invitaciones` para recibir la petición y retornar JSON. |
| **InvitacionesService** (Control) | `invitaciones_service.py` | Lógica de negocio: delegación al repositorio de invitaciones. |
| **InvitacionRepository** (Entity Abstr.) | `invitacion_repository.py` | Consulta mediante SQLAlchemy para recuperar las filas de `Invitation` con `findAllByUsuario`. |
| **Invitacion** (Entity) | `models/invitation.py` (SQLAlchemy Model) | Definición estructural de los datos de la invitación. |
