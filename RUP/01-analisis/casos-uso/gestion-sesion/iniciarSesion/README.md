# Análisis: iniciarSesion

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis) | [🎨 Diseño](/RUP/02-diseño/diagramas-secuencia/iniciarSesion/README.md) | [💻 Desarrollo](/frontend/src) |

## Información del Artefacto
- **Fase RUP**: Elaboración
- **Disciplina**: Análisis
- **Estatus**: Corregido (Auditoría Tiburón Tranquilo)
- **Patrón**: BCE / MVC conceptual

## Propósito
Análisis del caso de uso `iniciarSesion()` mediante diagrama de colaboración, identificando las clases de análisis y sus interacciones conceptuales, garantizando la transición al estado de sistema disponible tras la autenticación.

## Diagrama de Colaboración (BCE)

<div align=center>

![Diagrama de Colaboración](/images/RUP/analisis-diseno/iniciarSesion/iniciarSesion.svg)

Código fuente: [iniciarSesion.puml](./iniciarSesion.puml) | **Nivel:** Análisis RUP (Agnóstico a la tecnología)

</div>

## Clases de Análisis Identificadas

### Clases Model (Naranja #F2AC4E)
| Clase | Responsabilidad | Trazabilidad |
| :--- | :--- | :--- |
| **Usuario** | Entidad que representa al miembro de la familia. | Modelo del Dominio |
| **Sesion** | Representa el estado de autenticación activa en el sistema. | Concepto de Análisis |
| **UsuarioRepository** | Abstracción para el acceso a los datos de usuarios. | Patrón Repository (Análisis) |

### Clases View (Azul #629EF9)
| Clase | Responsabilidad | Derivación |
| :--- | :--- | :--- |
| **LoginView** | Interfaz conceptual para la captura de credenciales. | Prototipo / UI |

### Clases Controller (Verde #b5bd68)
| Clase | Responsabilidad | Caso de Uso |
| :--- | :--- | :--- |
| **IniciarSesionController** | Coordina la lógica de autenticación y creación de sesión. | iniciarSesion() |

### Colaboraciones (Verde Claro #CDEBA5)
| Colaboración | Propósito | Invocación |
| :--- | :--- | :--- |
| **:Sistema Disponible** | Estado global del sistema tras una sesión exitosa. | Post-condición exitosa |

## Mensajes de Colaboración

| Origen | Destino | Mensaje | Intención |
| :--- | :--- | :--- | :--- |
| **Usuario** | **LoginView** | `1: iniciarSesion(u, c)` | Iniciar el flujo de acceso. |
| **LoginView** | **IniciarSesionController** | `2: autenticar(u, c)` | Delegar validación al control. |
| **IniciarSesionController** | **UsuarioRepository** | `3: validarCredenciales(u, c)` | Verificar existencia y validez. |
| **IniciarSesionController** | **Sesion** | `4: crearSesion(u)` | Persistir estado de login. |
| **LoginView** | **:Sistema Disponible** | `5: sistemaDisponible(u)` | Transicionar al menú principal. |

## Principios de Análisis Aplicados (Rigor Tiburón Tranquilo)
1. **Separación de Intereses (BCE)**: La vista no conoce el repositorio; el controlador orquestra sin conocer detalles de UI.
2. **Nomenclatura Estándar**: Uso de sufijos `View`, `Controller` y `Repository` según los ejemplos de `_contexto/`.
3. **Agnosticismo Tecnológico**: No hay mención a bases de datos, frameworks o protocolos (HTTP/JWT).
4. **Patrón de Cierre**: El flujo no termina en un "ok", sino en la llamada a la colaboración que representa el siguiente estado estable del sistema.

## Trazabilidad
- **Modelo del Dominio**: Se vincula directamente con la entidad `Usuario`.
- **Casos de Uso**: Realización completa del flujo principal de `iniciarSesion`.
