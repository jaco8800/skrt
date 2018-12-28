const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  const help = new Discord.RichEmbed()
    .setColor(botconfig.white)
    .setThumbnail(botconfig.botLogo)
    .setFooter("Help for TraceBot | Developed by Trace#8894")
    .addField("Moderation", `**${botconfig.prefix}ban** @user *reason* - bans a user for *reason*\n**${botconfig.prefix}kick** @user *reason* - kicks a user for *reason*\n**${botconfig.prefix}mute** @user *amount of time* - mutes a user\n**${botconfig.prefix}clear** *x* - clears x messages\n**${botconfig.prefix}purge** - use to clear a channel (500 msgs at a time)`)
    .addField("Packs", `**${botconfig.prefix}twoplayers** - Two Players Pack\n**${botconfig.prefix}7.5k** - 7,5k Pack\n**${botconfig.prefix}50k** - 50k Pack\n**${botconfig.prefix}100k** - 100k Pack\n**${botconfig.prefix}icon** - Icon Pack`)
    .addField("Points and mini-games", `Use **${botconfig.prefix}pointshelp** for more info`)
    .addField("Miscellaneous", `**${botconfig.prefix}help** - Help for TraceBot\n**${botconfig.prefix}hello**\n**${botconfig.prefix}the100** - Random The 100 quote\n**${botconfig.prefix}say** *what you want the bot to say*\n**${botconfig.prefix}github** *profile name* - github profile`);

  message.channel.send({ embed: help });

};

module.exports.help = {
  name: "help"
};
