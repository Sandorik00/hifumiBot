import { client } from "../main";
import {
  User,
  ImageURLOptions,
  Message,
  Collection,
  GuildMember,
  Guild,
} from "discord.js";

module.exports = {
  name: "ava",
  async run(message: Message, args: Array<string>) {
    let imageOptions: ImageURLOptions & { dynamic?: boolean } = {
      format: "png",
      size: 4096,
      dynamic: true,
    };
    let generalArg = args.join(" ").substring(args[0].length + 1).trim();
    let avatar: string;
    let user: User;
    if (!args[1]) {
      user = message.author;
    } else {
      let arg = String(args[1]);
      try {
        switch (true) {
          case /<@!\d+>/.test(arg):
            user = (await client.users.fetch(args[1].match(/<@!(\d*)>/)[1])) as User;
            break;

          case /\d+/.test(arg):
            user = (await client.users.fetch(arg, false, true)) as User;
            break;

          default:
            let allMembers: Collection<string, GuildMember> = await message.guild.members.fetch();
            let tempMem: GuildMember;
            tempMem =
              allMembers.find(
                (mem) =>
                  mem.user.username.toLowerCase() === generalArg.toLowerCase()
              ) ?? null;

            user =
              tempMem !== null
                ? tempMem.user
                : allMembers.find((mem) => mem.nickname === generalArg).user;

            break;
        }
      } catch (e) {
        console.log(e);
        message.channel.send(e);
      }
    }

    if (!user) {
      message.channel.send("Никого такого не знаю.");
    } else {
      avatar =
        user.avatarURL(imageOptions) !== null
          ? user.avatarURL(imageOptions)
          : user.defaultAvatarURL;
      message.channel.send({ files: [avatar] });
    }
  },
};
