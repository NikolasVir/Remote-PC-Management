# Start-Server.ps1
$logPath = "G:\NodeJS\WebManager\node-console-app\private\logs\taskLog.log"

# Log start time
"Script started at: $(Get-Date)" | Out-File -FilePath $logPath -Append

# Attempt to change directory and log result
try {
    Set-Location -Path "G:\NodeJS\WebManager\node-console-app" | Out-File -FilePath $logPath -Append
    "Changed directory to G:\NodeJS\WebManager\node-console-app" | Out-File -FilePath $logPath -Append
} catch {
    "Failed to change directory: $_" | Out-File -FilePath $logPath -Append
}

# Attempt to run Node.js and log output
try {
    node server.js | Out-File -FilePath $logPath -Append
    "Node.js script executed" | Out-File -FilePath $logPath -Append
} catch {
    "Failed to run Node.js script: $_" | Out-File -FilePath $logPath -Append
}

# Log end time
"Script finished at: $(Get-Date)" | Out-File -FilePath $logPath -Append
