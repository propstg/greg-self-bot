const emojis = require("../emojis.js");

module.exports = {};
module.exports.command = "!!";

module.exports.handler = async function(message, args) {
    setTimeout(() => {
        let newMessage = args.join(" ").split("").map(c => c + (c == " " ? "   " : " ")).join("");
        console.log(newMessage);
        message.edit(`\`${newMessage}\``);
    }, 50);
};
