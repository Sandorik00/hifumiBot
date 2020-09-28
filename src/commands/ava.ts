import { client } from "../main";
import { User, ImageURLOptions, Message } from "discord.js";
import fetch from "node-fetch";

module.exports = {
  name: "ava",
  async run(message, args) {
    let imageOptions: ImageURLOptions = { format: "png", size: 4096 };
    let allInOneArgs: String = args.join(" ");
    let generalArg = allInOneArgs.substring(args[0].length + 1);
    let avatar: String;
    if (!args[1]) {
      avatar = message.author.avatarURL(imageOptions);
    } else {
      let arg = String(args[1]);
      try {
        switch (true) {
          case /<@!\d+>/.test(arg):
            let user = (await client.users.fetch(
              args[1].match(/<@!(\d*)>/)[1]
            )) as User;
            avatar = user.avatarURL(imageOptions);
            if (avatar == undefined) {
              avatar = user.defaultAvatarURL;
            }
            break;

          case /\d+/.test(arg):
            let userById = (await client.users.fetch(arg, false, true)) as User;
            avatar = userById.avatarURL(imageOptions);
            if (avatar == undefined) {
              avatar = userById.defaultAvatarURL;
            }
            break;

          default:
            let allMembers = await message.guild.members.fetch();
            let userByNick =
              allMembers.find(
                (mem) =>
                  mem.user.username.toLowerCase() === generalArg.toLowerCase()
              ) ?? null;
            if (userByNick != null) {
              if (userByNick.hasOwnProperty("user")) {
                userByNick = userByNick.user;
              }
            }
            if (!userByNick) {
              userByNick = allMembers.find((mem) => mem.nickname === generalArg)
                .user;
            }

            if (!userByNick) {
              message.channel.send("Не знаю никого с таким именем.");
            } else {
              avatar = userByNick.avatarURL(imageOptions);
              if (avatar == undefined) {
                avatar = userByNick.defaultAvatarURL;
              }
            }
            break;
        }
      } catch (e) {
        console.log(e);
        message.channel.send(
          "Ой, похоже тут какая-то ошибка. Попробуй ещё раз."
        );
      }
    }
    message.channel.send(avatar);
  },
};

/* alternative node-fetch by id implementation with not actual token of course
let userById;
            const url = `https://discordapp.com/api/users/${arg}`;
            const headers = {
              "Content-Type": "application/json",
              "Authorization": "Bot NjUyODQxNTg1NTkwOTI3Mzkw.XeuUGw.cjHtR4VVVZER6uQlmtZKKzukYqY",
            };

             await fetch(url, { method: "GET", headers: headers })
              .then((res) => {
                return res.json();
              })
              .then((json) => {
                userById = json;
                console.log(json);
              });
              avatar = `https://cdn.discordapp.com/avatars/${userById.id}/${userById.avatar}.png?size=4096`;  */
