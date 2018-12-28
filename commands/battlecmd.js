const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const battleBE = require("../modules/battle.js");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/points", {
  useNewUrlParser: true
});
const Points = require("../db/points.js");

module.exports.run = async (bot, message, args) => {

  function isInt(x) {
    var y = parseInt(x, 10);
    return !isNaN(y) && x == y && x.toString() == y.toString();
  }

  if (isInt(args[1]) === false) return message.channel.send(`The amount of points you want to battle for that you've provided is not a number. Make sure you are using \`${botconfig.prefix}battle @user amount\``);

  const player1 = message.author;
  const player1_ID = message.author.id;

  const player2 = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (player2 === null) return message.channel.send("You didn't provide a valid user to gift points to.");
  const player2_ID = `${player2.id}`;

  const player1_players = [];
  const player1_points = [];
  let player1_sumPoints;

  const player2_players = [];
  const player2_points = [];
  let player2_sumPoints;

  if (player1_ID === player2_ID) {
    return message.channel.send("You can't challenge yourself.");
  }

  if (player2.user.bot === true) {
    return message.channel.send("You can't challenge bots.");
  }

  if (!args[1]) {
    return message.channel.send("Specify the amount you want to battle for.");
  }

  const enoughPoints = await Points.findOne({
    userID: message.author.id,
    serverID: message.guild.id
  });

  if (!enoughPoints) {
    return message.channel.send(`Not enough points. Type ${botconfig.prefix}pointshelp to learn how to earn points.`);
  } else if (enoughPoints.points < args[1]) {
    return message.channel.send(`Not enough points. Type ${botconfig.prefix}pointshelp to learn how to earn points.`);
  }

  const targetEnoughPoints = await Points.findOne({
    userID: player2_ID,
    serverID: message.guild.id
  });

  if (!targetEnoughPoints) {
    return message.channel.send(`${player2.id} doesn't have enough points.`);
  } else if (targetEnoughPoints.points < args[1]) {
    return message.channel.send(`${player2} doesn't have enough points.`);
  }

  const filter = m => m.author.id === player2.user.id;

  message.channel.send(player2 + ", you have been challenged by " + player1.username + ". Type 'accept' to accept the challenge. Will expire in 30 seconds.").then(r => r.delete(30000));
  message.channel.awaitMessages(filter, { max: 1, time: 30000 }).then(collected => {

    if (collected.first().content === "accept") {
      battleBE.pack(player1_players, player1_points);
      battleBE.pack(player2_players, player2_points);

      player1_sumPoints = player1_points[0] + player1_points[1];
      player2_sumPoints = player2_points[0] + player2_points[1];

      const joinedPlayer1Players = player1_players.join("\n");
      const joinedPlayer2Players = player2_players.join("\n");
      const p1 = message.author.username;
      const p2 = `${player2.user.username}`;

      function embed(whoWon, howManyPointsGained, howManyPointsLost, whoLost) {
        const battle = new Discord.RichEmbed()
          .setTitle("Pack battle. " + p1 + " vs " + p2)
          .setColor(botconfig.black)
          .setThumbnail("https://img.icons8.com/material/1600/battle.png")
          .setFooter("Bot developed by Trace#8994")
          .addField(p1 + "'s best pulls were:", joinedPlayer1Players)
          .addField(p2 + "'s best pulls were:", joinedPlayer2Players)
          .addField("Outcome: ", whoWon + " gained " + howManyPointsGained + " points and " + whoLost + " lost " + howManyPointsLost + " points.");

        return battle;
      }

      if (player1_sumPoints > player2_sumPoints) {
        const intPointsToAdd = parseInt(args[1]);
        const pointstoadd = Math.ceil(intPointsToAdd);
        const pointstoremove = Math.ceil((args[1]));
        
        //+
        Points.findOne({
          userID: message.author.id,
          serverID: message.guild.id
        }, (err, points) => {
          if (err) console.log(err);
          points.points = points.points + pointstoadd;
          points.save().catch(err => console.log(err));
          }
        );

        //-
        Points.findOne({
          userID: player2_ID,
          serverID: message.guild.id
        }, (err, points) => {
          if (err) console.log(err);
          points.points = points.points - pointstoremove;
          points.save().catch(err => console.log(err));
          }
        );

        message.channel.send({ embed: embed(player1, pointstoadd, pointstoremove, player2) });

      } else if (player2_sumPoints > player1_sumPoints) {
        const intPointsToAdd = parseInt(args[1]);
        const pointstoadd = Math.ceil(intPointsToAdd);
        const pointstoremove = Math.ceil((args[1]));
        console.log(pointstoadd + " points, player 2");
        console.log(pointstoremove + " removed");

        //+
        Points.findOne({
          userID: player2_ID,
          serverID: message.guild.id
        }, (err, points) => {
          if (err) console.log(err);
          if (!points) {
          points.points = points.points + pointstoadd;
          points.save().catch(err => console.log(err));
          }
        });

        //-
        Points.findOne({
          userID: message.author.id,
          serverID: message.guild.id
        }, (err, points) => {
          if (err) console.log(err);
          points.points = points.points - pointstoremove;
          points.save().catch(err => console.log(err));
          }
        );

        message.channel.send({ embed: embed(player2, pointstoadd, pointstoremove, player1) });
      } else {
        message.channel.send("Tie.");
      }

    } else if (collected.first().content === "deny") {
      message.channel.send("Denied.").then(m => m.delete(10000));
    }
    // eslint-disable-next-line no-unused-vars
  }).catch(err => {
    message.channel.send("Time has expired").then(m => m.delete(10000));
  });
};

module.exports.help = {
  name: "battle"
};
