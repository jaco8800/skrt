const packSimulator = require("../modules/packsimulator.js");
const players = require("../modules/players.js");

module.exports.pack = (playersArray, pointsArray) => {
    function ran100() {
        return packSimulator.randomInt(1, 100);
    }

    function arrpush(par) {
        playersArray.push(packSimulator.getRandomLine(par));
    }

    function pointsPush(par) {
        pointsArray.push(par);
    }

    for (let i = 0; i < 2; i++) {
        const rng = packSimulator.randomInt(1, 150);
        const doublerng = packSimulator.randomInt(1, 10);

        //based on rating
        if (rng <= 20) { //82
            arrpush(players.x82);
            pointsPush(100);

        } else if (rng === 30 && doublerng === 8) { //icons
            const iconrng = ran100();

            if (iconrng <= 70) { //baby
                const babyrng = ran100();

                if (babyrng <= 80) { //bad baby
                    arrpush(players.baby_bad);
                    pointsPush(500);
                } else { //good baby
                    arrpush(players.baby_good);
                    pointsPush(1000);
                }
            } else if (iconrng > 70 && iconrng < 90) { //senior
                const seniorrng = ran100();

                if (seniorrng <= 70) { //bad senior
                    arrpush(players.senior_bad);
                    pointsPush(600);
                } else { //good senior
                    arrpush(players.senior_good);
                    pointsPush(1500);
                }
            } else { //prime
                const primerng = ran100();

                if (primerng <= 60) { //bad prime
                    arrpush(players.prime_bad);
                    pointsPush(700);
                } else { //good prime
                    arrpush(players.prime_good);
                    pointsPush(2000);
                }
            }
        } else if (rng >= 40 && rng <= 52) { //86
            const rng86 = ran100();

            if (rng86 <= 70) { //bad 86
                arrpush(players.x86bad);
                pointsPush(250);
            } else { //good 86
                arrpush(players.x86good);
                pointsPush(300);
            }
        } else if (rng > 76 && rng < 84) { //90+
            const rng90 = ran100();

            if (rng90 > 22 && rng90 < 28) {
                arrpush(players.good90);
                pointsPush(1000);
            } else {
                arrpush(players.bad90);
                pointsPush(500);
            }
        } else if (rng >= 110 && rng <= 120) { //87-89
            const rng8789 = ran100();

            if (rng8789 <= 85) { //bad 87-89
                arrpush(players.x8789bad);
                pointsPush(350);
            } else { //good 87-89
                arrpush(players.x8789good);
                pointsPush(400);
            }
        } else if (rng >= 132 && rng <= 145) { //85
            const rng85 = ran100();

            if (rng85 <= 88) { //bad 85
                arrpush(players.x85bad);
                pointsPush(200);
            } else { //good 85
                arrpush(players.x85good);
                pointsPush(250);
            }
        } else { //83-84
            arrpush(players.x83_84);
            pointsPush(150);
        }
    }
};