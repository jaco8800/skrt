const botconfig = require("../botconfig.json");
const mongoose = require("mongoose");
mongoose.connect(botconfig.points_db, {
  useNewUrlParser: true
});
const Points = require("../db/points.js");


module.exports.run = async (bot, message, args) => {
    
    function isInt(x) {
        var y = parseInt(x, 10);
        return !isNaN(y) && x == y && x.toString() == y.toString();
    }
         
    if(!args[0]) return message.channel.send("Specify who you want to gift the points.");
    if(isInt(args[1]) === false) return message.channel.send(`The amount of points you've provided is not a number. Make sure you've used \`${botconfig.prefix}gift @user amount\`.`);
    if(!args[1]) return message.channel.send("Specify the amount of points you want to gift.");
    
    const personGifting = message.author;
    const personGifting_ID = message.author.id;
    const whoToGift = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(whoToGift === null) return message.channel.send("You didn't provide a valid user to gift points to.");
    const whoToGift_ID = `${whoToGift.id}`;
    const howMuch = args[1];

    if (personGifting_ID === whoToGift_ID) return message.channel.send("You can't gift points to yourself.");
    if (whoToGift.user.bot === true) return message.channel.send("You can't gift points to bots.");

    const personGiftingDocument = await Points.findOne({
        userID: personGifting_ID,
        serverID: message.guild.id
    });

    const whoToGiftDocument = await Points.findOne({
        userID: whoToGift_ID,
        serverID: message.guild.id
    });

    if (!personGiftingDocument) return message.channel.send(`Not enough points. Type ${botconfig.prefix}pointshelp to learn how to earn points.`);
    if (personGiftingDocument.points < howMuch) return message.channel.send(`Not enough points. Type ${botconfig.prefix}pointshelp to learn how to earn points.`);
    
    personGiftingDocument.points = personGiftingDocument.points - parseInt(howMuch);
    personGiftingDocument.save().catch(err => console.log(err));

    whoToGiftDocument.points = whoToGiftDocument.points + parseInt(howMuch);
    whoToGiftDocument.save().catch(err => console.log(err));

    message.channel.send(whoToGift + " you have been gifted " + howMuch + " points by " + personGifting);

  };
  
  module.exports.help = {
    name: "gift"
  };
  