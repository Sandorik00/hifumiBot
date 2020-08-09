import * as discord from 'discord.js';
import * as firebase from "../modules/firebase";
import { inspect } from "util";
import { ownerID, clean, lots_of_messages_getter } from "../main";
import * as fs from 'fs';

const fss = fs;
const db = firebase;
/* async function gievMessages(channel, limit) {
  const sum_messages = [];
  let last_id;

  while (true) {
      const options = { limit: 100 };
      if (last_id) {
          options['before'] = last_id;
      }

      const messages = await channel.messages.fetch(options);
      sum_messages.push(...messages.array());
      last_id = messages.last().id;

      if (messages.size != 100 || sum_messages.length >= limit) {
          break;
      }
  }

  return sum_messages;
} */

module.exports = {
  name: "eval",
  async run(message, args) {
    if (message.author.id !== ownerID) {
      message.channel.send(
        "**eval** - очень опасная комманда, так что никому низя."
      );
      return;
    }

    try {
      args.shift();
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = inspect(evaled);

      
      evaled = evaled.slice(0, 1900);

      message.channel.send(clean(evaled), { code: "js" });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  },
};
