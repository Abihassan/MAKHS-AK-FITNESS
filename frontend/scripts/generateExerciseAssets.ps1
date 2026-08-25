# ============================================================
# GENERATE EXERCISE ASSET MAP
# ============================================================

$projectRoot = Split-Path $PSScriptRoot -Parent

$imageDirectory = Join-Path `
    $projectRoot `
    "assets\images\images"

$videoDirectory = Join-Path `
    $projectRoot `
    "assets\videos"

$outputDirectory = Join-Path `
    $projectRoot `
    "src\data"

$outputFile = Join-Path `
    $outputDirectory `
    "exerciseAssets.ts"


# ============================================================
# CHECK DIRECTORIES
# ============================================================

if (!(Test-Path $imageDirectory)) {
    Write-Host ""
    Write-Host "ERROR: Image directory not found:" -ForegroundColor Red
    Write-Host $imageDirectory
    exit 1
}

if (!(Test-Path $videoDirectory)) {
    Write-Host ""
    Write-Host "ERROR: Video directory not found:" -ForegroundColor Red
    Write-Host $videoDirectory
    exit 1
}

if (!(Test-Path $outputDirectory)) {
    New-Item `
        -ItemType Directory `
        -Path $outputDirectory `
        -Force | Out-Null
}


# ============================================================
# GET FILES
# ============================================================

$imageFiles = Get-ChildItem `
    $imageDirectory `
    -File `
    -Filter "*.jpg"

$videoFiles = Get-ChildItem `
    $videoDirectory `
    -File `
    -Filter "*.gif"


Write-Host ""
Write-Host "Images found: $($imageFiles.Count)" -ForegroundColor Cyan
Write-Host "GIFs found:   $($videoFiles.Count)" -ForegroundColor Cyan
Write-Host ""


# ============================================================
# BUILD TYPESCRIPT
# ============================================================

$lines = New-Object System.Collections.Generic.List[string]

$lines.Add("/*")
$lines.Add(" * ============================================================")
$lines.Add(" * AUTO-GENERATED FILE")
$lines.Add(" * ============================================================")
$lines.Add(" *")
$lines.Add(" * DO NOT EDIT MANUALLY.")
$lines.Add(" *")
$lines.Add(" * Generated from:")
$lines.Add(" * assets/images/images/")
$lines.Add(" * assets/videos/")
$lines.Add(" * ============================================================")
$lines.Add(" */")
$lines.Add("")
$lines.Add("import type { ImageSourcePropType } from `"react-native`";")
$lines.Add("")
$lines.Add("export const EXERCISE_IMAGES: Record<string, ImageSourcePropType> = {")


# ============================================================
# IMAGES
# ============================================================

foreach ($file in $imageFiles | Sort-Object Name) {

    $name = $file.Name

    $safeName = $name.Replace("\", "/")

    $lines.Add(
        "  `"$safeName`": require(`"../../assets/images/images/$safeName`"),"
    )
}

$lines.Add("};")
$lines.Add("")

$lines.Add("export const EXERCISE_GIFS: Record<string, ImageSourcePropType> = {")


# ============================================================
# GIFS
# ============================================================

foreach ($file in $videoFiles | Sort-Object Name) {

    $name = $file.Name

    $safeName = $name.Replace("\", "/")

    $lines.Add(
        "  `"$safeName`": require(`"../../assets/videos/$safeName`"),"
    )
}

$lines.Add("};")
$lines.Add("")


# ============================================================
# WRITE FILE
# ============================================================

$lines |
    Set-Content `
        -Path $outputFile `
        -Encoding UTF8


# ============================================================
# RESULT
# ============================================================

Write-Host "Generated:" -ForegroundColor Green
Write-Host $outputFile
Write-Host ""

Write-Host "Image assets: $($imageFiles.Count)" -ForegroundColor Green
Write-Host "GIF assets:   $($videoFiles.Count)" -ForegroundColor Green
Write-Host ""

Write-Host "Asset map generation complete." -ForegroundColor Green
