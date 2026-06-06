# Módulo de Gestión de Miembros - Reglas de Negocio y Casos de Uso

Este documento detalla las reglas de negocio y la especificación de los Casos de Uso para la gestión de usuarios dentro del entorno familiar, basándose en los roles definidos en el sistema.

## Roles y Permisos en la Gestión de Miembros

| Acción | Administrador | Miembro Administrador | Miembro |
|--------|:---:|:---:|:---:|
| Invitar/Crear Miembro | ✅ | ✅ | ❌ |
| Listar Miembros del Grupo | ✅ | ✅ | ✅ |
| Modificar Rol de Miembro | ✅ | ⚠️ (Solo a 'Miembro') | ❌ |
| Desactivar Miembro (Borrado Lógico) | ✅ | ✅ (Solo a 'Miembro') | ❌ |
| Ver Perfil Propio | ✅ | ✅ | ✅ |
| Editar Perfil Propio | ✅ | ✅ | ✅ |

## Reglas de Negocio (BR)

1.  **BR-MEM-01: Invitación Única:** Un correo electrónico solo puede estar asociado a una invitación activa o a una cuenta activa dentro del sistema.
2.  **BR-MEM-02: Jerarquía de Edición:** Un 'Miembro Administrador' no puede modificar el rol ni desactivar a un 'Administrador' ni a otro 'Miembro Administrador'. Solo el 'Administrador' tiene autoridad total sobre todos los perfiles.
3.  **BR-MEM-03: Borrado Lógico:** No se permite la eliminación física de miembros para garantizar la integridad referencial de las tareas históricas. La desactivación cambiará el estado del usuario a `inactive`, impidiendo su inicio de sesión pero manteniendo sus registros en el sistema.
4.  **BR-MEM-04: Límites de Grupo:** Un 'Miembro Administrador' puede gestionar miembros dentro de su grupo, pero no tiene permisos para crear nuevos grupos familiares o eliminar el grupo actual (facultad exclusiva del 'Administrador').
5.  **BR-MEM-05: Datos Mínimos de Invitación:** Para invitar a un miembro se requiere obligatoriamente: Nombre, Correo Electrónico y Rol Inicial.

---

## Casos de Uso Formales

### CU-MEM-01: Invitar Miembro
**Actores:** Administrador, Miembro Administrador.
**Descripción:** Permite añadir a una nueva persona al grupo familiar mediante el envío de una invitación o creación directa.

**Flujo Principal:**
1. El actor selecciona la opción "Invitar Miembro".
2. El sistema solicita los datos: Nombre, Email y Rol (Miembro / Miembro Administrador).
3. El sistema valida que el Email no esté en uso (**BR-MEM-01**).
4. El sistema registra la invitación y envía una notificación/enlace al correo proporcionado.
5. El sistema confirma la operación exitosa.

---

### CU-MEM-02: Listar Miembros
**Actores:** Administrador, Miembro Administrador, Miembro.
**Descripción:** Visualización de todas las personas que integran el grupo familiar.

**Flujo Principal:**
1. El actor accede a la sección de "Miembros" o "Familia".
2. El sistema recupera la lista de usuarios asociados al ID del grupo familiar del actor.
3. El sistema muestra Nombre, Rol, Estado (Activo/Inactivo) y Foto de perfil (si aplica).

---

### CU-MEM-03: Modificar Rol de Miembro
**Actores:** Administrador, Miembro Administrador.
**Descripción:** Cambia el nivel de permisos de un usuario existente.

**Flujo Principal:**
1. El actor selecciona un miembro de la lista.
2. El sistema muestra las opciones de edición según la jerarquía (**BR-MEM-02**).
3. El actor selecciona el nuevo rol (ej. Ascender 'Miembro' a 'Miembro Administrador').
4. El sistema actualiza el registro y registra el cambio.
5. El sistema notifica al usuario afectado sobre su nuevo nivel de acceso.

---

### CU-MEM-04: Desactivar Miembro
**Actores:** Administrador, Miembro Administrador.
**Descripción:** Revoca el acceso de un usuario al sistema sin eliminar sus datos históricos.

**Flujo Principal:**
1. El actor selecciona al miembro a desactivar.
2. El sistema solicita confirmación, advirtiendo que es una desactivación lógica (**BR-MEM-03**).
3. El actor confirma la acción.
4. El sistema marca el estado del usuario como `inactive` y cierra sus sesiones activas.
5. El sistema confirma que el usuario ya no tiene acceso al grupo.
