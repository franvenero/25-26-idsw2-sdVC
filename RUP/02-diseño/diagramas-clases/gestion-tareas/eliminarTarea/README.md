# Diseño de Caso de Uso: eliminarTarea

## 1. Descripción
Permite la eliminación de una tarea del sistema. Por motivos de integridad referencial y auditoría, se opta por un borrado lógico.

## 2. Reglas de Negocio (Business Rules)
- **BR-ET-01 (Borrado Lógico):** La tarea no se elimina físicamente de la base de datos. Se marca el atributo `is_deleted = True`.
- **BR-ET-02 (Efecto en Cascada de Dependencias):** 
    - Al eliminar una tarea, esta deja de "bloquear" a sus sucesoras. 
    - Las reglas de validación de completado de las tareas sucesoras deben ignorar a las tareas que tengan `is_deleted == True`.
- **BR-ET-03 (Visibilidad):** Una tarea con `is_deleted == True` no debe aparecer en los listados generales, excepto en vistas de auditoría o papelera.

## 3. Atributos de Clase Relacionados
- `Task.is_deleted: Boolean` (Default: False)
- `Task.deleted_at: DateTime`
- `Task.deleted_by_id: Integer` (FK a User)

## 4. Diagramas de Diseño
- **Diagrama de Secuencia:** [secuencia-diseno.puml](./secuencia-diseno.puml)

## 5. Lógica de Eliminación
1. El sistema verifica que el usuario tenga rol de Administrador o Miembro Administrador.
2. Se establece `is_deleted = True`.
3. No es necesario romper las relaciones en la tabla de dependencias, ya que la lógica de negocio de otros CUs filtrará por el flag `is_deleted`.
