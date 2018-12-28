module.exports.run = async (bot, message, args) => {
  const say = args.join(" ");

  message.channel.send(say);
};

module.exports.help = {
  name: "say"
};
