# Define the source folder and destination folder for the backup
$downloadFolder = "G:\Minecraft Server\Updates"
$installFolder = "G:\Minecraft Server\bedrock-server"

# Step 1: Get the content of the Minecraft Bedrock Server download page
$Url = "https://www.minecraft.net/en-us/download/server/bedrock"
$webPage = Invoke-WebRequest -Uri $Url

# Step 2: Parse the HTML to find the download link (select the first matching link)
$downloadLink = ($webPage.Links | Where-Object { $_.href -like "*bin-win*" } | Select-Object -First 1 -ExpandProperty href)

# Step 3: Ensure the link is absolute (in case it's a relative URL)
if ($downloadLink -notlike "http*") {
    $downloadLink = "https://www.minecraft.net" + $downloadLink
}

# Print the download link being used
# Write-Host "Download link: $downloadLink"

# Step 4: Define the download destination path
$destinationPath = "$downloadFolder\bedrock-server.zip"

# Step 5: Download the server
Invoke-WebRequest -Uri $downloadLink -OutFile $destinationPath

Write-Host "Download completed. File saved to $destinationPath"

# Step 6: Unzip the downloaded file to the installation folder
$unzipFolder = "$downloadFolder\installFiles"
Expand-Archive -Path $destinationPath -DestinationPath $unzipFolder -Force

Write-Host "Extraction completed. Files extracted to $unzipFolder"

# Step 7: Delete specific files (allowlist.json, permissions.json, server.properties) from the installFiles directory
$filesToDelete = @("allowlist.json", "permissions.json", "server.properties")

foreach ($file in $filesToDelete) {
    $filePath = "$unzipFolder\$file"
    if (Test-Path $filePath) {
        Remove-Item $filePath -Force
        Write-Host "$file deleted from $unzipFolder"
    } else {
        Write-Host "$file not found in $unzipFolder"
    }
}

# Step 8: Copy the contents of installFiles to the installFolder
Copy-Item -Path "$unzipFolder\*" -Destination $installFolder -Recurse -Force

Write-Host "Files copied from $unzipFolder to $installFolder"