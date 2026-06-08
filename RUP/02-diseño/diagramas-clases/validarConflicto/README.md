# Diseño de Caso de Uso: validarConflicto (Circularidad)

## 1. Descripción
Componente lógico encargado de asegurar que no existan ciclos infinitos en el grafo de dependencias de tareas.

## 2. Reglas de Negocio (Business Rules)
- **BR-VC-01 (No Circularidad):** El sistema debe rechazar cualquier relación que cree un ciclo (Ej: A -> B -> C -> A).
- **BR-VC-02 (Grafo Acíclico Dirigido - DAG):** El conjunto de tareas y sus dependencias debe comportarse siempre como un DAG.

## 3. Algoritmo de Validación (Detección de Ciclos)
Antes de confirmar una nueva relación donde `Tarea A` es predecesora de `Tarea B`:
1. Realizar una búsqueda (DFS - Depth First Search) comenzando desde la `Tarea A`.
2. El objetivo es verificar si la `Tarea B` es ya una predecesora (directa o indirecta) de la `Tarea A`.
3. Si el algoritmo encuentra a `Tarea B` navegando por los predecesores de `Tarea A`, existe un conflicto de circularidad.

### Pseudocódigo:
```python
def check_circularity(potential_predecessor, potential_successor):
    # ¿Es el sucesor ya un ancestro del predecesor?
    visited = set()
    stack = [potential_predecessor]
    
    while stack:
        current = stack.pop()
        if current == potential_successor:
            return True # Ciclo detectado
        
        if current not in visited:
            visited.add(current)
            # Agregar todos los predecesores al stack para seguir subiendo en el grafo
            stack.extend(current.predecessors)
            
    return False # No hay ciclo
```

## 4. Manejo de Excepciones
Si `check_circularity` devuelve `True`, el sistema debe lanzar un error de validación: `CircularDependencyError: La relación crearía un bucle infinito de dependencias.`
