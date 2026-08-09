$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$utf8 = [System.Text.Encoding]::UTF8
$required = @(
  "index.html",
  "styles.css",
  "script.js",
  "README.md",
  "assets/hero-pos.png",
  "documentacion/00_INDICE.md"
)

foreach ($relative in $required) {
  $path = Join-Path $repoRoot $relative
  if (-not (Test-Path -LiteralPath $path)) {
    throw "Falta archivo requerido para publicar: $relative"
  }
}

$mojibakePattern = ([char]0x00C3).ToString() + '|' + ([char]0x00C2).ToString() + '|' + ([char]0xFFFD).ToString()
$textFiles = Get-ChildItem -Recurse -Path $repoRoot -Include *.html,*.css,*.js,*.md,*.txt -File |
  Where-Object { $_.FullName -notmatch '\\.git\\' }

foreach ($file in $textFiles) {
  $content = [System.IO.File]::ReadAllText($file.FullName, $utf8)
  if ($content -match $mojibakePattern) {
    throw "Posible mojibake en $($file.FullName)"
  }
}

Write-Host "Pagina de venta V1 OK."