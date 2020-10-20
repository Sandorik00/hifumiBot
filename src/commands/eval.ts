import * as discord from 'discord.js';
import * as firebase from "../modules/firebase";
import { inspect } from "util";
import { ownerIDs, clean } from "../main";
import * as fs from 'fs';

const fss = fs;
const db = firebase;

module.exports = {
  name: "eval",
  async run(message, args) {
    if (!ownerIDs.has(message.author.id)) {
      message.channel.send(
        "**eval** - очень опасная комманда, так что никому низя."
      );
      return;
    }

    try {
      args.shift();
      const code = args.join(" ");
      let evaled = await eval(`(async ()=> {${code}})()`);

      if (typeof evaled !== "string") evaled = inspect(evaled);


      evaled = evaled.slice(0, 1900);

      await message.channel.send(clean(evaled), { code: "js" });
    } catch (err) {
      await message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  },
};
