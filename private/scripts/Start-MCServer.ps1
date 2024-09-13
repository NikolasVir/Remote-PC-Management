# Start Minecraft Bedrock Server
Write-Host "Starting Minecraft Bedrock Server..."

# Define the path to your Minecraft Bedrock server executable
$minecraftServerPath = "G:\Minecraft Server\bedrock-server\bedrock_server.exe"

# Start the Minecraft server
try {
    Start-Process $minecraftServerPath -WorkingDirectory "G:\Minecraft Server\bedrock-server"
    Write-Host "Minecraft Bedrock Server started successfully. You can interact with the console in the new window."

    # Optional: Wait for a few seconds before closing the script
    Start-Sleep -Seconds 5
}
catch {
    Write-Host "An error occurred while starting the Minecraft Bedrock Server: $_"
}

exit
