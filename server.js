const express = require('express');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
require('dotenv').config();

const apiPassword = process.env.PASSWORD;

const app = express();
const port = 3000;

// Serve static files (like HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies
app.use(express.json());

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Endpoints

// Helper function

// Executes a PowerShell script
function executePwshScript(scriptPath, args, callback) {
    const command = `powershell -ExecutionPolicy Bypass -File "${scriptPath}" ${args}`;
    //console.log(`Executing command: ${command}`);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return callback({ output: `Error: ${error.message}` });
        }
        if (stderr) {
            console.error(`Script stderr: ${stderr}`);
            return callback({ output: `Error: ${stderr}` });
        }
        callback({ output: stdout.trim() });
    });
}

// Executes the PowerShell script for logging
function addLog(logContent) {
    let now = new Date();
    let datetimeString = now.toISOString();
    let logFileOutput = `[${datetimeString}]: ${logContent}`;

    const scriptPath = "private/scripts/Add-Log.ps1";
    const args = `-filePath \"G:\\NodeJS\\WebManager\\node-console-app\\public\\consoleLog.txt\" -stringToAppend "${logFileOutput}"`;
    const command = `powershell -ExecutionPolicy Bypass -File "${scriptPath}" ${args}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
        }
    });
}

// Checks if the password provided is correct
function checkPassword(req, res, next) {
    const apiPassword = req.get('X-API-Password');

    if (apiPassword !== process.env.PASSWORD) {
        addLog(`Unauthorized by: ${req.ip}`);
        return res.status(401).json({ error: 'Unauthorized: Incorrect password' });
    }

    next();
}


// Authentication

// Apply the checkPassword middleware to all POST routes
app.post('*', checkPassword);

// Generic Process Management

// GET: execute the Get-RunningState PwSh script for the given processName
app.get('/process/state', (req, res) => {
    const processName = req.query.processName;
    const scriptPath = "private/scripts/Get-RunningState.ps1";
    const args = `-ProcessName "${processName}"`;

    executePwshScript(scriptPath, args, (result) => {
        res.json(result);
    });
});

// POST: execute the Start-Process PwSh script
app.post('/process/start', (req, res) => {

    addLog(`/process/start requested by: ${req.ip}`);

    const executablePath = req.body.executablePath;
    const scriptPath = "private/scripts/Start-Process.ps1";
    const args = `-ExecutablePath "${executablePath}"`;

    executePwshScript(scriptPath, args, (result) => {
        res.json(result);
    });
});

// POST: execute the Stop-Process PwSh script
app.post('/process/stop', (req, res) => {

    addLog(`/process/stop requested by: ${req.ip}`);

    const processName = req.body.processName;
    const scriptPath = "private/scripts/Stop-Process.ps1";
    const args = `-ProcessName "${processName}"`;

    executePwshScript(scriptPath, args, (result) => {
        res.json(result);
    });
});

// Minecraft Bedrock Specific

// POST: execute the Start-MCServer PwSh script
app.post('/mc-server/start', (req, res) => {

    addLog(`/mc-server/start requested by: ${req.ip}`);

    const scriptPath = "private/scripts/Start-MCServer.ps1";
    const args = "";

    executePwshScript(scriptPath, args, (result) => {
        res.json(result);
    });
});

//TODO
// POST: execute the Stop-MCServer PwSh script
app.post('/mc-server/stop', (req, res) => {

    addLog(`/mc-server/stop requested by: ${req.ip}`);

    const scriptPath = "private/scripts/Stop-MCServer.ps1";
    const args = "";

    executePwshScript(scriptPath, args, (result) => {
        res.json(result);
    });
});

// POST: execute the Start-MCBackup PwSh script
app.post('/mc-server/backup', (req, res) => {

    addLog(`/mc-server/backup requested by: ${req.ip}`);

    const scriptPath = "private/scripts/Start-MCBackup.ps1";
    const args = "";

    executePwshScript(scriptPath, args, (result) => {
        res.json(result);
    });
});

// POST: execute the Get-MCUpdate PwSh script
app.post('/mc-server/update', (req, res) => {

    addLog(`/mc-server/update requested by: ${req.ip}`);

    const scriptPath = "private/scripts/Start-MCUpdate.ps1";
    const args = "";

    executePwshScript(scriptPath, args, (result) => {
        res.json(result);
    });
});

// Logfile Management

// GET: serve the server log file
app.get('/log', (req, res) => {

    addLog(`/log requested by: ${req.ip}`);

    res.sendFile(path.join(__dirname, 'public/consoleLog.txt'));
});

// POST: add a log to the log file
app.post('/log/add', async (req, res) => {
    try {
        const logContent = req.body.logContent;
        const result = await addLog(logContent);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
});

// Server Management

// POST: shut down the server
app.post('/shutdown', (req, res) => {

    addLog(`/mc-server/stop requested by: ${req.ip}`);

    res.send('Server is shutting down');
    console.log('Shutting down server...');
    server.close(() => {
        addLog(`Server has been shut down`);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
