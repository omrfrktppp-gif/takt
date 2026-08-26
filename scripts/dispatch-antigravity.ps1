#Requires -Version 5.1
<#
.SYNOPSIS
  Codex → Antigravity headless dispatch. GUI/TUI/help keşfi yok.
#>
param(
    [Parameter(Mandatory = $true)]
    [string]$BriefPath,

    [string]$Workspace = "C:\Users\omrfr\OneDrive\Hersik\Belgeler\takt",

    [string]$Model = "",

    [ValidateSet("", "low", "medium", "high")]
    [string]$Effort = "medium",

    [string]$ConversationId = "",

    [switch]$Continue,

    [string]$PrintTimeout = "15m",

    [switch]$SkipPermissions
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command agy -ErrorAction SilentlyContinue)) {
    throw "agy PATH'te yok. Bir kez kur: irm https://antigravity.google/cli/install.ps1 | iex"
}

if (-not (Test-Path -LiteralPath $Workspace)) {
    throw "Calisma alani yok: $Workspace"
}

if (-not (Test-Path -LiteralPath $BriefPath)) {
    throw "Brief bulunamadi: $BriefPath"
}

$briefAbs = (Resolve-Path -LiteralPath $BriefPath).Path
Set-Location -LiteralPath $Workspace

$prompt = @"
ISCI: Antigravity CLI (agy)
CALISMA ALANI: $Workspace
BRIEF: $briefAbs

Once oku: AGENTS.md, .agents/rules/takt.md, sonra BRIEF dosyasini.
Brief disina cikma. Commit/push/deploy yapma.
Nested veya parallel subagent baslatma.
TESLIM: En fazla 20 satir — degisen dosyalar, dogrulama sonucu, kalan risk.
Tool logu, thinking, config dokme.
"@

$agyArgs = @(
    "-p", $prompt,
    "--output-format", "json",
    "--print-timeout", $PrintTimeout
)

if ($Model) { $agyArgs += @("--model", $Model) }
if ($Effort) { $agyArgs += @("--effort", $Effort) }
if ($Continue) { $agyArgs += "--continue" }
if ($ConversationId) { $agyArgs += @("--conversation", $ConversationId) }
if ($SkipPermissions) { $agyArgs += "--dangerously-skip-permissions" }

$raw = & agy @agyArgs 2>&1 | Out-String
if ($LASTEXITCODE -ne 0 -and -not $raw) {
    throw "agy exit $LASTEXITCODE ve stdout bos (authentication required olabilir)."
}

# stderr diagnostigi JSON ile karisabilir; ilk { ... } blogunu al.
$start = $raw.IndexOf("{")
$end = $raw.LastIndexOf("}")
if ($start -lt 0 -or $end -le $start) {
    Write-Output "STATUS=PARSE_ERROR"
    Write-Output "RAW:"
    Write-Output $raw.Trim()
    exit 1
}

try {
    $obj = $raw.Substring($start, $end - $start + 1) | ConvertFrom-Json
} catch {
    Write-Output "STATUS=PARSE_ERROR"
    Write-Output "RAW:"
    Write-Output $raw.Trim()
    exit 1
}

Write-Output "STATUS=$($obj.status)"
Write-Output "CONVERSATION_ID=$($obj.conversation_id)"
Write-Output "DURATION_SECONDS=$($obj.duration_seconds)"
if ($obj.usage) {
    Write-Output "INPUT_TOKENS=$($obj.usage.input_tokens)"
    Write-Output "OUTPUT_TOKENS=$($obj.usage.output_tokens)"
    Write-Output "THINKING_TOKENS=$($obj.usage.thinking_tokens)"
    Write-Output "CACHE_READ_TOKENS=$($obj.usage.cache_read_tokens)"
    Write-Output "TOTAL_TOKENS=$($obj.usage.total_tokens)"
}
if ($obj.error) {
    Write-Output "ERROR=$($obj.error)"
}
Write-Output "RESPONSE:"
Write-Output $obj.response

if ($obj.status -ne "SUCCESS") {
    exit 1
}
