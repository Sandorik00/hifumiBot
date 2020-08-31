module.exports = {
  name: "clear",
  async run(message, args) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      message.channel.send("アクセスが拒否されました");
      return;
    }
    if (!args[1]) {
      message.channel.send(
        "Бака!! Нельзя просто так взять и удалить все сообщения!! И ноль тоже нельзя!!"
      );
      return;
    }

    let sum_messages = [];
    let last_id;

    while (true) {
      let options = { limit: 100 };
      if (last_id) {
        options["before"] = last_id;
      }

      const messages = await message.channel.messages.fetch(options);
      sum_messages.push(...messages.array());
      last_id = messages.last().id;

      if (args[2]) {
        sum_messages = sum_messages.filter((m) => m.author.username == args[2]);
        console.log(sum_messages);
      }

      if (sum_messages.length >= 1000 || messages.size != 100 || sum_messages.length >= args[1]) {
        break;
      }
    }

    if (sum_messages.length > args[1]) {
      sum_messages = sum_messages.slice(0, args[1]);
    }

    let filter = (reaction, user) => user.id === message.author.id;

    let confirmMessage = await message.reply(sum_messages[sum_messages.length - 1]["url"]);

    await confirmMessage.react('✅');
    await confirmMessage.react('❌');

    let collector = confirmMessage.createReactionCollector(filter, { time: 120000, dispose: true });
    let action = async reaction => {
      collector.stop();
      if(reaction.emoji.name == '✅') {
        message.channel.bulkDelete(sum_messages);
      }

      await confirmMessage.delete();
    }

    collector.on('collect', action);

    await message.delete();
  },
};
