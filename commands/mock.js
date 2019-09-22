module.exports = {
    command: '!m',
    handler: async (message, args) => {
        setTimeout(() => {
            let newMessage = '';
            let upperNum = 0;

            args.join(' ').split('').forEach(char => {
                if (char === ' ') {
                    newMessage += ' ';
                    return;
                }

                let num = Math.pow(0.5, Math.abs(upperNum));
                if (upperNum >= 0) {
                    num = 1 - num;
                }

                const isUpper = Math.random() > num;
                upperNum += isUpper ? 1 : -1;
                newMessage += isUpper ? char.toUpperCase() : char.toLowerCase();
            });

            message.edit(newMessage);
        });
    }
};