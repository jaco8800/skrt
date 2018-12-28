const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const packSimulator = require("../modules/packsimulator.js");
const players = require("../modules/players.js");

module.exports.run = async (bot, message, args) => {

  const packEmbed = new Discord.RichEmbed()
    .setTitle("Two Players Pack")
    .setColor(botconfig.green)
    .setThumbnail("https://cdn.futbin.com/design/img/packs/cards/gold.png")
    .setFooter("Bot developed by Trace#8994" + " | Pack generated at " + message.createdAt)
    .addField("Your pack contained: ", packSimulator.getRandomLine(players.golds) + packSimulator.getRandomLine(players.golds));

  message.channel.send({ embed: packEmbed });

};

module.exports.help = {
  name: "twoplayers"
};
