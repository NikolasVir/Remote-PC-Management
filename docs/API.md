# API Documentation

## Overview

This document provides an overview of the API exposed by the
Express.js application. The API includes endpoints for managing system
processes, a Minecraft Bedrock Server, and a log file. It also utilizes
PowerShell scripts for executing various commands and managing system state.

## Server Configuration

- **Base URL:** `http://localhost:3000`
- **Port:** 3000

## Middleware

- **Static File Serving:** Serves static files (HTML, CSS, JS) from the `public`
  directory.
- **JSON Body Parsing:** Parses JSON bodies for incoming requests.

## Endpoints

### 1. Serve Main HTML File

- **GET** `/`
- **Description:** Serves the main HTML file for the application.
- **Response:** HTML content of `index.html`.

### 2. Process Management

#### Get Process State

- **GET** `/process/state`
- **Description:** Retrieves the running state of a specified process.
- **Query Parameters:**
  - `processName` (string): Name of the process to check.
- **PowerShell Script:** `Get-RunningState.ps1`
- **Script Path:** `G:\\PowerShell Scripts\\Get-RunningState.ps1`
- **Response:** JSON object containing the process state or error message.

#### Start Process

- **POST** `/process/start`
- **Description:** Starts a specified process.
- **Request Body:**
  - `executablePath` (string): Path to the executable to start.
- **PowerShell Script:** `Start-Process.ps1`
- **Script Path:** `G:\\PowerShell Scripts\\Start-Process.ps1`
- **Response:** JSON object with the result of the operation.

#### Stop Process

- **POST** `/process/stop`
- **Description:** Stops a specified process.
- **Request Body:**
  - `processName` (string): Name of the process to stop.
- **PowerShell Script:** `Stop-Process.ps1`
- **Script Path:** `G:\\PowerShell Scripts\\Stop-Process.ps1`
- **Response:** JSON object with the result of the operation.

### 3. Minecraft Bedrock Server Management

#### Start Minecraft Server

- **POST** `/mc-server/start`
- **Description:** Starts the Minecraft Bedrock server.
- **PowerShell Script:** `Start-MCServer.ps1`
- **Script Path:** `G:\\PowerShell Scripts\\Start-MCServer.ps1`
- **Response:** JSON object with the result of the operation.

#### Stop Minecraft Server

- **POST** `/mc-server/stop`
- **Description:** Stops the Minecraft Bedrock server.
- **PowerShell Script:** `Stop-MCServer.ps1`
- **Script Path:** `G:\\PowerShell Scripts\\Stop-MCServer.ps1`
- **Response:** JSON object with the result of the operation.

#### Backup Minecraft Server

- **POST** `/mc-server/backup`
- **Description:** Initiates a backup for the Minecraft Bedrock server.
- **PowerShell Script:** `Start-MCBackup.ps1`
- **Script Path:** `G:\\PowerShell Scripts\\Start-MCBackup.ps1`
- **Response:** JSON object with the result of the operation.

### 4. Logfile Management

#### Serve Log File

- **GET** `/log`
- **Description:** Serves the server log file.
- **Response:** The content of `consoleLog.txt`.

#### Add Log Entry

- **POST** `/log/add`
- **Description:** Adds a new entry to the server log file.
- **Request Body:**
  - `logContent` (string): Content to append to the log file.
- **PowerShell Script:** `Add-Log.ps1`
- **Script Path:** `G:\\PowerShell Scripts\\Add-Log.ps1`
- **Arguments:** 
  - `-filePath "G:\\NodeJS\\WebManager\\node-console-app\\consoleLog.txt"`
  - `-stringToAppend "${logContent}"`
- **Response:** JSON object with the result of the operation.

## PowerShell Script Execution

The `executePwshScript` function is used to run PowerShell scripts. It
constructs a command to run a PowerShell script with specific arguments and
handles the output and errors. 

**Function Signature:**
```javascript
function executePwshScript(scriptPath, args, callback)
```

- **Parameters:**
  - `scriptPath` (string): Path to the PowerShell script.
  - `args` (string): Arguments to pass to the script.
  - `callback` (function): Function to call with the script's output.

**Behavior:**
- Constructs the PowerShell command with `-ExecutionPolicy Bypass` for script
  execution.
- Handles output and errors, passing results to the callback function.

## Notes

- Ensure that the PowerShell scripts are correctly located at the specified
  paths.
- Error handling in the script execution is minimal; it logs errors to the
  console and returns them in the response.
