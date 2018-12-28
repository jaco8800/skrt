const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const mongoose = require("mongoose");
mongoose.connect(botconfig.points_db, {
  useNewUrlParser: true
});
const Points = require("../db/points.js");
module.exports.run = async (bot, message, args) => {
  //Grab all of the users in said server
  Points.find({
    serverID: message.guild.id
  }).sort([
    ["points", "descending"]
  ]).exec((err, res) => {
    if (err) console.log(err);

    const embed = new Discord.RichEmbed()
      .setTitle("Leaderboard");
    //if there are no results
    if (res.length === 0) {
      embed.setColor(botconfig.red);
      embed.addField("No data found", "Type in chat to gain points!");
    } else if (res.length < 10) {
      //less than 10 results
      embed.setColor(botconfig.purple);
      for (i = 0; i < res.length; i++) {
        const member = message.guild.members.get(res[i].userID) || "User Left";
        if (member === "User Left") {
          embed.addField(`${i + 1}. ${member}`, "**Points**: " + Math.ceil(res[i].points));
        } else {
          embed.addField(`${i + 1}. ${member.user.username}`, "**Points**: " + Math.ceil(res[i].points));
        }
      }
    } else {
      //more than 10 results
      embed.setColor(botconfig.purple);
      for (i = 0; i < 10; i++) {
        const member = message.guild.members.get(res[i].userID) || "User Left";
        if (member === "User Left") {
          embed.addField(`${i + 1}. ${member}`, "**Points**: " + Math.ceil(res[i].points));
        } else {
          embed.addField(`${i + 1}. ${member.user.username}`, "**Points**: " + Math.ceil(res[i].points));
        }
      }
    }

    message.channel.send(embed);
  });
};
module.exports.help = {
  name: "leaderboard"
};