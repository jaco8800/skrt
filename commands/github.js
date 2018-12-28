module.exports.run = async (bot, message, args) => {

  if (!args[0]) return message.channel.send("No profile given.");

  message.channel.send("https://github.com/" + args[0] + "/");

};

module.exports.help = {
  name: "github"
};
