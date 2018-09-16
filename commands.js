const fs = require("fs-promise");

let COMMANDS = {};

const all = () => COMMANDS;
const allValues = () => Object.keys(COMMANDS).map(key => COMMANDS[key]);
const get = (command) => COMMANDS[command];

const loadCommand = (module) => {
    let command = require(module);
    COMMANDS[command.command] = command;
    console.log(`Loaded command:  ${command.command}`);
};

const loadAllCommands = async () => {
    (await fs.readdir("./commands"))
        .map(file => "./commands/" + file)
        .forEach(loadCommand);
}

const processCommand = async (message) => {
    let args = [];
    let command = message.content.toLowerCase();
    let spaceLocation = message.content.indexOf(" ");

    if (spaceLocation > 0) {
        command = message.content.substring(0, spaceLocation).toLowerCase();
        args = message.content.substring(spaceLocation + 1).split(" ");
    }

    if (get(command) != null) {
        console.log(`Received command from ${message.author.username}:  "${command}" with args:  "${args}".`);

        try {
            await get(command).handler(message, args);
            return true;
        } catch(error) {
            console.log(error);
        }
    }

    return false;
}

module.exports = {
    "all":  all,
    "allValues": allValues,
    "get":  get,
    "loadCommand":  loadCommand,
    "loadAllCommands": loadAllCommands,
    "processCommand": processCommand
};
