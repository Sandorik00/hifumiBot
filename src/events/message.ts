import { Message } from 'discord.js';
import { client, prefix, commandRun } from '../main';

client.on('message', (message: Message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  let args = message.content.substring(prefix.length).split(' ');

  commandRun(args[0], message, args);
});

/* client.on('message', async (message) => {
  try {
    if (message.guild.id === '500980710870614019' && message.webhookID != null) {
      message.delete();
    }
  } catch (err) {
    console.warn('webhook message deleter warning:', err);
  }
}); */
