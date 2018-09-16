const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config/config.json");
const commands = require("./commands.js");

commands.loadAllCommands();

client.on('ready', async () => {
    console.log("Logged in.")
    console.log("Setting status to afk.");
    await client.user.setAFK(true);
    console.log("Status set.");
});
client.on("message", async (message) => {
    if (message.author !== client.user) return;
    commands.processCommand(message);
});

console.log("Logging in...");
client.login(config.botToken);
