const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const mongoose = require("mongoose");
mongoose.connect(botconfig.points_db, {
  useNewUrlParser: true
});
const Points = require("../db/points.js");

module.exports.run = async (bot, message, args) => {

  Points.findOne({
    userID: message.author.id,
    serverID: message.guild.id
  }, (err, points) => {
    if (err) console.log(err);

    const embed = new Discord.RichEmbed()
      .setThumbnail(message.author.displayAvatarURL);
    if (!points) {
      embed.addField("Points", "0", true);
    } else {
      embed.addField("Points", Math.ceil(points.points), true);
    }
    embed.addField("Earn points by messaging and through mini-games", `see ${botconfig.prefix}pointshelp`);

    message.channel.send(embed);
  });

};

module.exports.help = {
  name: "points"
};
