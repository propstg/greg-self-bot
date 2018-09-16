const fs = require("fs-promise");

let PROCESSORS = [];

const loadProcessor = (module) => {
    let processor = require(module);
    PROCESSORS.push(processor);
    console.log(`Loaded processor:  ${processor.name}`);
};

const loadProcessors = async () =>
    (await fs.readdir("./reactions"))
        .map(file => "./reactions/" + file)
        .forEach(loadProcessor);

const processMessage = async (message) => {
    for (let i = 0; i < PROCESSORS.length; i++) {
        let processor = PROCESSORS[i];

        if (processor.canProcess(message)) {
            console.log(`Using reaction processor ${processor.name} for message "${message.content}"`);
            processor.process(message);
        }
    }
}

module.exports = {
    "loadProcessors": loadProcessors,
    "processMessage": processMessage
};
