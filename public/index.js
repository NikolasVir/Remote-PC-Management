document.addEventListener('DOMContentLoaded', function () {
    const consoleBox = document.getElementById('consoleBox');

    // Button Events
    const buttonStartPlex = document.getElementById("StartPlex");
    const buttonStopPlex = document.getElementById("StopPlex");
    const buttonStartParsec = document.getElementById("StartParsec");
    const buttonStopParsec = document.getElementById("StopParsec");
    const buttonStartSunshine = document.getElementById("StartSunshine");
    const buttonStopSunshine = document.getElementById("StopSunshine");
    const buttonStartMCServer = document.getElementById("StartMCServer");
    const buttonStopMCServer = document.getElementById("StopMCServer");
    const buttonStartMCBackup = document.getElementById("StartMCBackup");
    const buttonGetLog = document.getElementById("GetLog");
    const buttonClearConsole = document.getElementById("ClearConsole");

    // Plex

    buttonStartPlex.addEventListener('click', () => {
        let apiPassword = document.getElementById('password').value;

        let executablePath = "C:\\Program Files\\Plex\\Plex Media Server\\Plex Media Server.exe";

        fetch('/process/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Password': apiPassword
            },
            body: JSON.stringify({
                executablePath: executablePath
            })
        })
            .then(response => {
                if (!response.ok) {
                    // Handle unauthorized errors
                    if (response.status === 401) {
                        throw new Error('Unauthorized: Incorrect password');
                    }
                    throw new Error(`Request failed with status ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                consoleLog(data.output, "#00ff00");
            })
            .catch(error => {
                let error_output = `Error: ${error.message}`;
                consoleLog(error_output, "red");
            });
    });

    buttonStopPlex.addEventListener('click', () => {
        let apiPassword = document.getElementById('password').value;

        let processName = "Plex Media Server";

        fetch('/process/stop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Password': apiPassword
            },
            body: JSON.stringify({
                processName: processName
            })
        })
            .then(response => {
                if (!response.ok) {
                    // Handle unauthorized errors
                    if (response.status === 401) {
                        throw new Error('Unauthorized: Incorrect password');
                    }
                    throw new Error(`Request failed with status ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                consoleLog(data.output, "#00ff00");
            })
            .catch(error => {
                let error_output = `Error: ${error.message}`;
                consoleLog(error_output, "red");
            });
    });

    // Parsec

    buttonStartParsec.addEventListener('click', () => {
        let apiPassword = document.getElementById('password').value;

        let executablePath = "C:\\Program Files\\Parsec\\parsecd.exe";

        fetch('/process/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Password': apiPassword
            },
            body: JSON.stringify({
                executablePath: executablePath
            })
        })
            .then(response => {
                if (!response.ok) {
                    // Handle unauthorized errors
                    if (response.status === 401) {
                        throw new Error('Unauthorized: Incorrect password');
                    }
                    throw new Error(`Request failed with status ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                consoleLog(data.output, "#00ff00");
            })
            .catch(error => {
                let error_output = `Error: ${error.message}`;
                consoleLog(error_output, "red");
            });
    });

    buttonStopParsec.addEventListener('click', () => {
        let apiPassword = document.getElementById('password').value;

        let processNames = ["pservice", "parsecd"];

        for (const processName of processNames) {
            fetch('/process/stop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Password': apiPassword
                },
                body: JSON.stringify({
                    processName: processName
                })
            })
                .then(response => {
                    if (!response.ok) {
                        // Handle unauthorized errors
                        if (response.status === 401) {
                            throw new Error('Unauthorized: Incorrect password');
                        }
                        throw new Error(`Request failed with status ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    consoleLog(data.output, "#00ff00");
                })
                .catch(error => {
                    let error_output = `Error: ${error.message}`;
                    consoleLog(error_output, "red");
                });
        }
    });

    // Parsec

    buttonStartSunshine.addEventListener('click', () => {
        let apiPassword = document.getElementById('password').value;

        let executablePath = "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Sunshine\\Sunshine.lnk";

        fetch('/process/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Password': apiPassword
            },
            body: JSON.stringify({
                executablePath: executablePath
            })
        })
            .then(response => {
                if (!response.ok) {
                    // Handle unauthorized errors
                    if (response.status === 401) {
                        throw new Error('Unauthorized: Incorrect password');
                    }
                    throw new Error(`Request failed with status ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                consoleLog(data.output, "#00ff00");
            })
            .catch(error => {
                let error_output = `Error: ${error.message}`;
                consoleLog(error_output, "red");
            });
    });

    buttonStopSunshine.addEventListener('click', () => {
        let apiPassword = document.getElementById('password').value;

        let processNames = ["sunshine", "sunshinesvc"];

        for (const processName of processNames) {
            fetch('/process/stop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Password': apiPassword
                },
                body: JSON.stringify({
                    processName: processName
                })
            })
                .then(response => {
                    if (!response.ok) {
                        // Handle unauthorized errors
                        if (response.status === 401) {
                            throw new Error('Unauthorized: Incorrect password');
                        }
                        throw new Error(`Request failed with status ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    consoleLog(data.output, "#00ff00");
                })
                .catch(error => {
                    let error_output = `Error: ${error.message}`;
                    consoleLog(error_output, "red");
                });
        }
    });

    // Minecraft Bedrock Server

    buttonStartMCServer.addEventListener('click', () => {
        let apiPassword = document.getElementById('password').value;

        fetch('/mc-server/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Password': apiPassword
            }
        })
            .then(response => {
                if (!response.ok) {
                    // Handle unauthorized errors
                    if (response.status === 401) {
                        throw new Error('Unauthorized: Incorrect password');
                    }
                    throw new Error(`Request failed with status ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                consoleLog(data.output, "#00ff00");
            })
            .catch(error => {
                let error_output = `Error: ${error.message}`;
                consoleLog(error_output, "red");
            });
    });

    //TODO
    buttonStopMCServer.addEventListener('click', () => {
        let apiPassword = document.getElementById('password').value;

        fetch('/mc-server/stop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Password': apiPassword
            }
        })
            .then(response => {
                if (!response.ok) {
                    // Handle unauthorized errors
                    if (response.status === 401) {
                        throw new Error('Unauthorized: Incorrect password');
                    }
                    throw new Error(`Request failed with status ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                consoleLog(data.output, "#00ff00");
            })
            .catch(error => {
                let error_output = `Error: ${error.message}`;
                consoleLog(error_output, "red");
            });
    });

    buttonStartMCBackup.addEventListener('click', () => {
        let apiPassword = document.getElementById('password').value;

        fetch('/mc-server/backup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Password': apiPassword
            }
        })
            .then(response => {
                if (!response.ok) {
                    // Handle unauthorized errors
                    if (response.status === 401) {
                        throw new Error('Unauthorized: Incorrect password');
                    }
                    throw new Error(`Request failed with status ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                consoleLog(data.output, "#00ff00");
            })
            .catch(error => {
                let error_output = `Error: ${error.message}`;
                consoleLog(error_output, "red");
            });
    });

    // Console and Log Management

    buttonGetLog.addEventListener('click', () => {
        fetch('/log')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob(); // Convert the response to a Blob
            })
            .then(blob => {
                // Create a new URL for the Blob object
                const url = URL.createObjectURL(blob);

                // Open the URL in a new tab
                window.open(url, '_blank');

                // Optional: Release the object URL after use to free up memory
                URL.revokeObjectURL(url);
            })
            .catch(error => {
                consoleLog(`Error: ${error.message}`);
            });
    });


    buttonClearConsole.addEventListener('click', () => {
        consoleBox.innerHTML = '';
    });

    // Prints the message in the consoleBox div with specified text color and the server log file
    function consoleLog(message, color) {
        // Get the current date and time
        let now = new Date();

        // Format the current date and time as an ISO string
        let datetimeString = now.toISOString();

        // Create the formatted output string with the timestamp and color
        let output = `<span style="color: ${color};">[${datetimeString}]: ${message}</span> <br>`;
        let logFileOutput = `[${datetimeString}]: ${message}`;

        // Append the formatted message to the console box
        consoleBox.innerHTML += output;
        console.log("addLog");
        addLog(message);
    }

    setInterval(getStatus, 500);

    async function getStatus() {
        // Get all elements with the class 'statusContainer' and extract their ids
        var processNames = document.getElementsByClassName('statusContainer');
        var ids = Array.from(processNames).map(element => element.id);

        // Iterate over each id to make a fetch request
        for (const id of ids) {
            try {
                // Fetch the state of the process with the given id
                const response = await fetch(`/process/state?processName=${encodeURIComponent(id)}`);
                const data = await response.json();

                // Get the element by id and update its background color based on the response
                let element = document.getElementById(id);
                if (data.output.trim() === "1") {
                    element.style.backgroundColor = '#128621'; // Green for running
                } else {
                    element.style.backgroundColor = '#ae1414'; // Red for not running
                }
            } catch (error) {
                // Handle any errors that occur during the fetch operation
                let output = error.message;

                // Get the current date and time
                let now = new Date();
                let datetimeString = now.toISOString();

                // Create the new string with the datetime at the beginning
                output = `[${datetimeString}]: ${output}`;

                // Display the error in the console box
                let consoleBox = document.getElementById('consoleBox');
                consoleBox.innerHTML += `<div style="color: red;">Failed while retrieving server status: ${output}</div>`;
                consoleLog(output);
            }
        }
    }

});

async function addLog(logContent) {
    let apiPassword = document.getElementById('password').value;

    try {
        const response = await fetch('/log/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Password': apiPassword
            },
            body: JSON.stringify({
                logContent: logContent
            })
        });

        // Check if the response is okay (status in range 200-299)
        if (!response.ok) {
            const errorText = await response.text(); // Get the response text for detailed error message
            throw new Error(`Network response was not ok ${response.status}: ${errorText}`);
        }

        // Parse JSON data
        const data = await response.json();
        console.log('Log Added:', data);
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
        return null;
    }
}

