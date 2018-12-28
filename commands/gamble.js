const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const int = require("../modules/packsimulator.js");
const mongoose = require("mongoose");
mongoose.connect(botconfig.points_db, {
    useNewUrlParser: true
});
const Points = require("../db/points.js");

module.exports.run = async (bot, message, args) => {
    const player = message.author.username;

    const document = await Points.findOne({
        userID: message.author.id,
        serverID: message.guild.id
    });

    function isInt(x) {
        var y = parseInt(x, 10);
        return !isNaN(y) && x == y && x.toString() == y.toString();
    }

    if (isInt(args[0]) === false) return message.channel.send(`The amount of points you've provided is not a number. Make sure you use \`${botconfig.prefix}gamble amount\``);
    if (!args[0]) return message.channel.send("Specify the amount of points you want to gamble for.");
    if (!document) return message.channel.send(`Not enough points. Type ${botconfig.prefix}pointshelp to learn how to earn points.`);
    if (Math.ceil(document.points) < args[0]) return message.channel.send(`Not enough points. Type ${botconfig.prefix}pointshelp to learn how to earn points.`);

    const rng = int.randomInt(1, 100);

    function sendEmbed(par) {
        const embed = new Discord.RichEmbed()
            .setTitle("Gamble");
        if (par === 0) {
            embed.setColor(botconfig.red);
            embed.addField("You have bad luck " + player, "You have lost " + args[0] + " points.");
            message.channel.send(embed);
        } else if (par === 1) {
            embed.setColor(botconfig.green);
            embed.addField("Congratulations " + player, "You have won " + args[0] + " points.");
            message.channel.send(embed);
        }
    }

    if (rng <= 50) {
        document.points = document.points - args[0];
        document.save().catch(err => console.log(err));
        sendEmbed(0);
    } else {
        document.points = document.points + parseInt(args[0]);
        document.save().catch(err => console.log(err));
        sendEmbed(1);
    }

    setTimeout(function notBelowZero() {
        Points.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        }, (err, points) => {
            if (err) console.log(err);
            if (points.points < 0) {
                points.points = 0;
                points.save().catch(err => console.log(err));
            }
        });
    }, 3000);
};

module.exports.help = {
    name: "gamble"
};
