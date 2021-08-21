
const fs = require('fs');
const path = require('path');

/**
 * Handles code execution when the application is closed.
 * @module Cleanup
 */

/**
 * Init is called whenever the server starts running.
 * It initializes all event handlers necessary to execute exitHandler() on close-up.
 * @author Noah Visser and stackoverflow
 * @private
 */
function init() {
    // https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits

    process.stdin.resume();//so the program will not close instantly

//do something when app is closing
    process.on('exit', exitHandler.bind());

//catches ctrl+c event
    process.on('SIGINT', exitHandler.bind());

// catches "kill pid" (for example: nodemon restart)
    process.on('SIGUSR1', exitHandler.bind());
    process.on('SIGUSR2', exitHandler.bind());

//catches uncaught exceptions
    process.on('uncaughtException', exitHandler.bind());
}

/**
 * Executes before the server shuts down.
 * @author Noah Visser
 * @private
 */
function exitHandler() {

    const directory = '../src/assets/csv';

    fs.readdir(directory, (err, files) => {
        if (err) throw err;
        for (let i = 0; i < files.length; i++) fs.unlinkSync(`${directory}/${files[i]}`);

        process.exit();
    });
}

module.exports = {
    /**
     * Init is called whenever the server starts running.
     * It initializes all event handlers necessary to execute exitHandler() on close-up.
     * @author Noah Visser
     */
    init
};