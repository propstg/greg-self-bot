const emojis = require("./config/emojis.json");

module.exports = {};
module.exports.find = (emojiText) => {
    emojiText = emojiText.replace(/:/g, '');
    return emojis[emojiText];
};
