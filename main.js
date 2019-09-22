const Discord = require('discord.js');
const client = new Discord.Client();
const commands = require("./commands.js");
const reactions = require("./reactions.js");

commands.loadAllCommands();
reactions.loadProcessors();

client.on('ready', async () => {
    console.log("Logged in.")
    console.log("Setting status to afk.");
    await client.user.setAFK(true);
    console.log("Status set.");
});
client.on("message", async (message) => {
    if (message.author !== client.user) return;
    commands.processCommand(message);
	reactions.processMessage(message);
});

console.log("Logging in...");
client.login(process.env.TOKEN);
