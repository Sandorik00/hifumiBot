import * as discord from "discord.js";
import * as firebase from "../modules/firebase";
import { inspect } from "util";
import { ownerIDs, clean } from "../main";
import * as fs from "fs";
import { sandboxedEval } from "../eval-sandbox";

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
      let evaled = await sandboxedEval(
        `(async(fs, db, discord, client, message) => {${code}})`
      )(fs, firebase, discord, message.client, message);

      if (typeof evaled !== "string") evaled = inspect(evaled);

      evaled = evaled.slice(0, 1900);

      await message.channel.send(clean(evaled), { code: "js" });
    } catch (err) {
      await message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  },
};
