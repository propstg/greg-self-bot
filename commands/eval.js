module.exports = {};
module.exports.command = "!eval";

module.exports.handler = async (message, args) => {
    setTimeout(() => {
        message.edit(`Evaluating: \`\`\`\n${args.join(" ")}\`\`\``);
    }, 50);

    try {
        let output = await eval(args.join(" "));
        message.channel.send(`Output: \`\`\`${output}\`\`\``);
    } catch(e) {
        console.log(e);
        message.channel.send(`Error: \`\`\`${e}\`\`\``);
    }
};
