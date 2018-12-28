/* eslint-disable linebreak-style */
const botconfig = require("../botconfig.json");
const int = require("../modules/packsimulator.js");
const the100 = require("../modules/the100.js");

module.exports.run = async (bot, message, args) => {

    function char(title, colour, thumbnail, quotes) {
        const thumb = int.getRandomLine(thumbnail);
        const full = int.getRandomLine(quotes);
        const comesFrom = full.substring(0, full.indexOf("|") - 1);
        const quote = full.substring(full.indexOf("|") + 1);

        return message.channel.send({ embed: the100.Embed(title, colour, thumb, quote, comesFrom) });
    }

    //randomize character
    const charRNG = int.randomInt(1, 4);

    //1 - Kane
    //2 - Clarke
    //3 - Bellamy

    if (charRNG === 1) { // Kane
        char("Marcus Kane", botconfig.black, the100.kaneThumb1, the100.kaneQuote1);
    } else if (charRNG === 2) { // Clarke
        char("Clarke Griffin", botconfig.yellow, the100.clarkeThumb1, the100.clarkeQuote1);
    } else if (charRNG === 3) { // Bellamy
        char("Bellamy Blake", botconfig.grey, the100.bellamyThumb1, the100.bellamyQuote1);
    }
};

module.exports.help = {
    name: "the100"
};
