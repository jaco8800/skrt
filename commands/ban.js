const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  //${botconfig.prefix}ban @jack annoying
  const bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  if (!bUser) {
    return message.channel.send("User does not exist.");
  }
  const bReason = args.join(" ").slice(22);

  if (!message.member.hasPermission("BAN_MEMBERS")) {
    return message.channel.send("No permission.");
  }

  if (bUser.hasPermission("BAN_MEMBERS")) {
    return message.channel.send("You can't kick a moderator.");
  }

  if (!bReason) {
    return message.channel.send("Give reason");
  }

  const banEmbed = new Discord.RichEmbed()
    .setDescription("¡¡¡  Ban  !!!")
    .setColor(botconfig.red)
    .setFooter("Bot developed by Trace#8994")
    .addField("Banned user", `${bUser} with ID ${bUser.id}`)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

  message.guild.member(bUser).ban(bReason);

  message.channel.send({ embed: banEmbed });

};

module.exports.help = {
  name: "ban"
};
