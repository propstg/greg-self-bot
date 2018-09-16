const moment = require('moment-timezone');

const REGEX = /(\d+)(:(\d+))?[ ]?(am|pm)/ig;

const format = (original, hours, minutes) => {
    let time = moment.tz('America/New_York').startOf('day').hour(hours).minute(minutes);
    return `${original} ${time.format('z')} (UTC${time.format('Z')})`;
};

const getHoursInTwentyFourHourFormat = (hours, amOrPm) =>
    hours + (amOrPm.toLowerCase() === 'pm' ? 12 : 0);

const replaceTimeMatch = (...args) => {
    const [match, hours, , minutes, amOrPm] = args;
    return format(match, getHoursInTwentyFourHourFormat(hours, amOrPm), minutes || 0);
};

const replace = string => string.replace(REGEX, replaceTimeMatch);

const process = message =>
    setTimeout(() => {
        message.edit(replace(message.content))
    }, 50);

module.exports = {
    name: "time",
    process: process,
    canProcess: message => message.content.match(REGEX) != null
};
