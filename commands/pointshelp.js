const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  const embed = new Discord.RichEmbed()
    .setTitle("How to earn points")
    .setColor(botconfig.purple)
    .addField("Messaging.", "Earn points by simply sending messages in this server.")
    .addField("Mini-games", `**${botconfig.prefix}battle** @user *amount* - pack battle other users by putting points on the line` + "\n" + `**${botconfig.prefix}gamble** *amount* - gamble with your points`)
    .addField("Gifts from other users", `**${botconfig.prefix}gift** @user *amount* - gift another user some points (you lose points that you gift to others)`);

  message.channel.send({ embed: embed });

};

module.exports.help = {
  name: "pointshelp"
};
