const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const packSimulator = require("../modules/packsimulator.js");
const players = require("../modules/players.js");

module.exports.run = async (bot, message, args) => {

  const pack75kEmbed = new Discord.RichEmbed()
    .setTitle("7,5k Pack")
    .setColor(botconfig.green)
    .setThumbnail("https://cdn.futbin.com/design/img/packs/cards/gold.png")
    .setFooter("Bot developed by Trace#8994" + " | Pack generated at " + message.createdAt)
    .addField("Your best pulls was: ", packSimulator.getRandomLine(players.golds));

  message.channel.send({ embed: pack75kEmbed });

};

module.exports.help = {
  name: "7.5k"
};
