const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  //${botconfig.prefix}kick @jack annoying
  const kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  if (!kUser) {
    return message.channel.send("User does not exist.");
  }

  const kReason = args.join(" ").slice(22);

  if (!message.member.hasPermission("KICK_MEMBERS")) {
    return message.channel.send("No permission.");
  }
  if (kUser.hasPermission("KICK_MEMBERS")) {
    return message.channel.send("You can't kick a moderator.");
  }

  if (!kReason) {
    return message.channel.send("Give reason");
  }

  const kickEmbed = new Discord.RichEmbed()
    .setDescription("¡¡¡  Kick  !!!")
    .setColor(botconfig.orange)
    .setFooter("Bot developed by Trace#8994")
    .addField("Kicked user", `${kUser} with ID ${kUser.id}`)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

  message.guild.member(kUser).kick(kReason);

  message.channel.send({ embed: kickEmbed });

};

module.exports.help = {
  name: "kick"
};
