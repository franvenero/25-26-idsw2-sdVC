# create_svg_structure.ps1
# Script para crear la estructura de directorios para los diagramas SVG.

# 1. Definir rutas
$baseTargetDir = "images/RUP/analisis-diseno"
$sourceDir = "RUP/01-analisis/casos-uso"

Write-Host "--- Creando estructura de directorios en $baseTargetDir ---" -ForegroundColor Cyan

# 2. Crear la ruta base (mkdir -p equivalente)
if (!(Test-Path $baseTargetDir)) {
    New-Item -Path $baseTargetDir -ItemType Directory -Force | Out-Null
    Write-Host "Ruta base creada: $baseTargetDir" -ForegroundColor Green
} else {
    Write-Host "La ruta base ya existe: $baseTargetDir" -ForegroundColor Gray
}

# 3. Escanear casos de uso y crear subcarpetas
if (Test-Path $sourceDir) {
    # Obtener solo los directorios dentro de casos-uso
    $useCases = Get-ChildItem -Path $sourceDir -Directory

    foreach ($useCase in $useCases) {
        $targetPath = Join-Path $baseTargetDir $useCase.Name
        
        if (!(Test-Path $targetPath)) {
            New-Item -Path $targetPath -ItemType Directory -Force | Out-Null
            Write-Host "  > Creada carpeta: $($useCase.Name)" -ForegroundColor Green
        } else {
            Write-Host "  > Carpeta ya existe: $($useCase.Name)" -ForegroundColor Gray
        }
    }
} else {
    Write-Error "No se encontró el directorio de origen: $sourceDir"
}

Write-Host "--- Proceso finalizado ---" -ForegroundColor Cyan
