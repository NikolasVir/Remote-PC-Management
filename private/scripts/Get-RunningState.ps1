param (
    [string]$ProcessName
)

if (-not $ProcessName) {
    Write-Output "Please provide a process name."
    exit 0
}

# Check if the process exists
$process = Get-Process -Name $ProcessName -ErrorAction SilentlyContinue

if ($process) {
    # Process is running
    # Write-Output "The '$ProcessName' process is running."
    Write-Output 1
} else {
    # Process is not running
    # Write-Output "The '$ProcessName' process is not running."
    Write-Output 0
}
