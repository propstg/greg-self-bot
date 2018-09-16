const emojis = require("../emojis.js");

module.exports = {};
module.exports.command = "!react";

module.exports.handler = async function(message, args) {
    await ensureHasArguments(args);

    let targetMessage = await getTargetMessage(message, args);
    let characters = args[0].split("");
    
    for(let i = 0; i < characters.length; i++) {
        await targetMessage.react(emojis.find(`regional_indicator_${characters[i]}`))
    };

    await message.delete();
};

const ensureHasArguments = async (args) => {
    if (args.length == 0) {
        throw "Not enough arguments.";
    }
};

const getTargetMessage = async (message, args) => {
    if (args.length == 1) {
        let messages = message.channel.messages.array();
        let lastIndex = messages.length - 2;
        lastIndex = lastIndex < 0 ? 0 : lastIndex;
        return messages[lastIndex];
    }

    return await message.channel.fetchMessage(args[1]);
};
