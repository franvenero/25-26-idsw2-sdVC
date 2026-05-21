# Análisis: cerrarSesion

## Propósito del Análisis
Garantizar la finalización segura de la sesión activa del usuario. Este proceso es vital para el negocio ya que previene el acceso no autorizado a información sensible en dispositivos compartidos, asegurando que el estado del sistema quede consistente y que los recursos de sesión se liberen adecuadamente tras la actividad del usuario.

## Descripción de la Interacción
1. El **Usuario** solicita el cierre de su sesión desde la **VistaPrincipal**.
2. La **VistaPrincipal** comunica la solicitud al **GestorSesion**.
3. El **GestorSesion** procede a invalidar el estado de la **Sesion** activa.
4. Tras la invalidación, la entidad **Sesion** confirma el cierre.
5. El **GestorSesion** informa a la **VistaPrincipal** para redirigir al usuario al estado inicial (fuera del sistema).
