const Client = require("node-rest-client").Client;
const Discord = require("discord.js");
const request = require("request");
const truncate = require("truncate");

const URL = "http://api.urbandictionary.com/v0/define?term=";

module.exports = {};
module.exports.command = "!define";
module.exports.description = null;

module.exports.handler = async (message, args) => {
    ensureHasArgument(args);

    let url = URL + args.join("%20");
    new Client().get(url, async function(data) {
        if (data.list.length == 0) {
            await message.channel.send(`No definitions found for '${args.join(" ")}.`);
        }

        let sorted = data.list.sort((a, b) => {
            let aScore = a.thumbs_up - a.thumbs_down;
            let bScore = b.thumbs_up - b.thumbs_down;

            if (aScore < bScore) {
                return 1;
            } else if (aScore > bScore) {
                return -1;
            }
            return 0;
        });

        let definition = sorted[0];

        await message.edit({"embed": {
            title: `Urban Dictionary definition for ${definition.word}:`,
            description: truncate(definition.definition, 1996),
            url: definition.permalink,
            fields: [{
                name: "Example",
                value: truncate(definition.example, 1020)
            }]
        }});
    });
};

const ensureHasArgument = async (args) => {
    if (args.length == 0) {
        throw "Must supply a word.";
    }
};
