# Caso de Uso: Definir Localización

## Flujo Principal
El usuario especifica el lugar donde se llevará a cabo la tarea. El sistema gestiona la creación o modificación del objeto Localización y asegura su relación con la tarea.

## Responsabilidades BCE

| Objeto | Tipo | Responsabilidad |
| :--- | :--- | :--- |
| **VistaLocalizacion** | Boundary | Interfaz para la entrada de datos de ubicación (dirección, coordenadas, etc.). |
| **GestorPlanificacion** | Control | Orquestador de la vinculación entre la localización y la tarea. |
| **Localizacion** | Entity | Contiene los datos espaciales o de ubicación de la tarea. |
| **Tarea** | Entity | Referencia la localización definida. |
