# Start measuring time
$startTime = Get-Date

# Define the source folder and destination folder for the backup
$sourceFolder = "G:\Minecraft Server\bedrock-server\worlds"
$destinationFolder = "G:\Minecraft Server\Backups"

# Get the current date and time formatted as yyyyMMdd_HHmmss
$dateTimeStamp = (Get-Date).ToString("yyyyMMdd_HHmmss")

# Define the name of the zip file with the date and time stamp
$zipFileName = "Backup_$dateTimeStamp.zip"
$zipFilePath = Join-Path -Path $destinationFolder -ChildPath $zipFileName

# Define the path for the log file
$logFilePath = Join-Path -Path $destinationFolder -ChildPath "BackupLog.txt"

# Initialize a flag to track if an error occurred
$errorOccurred = $false

Write-Output "Starting backup process..."

# Create the zip archive of the source folder
# Use the .NET System.IO.Compression.FileSystem assembly to handle the compression
Add-Type -AssemblyName 'System.IO.Compression.FileSystem'

# Define a function to zip the folder with progress reporting
function Start-ZipCompression {
    param (
        [string]$source,
        [string]$destination
    )
    
    Write-Output "Compressing folder '$source'..."
    
    try {
        [System.IO.Compression.ZipFile]::CreateFromDirectory($source, $destination)
        Write-Output "Compression completed successfully."
    } catch {
        $errorMessage = "An error occurred during compression: $_"
        Write-Error $errorMessage
        # Append the error to the log file
        Add-Content -Path $logFilePath -Value "$dateTimeStamp - ERROR: $errorMessage"
        # Set the error flag to true
        $global:errorOccurred = $true
    }
}

# Perform the backup
Start-ZipCompression -source $sourceFolder -destination $zipFilePath

# End measuring time
$endTime = Get-Date
$duration = $endTime - $startTime

# Output and log results based on whether an error occurred
if ($errorOccurred) {
    # Only log the error message
    Write-Output "Backup failed. Please check the log file for details."
} else {
    # Output success message and log it
    Write-Output "Backup completed. The zip file is located at $zipFilePath"
    Write-Output "Total time taken: $($duration.ToString())"
    # Append successful completion to the log file
    $logEntry = "{0} - Backup created: {1} - Duration: {2}" -f $dateTimeStamp, $zipFileName, $duration
    Add-Content -Path $logFilePath -Value $logEntry
}
