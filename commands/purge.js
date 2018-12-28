module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.reply("You don't have permission to do that.");
  }

  for (let i = 0; i < 5; i++) {
    setTimeout(function purge() {
      message.channel.bulkDelete(100);
    }, i * 2000);
  }

  setTimeout(function msg() {
    message.channel.send("Channel purged.").then(msg => msg.delete(5000));
  }, 12000);
};

module.exports.help = {
  name: "purge"
};
