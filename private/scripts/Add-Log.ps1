param (
    [string]$filePath,
    [string]$stringToAppend
)

# Check if the file exists
if (-Not (Test-Path $filePath)) {
    Write-Error "The file '$filePath' does not exist."
    exit 1
}

# Append the string to the file with a new line before it
[System.IO.File]::AppendAllText($filePath, "`r`n$stringToAppend")
Write-Output "Successfully appended string to file."
