param(
  [switch]$StrictMojibake
)

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$utf8 = [System.Text.Encoding]::UTF8

function Fail($message) {
  Write-Error $message
  exit 1
}

$tracked = @(git -C $repoRoot ls-files)
if ($LASTEXITCODE -ne 0) {
  Fail "No se pudo leer el indice de Git."
}

$blockedPathPattern = '(^|/)(node_modules|dist|build|releases|backups|exports|secrets)(/|$)|\.(exe|dump|eml|zip|7z|tar|gz)$|(^|/)license/license\.json$'
$blockedPaths = @(
  $tracked |
    Where-Object { $_ -match $blockedPathPattern } |
    Where-Object { $_ -notmatch '(^|/)\.gitkeep$' } |
    Where-Object { $_ -notmatch '^\.env\.example$' }
)

if ($blockedPaths.Count -gt 0) {
  Write-Host "Archivos generados o sensibles versionados:"
  $blockedPaths | ForEach-Object { Write-Host " - $_" }
  Fail "Quita estos archivos del indice con git rm --cached y refuerza .gitignore."
}

$historicalPgPassword = 'Postgres' + 'Admin2026!'
$secretPatterns = @(
  @{ Name = "Clave Brevo SMTP"; Pattern = 'xsmtpsib-[A-Za-z0-9_-]{20,}' },
  @{ Name = "Clave privada PEM"; Pattern = '-----BEGIN [A-Z ]*PRIVATE KEY-----' },
  @{ Name = "JSON de Google con private_key"; Pattern = '"private_key"\s*:\s*"-----BEGIN PRIVATE KEY' },
  @{ Name = "Token GitHub"; Pattern = 'gh[pousr]_[A-Za-z0-9_]{20,}' },
  @{ Name = "Google Maps API key"; Pattern = 'AIza[0-9A-Za-z_-]{20,}' },
  @{ Name = "Password Postgres en claro"; Pattern = '(^|[^A-Za-z0-9_])PGPASSWORD\s*=\s*["''](?!<)[^"'']+["'']' },
  @{ Name = "Password historico de Postgres"; Pattern = [regex]::Escape($historicalPgPassword) }
)

$textExtensions = '\.(md|txt|json|js|jsx|ts|tsx|css|scss|html|yml|yaml|cmd|ps1|env|example|prisma)$'
$secretHits = New-Object System.Collections.Generic.List[string]
$mojibakeHits = New-Object System.Collections.Generic.List[string]
$mojibakePattern = ([char]0x00C3).ToString() + '|' + ([char]0x00C2).ToString() + '|' + ([char]0xFFFD).ToString()

foreach ($relative in $tracked) {
  if ($relative -notmatch $textExtensions) {
    continue
  }

  $path = Join-Path $repoRoot $relative
  if (-not (Test-Path -LiteralPath $path)) {
    continue
  }

  $content = [System.IO.File]::ReadAllText($path, $utf8)
  if ($null -eq $content) {
    continue
  }

  foreach ($rule in $secretPatterns) {
    if ($content -match $rule.Pattern) {
      $secretHits.Add("$relative -> $($rule.Name)")
    }
  }

  if ($StrictMojibake -and $content -match $mojibakePattern) {
    $mojibakeHits.Add($relative)
  }
}

if ($secretHits.Count -gt 0) {
  Write-Host "Posibles secretos encontrados:"
  $secretHits | ForEach-Object { Write-Host " - $_" }
  Fail "Rota el secreto si fue real y elimina el valor del repositorio."
}

if ($mojibakeHits.Count -gt 0) {
  Write-Host "Archivos con posible mojibake:"
  $mojibakeHits | ForEach-Object { Write-Host " - $_" }
  Fail "Corrige la codificacion visible antes de publicar."
}

Write-Host "Auditoria V1 OK: no hay secretos ni artefactos generados versionados."