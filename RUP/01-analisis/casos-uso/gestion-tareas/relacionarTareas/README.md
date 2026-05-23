# Caso de Uso: Relacionar Tareas

## Propósito Analítico
Este caso de uso define el proceso analítico para establecer dependencias lógicas o cronológicas entre dos tareas (por ejemplo, predecesora y sucesora).

### Lógica del Controlador
Utilizando el enfoque BCE, el **Controlador (GestorTareas)** asume el rol de mediador para garantizar que las vinculaciones sean válidas y coherentes:
1. **Búsqueda y Filtrado**: Recupera las entidades `Tarea` elegibles para ser vinculadas con la tarea actual, excluyendo aquellas que puedan causar referencias circulares.
2. **Gestión de la Intención**: Presenta a través de la frontera (`VistaRelacionarTareas`) las opciones para seleccionar la tarea destino y el tipo de relación.
3. **Instanciación de la Relación**: Tras la confirmación, el controlador coordina la creación de la entidad `RelacionTareas` o actualiza los atributos de las entidades `Tarea` involucradas para reflejar el vínculo.
4. **Confirmación**: Notifica a la frontera el éxito o el abandono/cancelación de la operación por parte del administrador.
