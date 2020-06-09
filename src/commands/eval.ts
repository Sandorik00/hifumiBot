import * as discord from 'discord.js';
import * as firebase from "../modules/firebase";
import { inspect } from "util";
import { ownerID, clean} from "../main";

const db = firebase;

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

      message.channel.send(clean(evaled), { code: "js" });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  },
};
