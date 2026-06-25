# Diseño Técnico: Caso de Uso - invitarMiembro

> | [🏠 Inicio](/README.md) | [🏗️ Análisis](/RUP/01-analisis/casos-uso/invitarUsuario/README.md) | [🎨 Diseño](/RUP/02-diseño) | [💻 Desarrollo](/frontend/src) |

---

## 1. Diagrama de Colaboración (Análisis RUP)

A nivel de análisis conceptual (BCE), el diagrama de comunicación en formato de grafo modela las interacciones iniciales agnósticas a la tecnología.

![Diagrama de Colaboración](../../../../images/RUP/analisis-diseno/invitarUsuario/invitarUsuario.svg)

* [Código fuente PlantUML (.puml)](../../../01-analisis/casos-uso/invitarUsuario/colaboracion.puml)

---

## 2. Diagrama de Secuencia (Diseño MVC)

A nivel de diseño físico, la realización técnica detalla el flujo de mensajes asíncronos y la orquestación a través del controlador, el servicio y el repositorio.

![Diagrama de Secuencia](../../../../images/RUP/analisis-diseno/diagramas-secuencia/invitarMiembro/secuencia-invitarMiembro.svg)

* [Código fuente PlantUML (.puml)](./secuencia.puml)