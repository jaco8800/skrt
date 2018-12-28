/* eslint-disable linebreak-style */
const Discord = require("discord.js");
const fs = require("fs");

//Kane
module.exports.kaneThumb1 = fs.readFileSync("./resources/the100/kaneThumb.txt", "utf8").split("\n");
module.exports.kaneQuote1 = fs.readFileSync("./resources/the100/kaneQuote.txt", "utf8").split("\n");

//Clarke
module.exports.clarkeThumb1 = fs.readFileSync("./resources/the100/clarkeThumb.txt", "utf8").split("\n");
module.exports.clarkeQuote1 = fs.readFileSync("./resources/the100/clarkeQuote.txt", "utf8").split("\n");

//Bellamy
module.exports.bellamyThumb1 = fs.readFileSync("./resources/the100/bellamyThumb.txt", "utf8").split("\n");
module.exports.bellamyQuote1 = fs.readFileSync("./resources/the100/bellamyQuote.txt", "utf8").split("\n");

module.exports.Embed = (title, colour, thumb, quote, from) => {
    const embed1 = new Discord.RichEmbed()
        .setTitle(title)
        .setColor(colour)
        .setThumbnail(thumb)
        .setFooter("Bot developed by Trace#8994")
        .addField(quote, " - " + from);

    return embed1;
};
