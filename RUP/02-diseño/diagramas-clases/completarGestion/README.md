# Diseño Técnico: Completar Gestión

Este documento describe el mecanismo técnico para asegurar que el usuario acceda al sistema solo tras una autenticación válida, redirigiéndolo al "Dashboard" o Menú Principal.

## Mecanismo de Protección de Rutas (Guards)

La navegación segura se basa en el componente **ProtectedRoute**:

1.  **Interceptación**: Antes de renderizar cualquier vista sensible (como `DashboardPage`), el `ProtectedRoute` consulta al `AuthContext`.
2.  **Validación Proactiva**: El `AuthContext` no solo verifica si existe un token localmente, sino que realiza una llamada al endpoint `/api/users/me` de FastAPI.
3.  **Verificación del Backend**: FastAPI valida la firma del JWT, su expiración y si el usuario está activo en la base de datos.
4.  **Redirección**: 
    *   Si la respuesta es exitosa (200 OK), el usuario entra al estado "SistemaDisponible".
    *   Si el token es inválido o ha expirado (401 Unauthorized), se redirige automáticamente al `LoginPage`.

## Flujo de Datos
*   **Entrada**: Acceso a la ruta `/dashboard`.
*   **Proceso**: Hook `verifySession()` en React -> Petición HTTP GET con Header `Authorization: Bearer <token>`.
*   **Salida**: Renderizado del Dashboard o redirección forzada al Login.
