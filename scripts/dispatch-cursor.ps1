#Requires -Version 5.1
<#
.SYNOPSIS
  Codex → Cursor Agent headless dispatch. GUI/TUI/help keşfi yok.
#>
param(
    [Parameter(Mandatory = $true)]
    [string]$BriefPath,

    [string]$Workspace = "C:\Users\omrfr\OneDrive\Hersik\Belgeler\takt",

    [string]$Model = "grok-4.6",

    [string]$PrintTimeout = "",

    [switch]$Force
)

$ErrorActionPreference = "Stop"

$agentCmd = Get-Command agent -ErrorAction SilentlyContinue
if (-not $agentCmd) {
    $agentCmd = Get-Command cursor-agent -ErrorAction SilentlyContinue
}
if (-not $agentCmd) {
    throw "agent/cursor-agent PATH'te yok."
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
ISCI: Cursor Agent CLI
CALISMA ALANI: $Workspace
BRIEF: $briefAbs

Once oku: AGENTS.md, docs/15-cursor-orkestrasyon.md, sonra BRIEF dosyasini.
Brief disina cikma. Commit/push/deploy yapma.
TESLIM: En fazla 20 satir — degisen dosyalar, dogrulama sonucu, kalan risk.
Tool logu, thinking, config dokme.
"@

$cliArgs = @(
    "-p", $prompt,
    "--output-format", "text"
)

if ($Model) { $cliArgs += @("--model", $Model) }
if ($Force) { $cliArgs += "--force" }

Write-Output "STATUS=RUNNING"
Write-Output "WORKER=cursor-agent"
Write-Output "BRIEF=$briefAbs"
& $agentCmd.Source @cliArgs
exit $LASTEXITCODE
