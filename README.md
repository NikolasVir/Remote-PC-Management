# Remote PC Management

## Overview

This project enables the remote management of a personal computer through a web interface. The system provides functionality to control various applications and services, such as Plex, Parsec, Sunshine, and Minecraft Bedrock Server, directly from a browser. It is designed to automate common tasks and simplify the control of server applications from a central dashboard.

## Features

- **Application Management**: Start and stop applications such as Plex, Parsec, and Sunshine remotely.
- **Minecraft Bedrock Server Control**: Start the Minecraft Bedrock server, stop it, and initiate server backups from the web interface.
- **Real-time Process Monitoring**: View the running state of applications with live status updates.
- **Server Log Management**: Fetch and view log files or add new log entries.
- **Console Display**: Output messages to a web-based console for easy monitoring and logging of activities.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
  - Dynamic UI for user interactions (buttons, console, status indicators).
- **Backend**: Node.js, Express
  - Manages API requests for starting/stopping services and retrieving application statuses.
  - PowerShell scripts for controlling system processes.
- **PowerShell**: Used for executing system-level commands such as starting, stopping, and checking the status of processes.

## REST API
Details about the API can be found in the [docs/API.md](https://github.com/NikolasVir/Remote-PC-Management/blob/master/docs/API.md) file.

## Usage

- Navigate to the web interface.
- Enter the password to authenticate.
- Use the buttons to control the applications (Plex, Parsec, Sunshine, Minecraft Bedrock Server).
- Monitor the status of the services in real-time through the color-coded status boxes.

## Folder Structure

- `public/`: Contains the static files for the frontend (HTML, CSS, JS).
- `private/scripts/`: PowerShell scripts used to manage the system processes.
- `server.js`: Backend server code that handles requests, executes PowerShell scripts, and manages application logic.

## Security

Authentication is enforced using an API password that is checked before executing any critical operations. This password is required to ensure only authorized users can control the system. The password is stored in the .env file and the application has access to it using the dotenv package.

## Future Improvements

- Add the ability to stop the Minecraft Bedrock Server without just killing the process (Data Corruption may occur)
