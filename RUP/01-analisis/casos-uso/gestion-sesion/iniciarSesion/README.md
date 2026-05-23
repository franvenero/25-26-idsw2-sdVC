# Análisis: iniciarSesion

## Propósito del Análisis
El propósito de este caso de uso es garantizar un acceso seguro y controlado al sistema de gestión de tareas familiares. Desde la perspectiva de negocio, aporta valor al asegurar que cada miembro del grupo acceda únicamente a su información y pueda interactuar de manera personalizada según su rol, protegiendo la integridad y privacidad de los datos del núcleo familiar.

## Descripción de la Interacción
1. El **Usuario** interactúa con la **VistaLogin** proporcionando sus credenciales (identificador y clave).
2. La **VistaLogin** delega la responsabilidad de validación al **GestorAutenticacion**.
3. El **GestorAutenticacion** consulta la entidad **Usuario** para verificar la validez de los datos proporcionados.
4. Una vez verificados, el **GestorAutenticacion** confirma la autenticación.
5. Finalmente, se notifica a la **VistaLogin** para permitir el acceso al entorno principal del sistema.
