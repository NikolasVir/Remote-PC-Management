param (
    [string]$ExecutablePath
)

if (-not $ExecutablePath) {
    Write-Output "Please provide the path to the executable."
    exit 0
}

# Write-Host message
Write-Host "Starting process from '$ExecutablePath'..."

# Check if the executable file exists
if (-Not (Test-Path $ExecutablePath)) {
    Write-Host "The specified executable file '$ExecutablePath' does not exist."
    exit 0
}

# Start the process
try {
    Start-Process $ExecutablePath
    Write-Host "Process started successfully."
}
catch {
    Write-Host "An error occurred while starting the process: $_"
}

exit
