const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const packSimulator = require("../modules/packsimulator.js");
const players = require("../modules/players.js");

module.exports.run = async (bot, message, args) => {

    function ran100() {
        return packSimulator.randomInt(1, 100);
    }

    function arrpush(par) {
        return array.push(packSimulator.getRandomLine(par));
    }

    const rng = ran100();

    const array = [];

    if (rng <= 70) { //baby
        const babyrng = ran100();

        if (babyrng <= 80) { //bad baby
            arrpush(players.baby_bad);
        } else { //good baby
            arrpush(players.baby_good);
        }
    } else if (rng > 70 && rng < 90) { //senior
        const seniorrng = ran100();

        if (seniorrng <= 70) { //bad senior
            arrpush(players.senior_bad);
        } else { //good senior
            arrpush(players.senior_good);
        }
    } else { //prime
        const primerng = ran100();

        if (primerng <= 60) { //bad prime
            arrpush(players.prime_bad);
        } else { //good prime
            arrpush(players.prime_good);
        }
    }

    const noDuplicates = packSimulator.removeDuplicates(array);

    const joinedArray = noDuplicates.join("\n");


    const iconpack = new Discord.RichEmbed()
        .setTitle("Icon Pack")
        .setColor(botconfig.white)
        .setThumbnail("https://www.fifarosters.com/assets/card-creator/FIFA_18_Assets-Icons-Logo.png")
        .setFooter("Bot developed by Trace#8994" + " | Pack generated at " + message.createdAt)
        .addField("Your icon: ", joinedArray);

    message.channel.send({ embed: iconpack });

};

module.exports.help = {
    name: "icon"
};
