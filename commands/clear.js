module.exports.run = async (bot, message, args) => {

  const amount = parseInt(args[0]) + 1;

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have permission to do that.");
  if (!args[0]) return message.channel.send("Specify the amount.");
  message.channel.bulkDelete(amount).then(() => {
    message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
  });

};

module.exports.help = {
  name: "clear"
};
