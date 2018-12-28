const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const fs = require("fs");
const bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();
const mongoose = require("mongoose");
mongoose.connect(botconfig.points_db, {
  useNewUrlParser: true
});
const Points = require("./db/points.js");

fs.readdir("./commands/", (err, files) => {

  if (err) console.log(err);

  const jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  // eslint-disable-next-line no-unused-vars
  jsfile.forEach((f, i) => {
    const props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});

bot.on("ready", () => {
  console.log("Launched.");

  bot.user.setActivity(botconfig.activity);
});

bot.on("error", console.error);

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  const messageArray = message.content.split(" ");
  const cmd = messageArray[0];
  const args = messageArray.slice(1);
  const prefix = botconfig.prefix;

  if(message.content === "good bot" || message.content === "Good bot") {
    message.channel.send("Thanks, human.");
  }

  if (message.content.startsWith(prefix)) {
    const commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);
  } else {
    const pointsToAdd = 1;
    Points.findOne({
      userID: message.author.id,
      serverID: message.guild.id
    }, (err, points) => {
      if (err) console.log(err);
      if (!points) {
        const newPoints = new Points({
          userID: message.author.id,
          serverID: message.guild.id,
          points: pointsToAdd
        });

        newPoints.save().catch(err => console.log(err));
      } else {
        points.points = points.points + pointsToAdd;
        points.save().catch(err => console.log(err));
      }
    });
  }

});

bot.login(botconfig.token);
