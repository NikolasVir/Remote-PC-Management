param (
    [string]$ProcessName
)

if (-not $ProcessName) {
    Write-Output "Please provide a process name."
    exit 0
}

# Write-Host message
Write-Host "Stopping process '$ProcessName'..."

# Get the specified process
$process = Get-Process -Name $ProcessName -ErrorAction SilentlyContinue

# Check if the process was found
if ($process) {
    # Stop the process
    Stop-Process -Id $process.Id -Force
    Write-Host "$ProcessName has been stopped."
} else {
    Write-Host "$ProcessName is not running or was not found."
}
