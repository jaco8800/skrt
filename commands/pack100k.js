const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const packSimulator = require("../modules/packsimulator.js");
const players = require("../modules/players.js");

module.exports.run = async (bot, message, args) => {

    function arrpush(par) {
        array.push(packSimulator.getRandomLine(par));
    }

    function ran100() {
        return packSimulator.randomInt(1, 100);
    }

    const array = [];

    for (let i = 0; i < 2; i++) {
        const rng = packSimulator.randomInt(1, 150);
        const doublerng = packSimulator.randomInt(1, 10);

        //based on rating
        if (rng <= 20) { //82
            arrpush(players.x82);
        } else if (rng === 30 && doublerng === 8) { //icons
            const iconrng = ran100();

            if (iconrng <= 70) { //baby
                const babyrng = ran100();

                if (babyrng <= 80) { //bad baby
                    arrpush(players.baby_bad);
                } else { //good baby
                    arrpush(players.baby_good);
                }
            } else if (iconrng > 70 && iconrng < 90) { //senior
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
        } else if (rng >= 40 && rng <= 52) { //86
            const rng86 = ran100();

            if (rng86 <= 70) { //bad 86
                arrpush(players.x86bad);
            } else { //good 86
                arrpush(players.x86good);
            }
        } else if (rng > 76 && rng < 84) { //90+
            const rng90 = ran100();

            if (rng90 > 22 && rng90 < 28) {
                arrpush(players.good90);
            } else {
                arrpush(players.bad90);
            }
        } else if (rng >= 110 && rng <= 120) { //87-89
            const rng8789 = ran100();

            if (rng8789 <= 85) { //bad 87-89
                arrpush(players.x8789bad);
            } else { //good 87-89
                arrpush(players.x8789good);
            }
        } else if (rng >= 132 && rng <= 145) { //85
            const rng85 = ran100();

            if (rng85 <= 88) { //bad 85
                arrpush(players.x85bad);
            } else { //good 85
                arrpush(players.x85good);
            }
        } else { //83-84
            arrpush(players.x83_84);
        }
    }

    const noDupliactes = packSimulator.removeDuplicates(array);

    const joinedArray = noDupliactes.join("\n");

    const pack100kEmbed = new Discord.RichEmbed()
        .setTitle("100k Pack")
        .setColor(botconfig.green)
        .setThumbnail("https://cdn.futbin.com/design/img/packs/cards/gold.png")
        .setFooter("Bot developed by Trace#8994" + " | Pack generated at " + message.createdAt)
        .addField("Your best pulls were: ", joinedArray);

    message.channel.send({ embed: pack100kEmbed });
};

module.exports.help = {
    name: "100k"
};