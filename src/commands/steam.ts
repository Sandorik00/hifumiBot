// import * as steam from "../modules/steamAPI";
// import { MessageEmbed } from 'discord.js';

// module.exports = {
//   name: "steam",
//   async run(message, args) {
//     if (args[1] === "user") {
//       let steamUser = await steam.GetUser(args[2]);
//       let userData: string = "";
//       for (let [key, value] of Object.entries(steamUser)) {
//         userData += `${key}: ${value}\n`;
//       }
//       message.channel.send(userData);
//     } else if (args[1] === "game") {
//       let gameData = await steam.GetGame(args[2]);
//       let embed: MessageEmbed = new MessageEmbed()
//       .setFooter(`Release: ${gameData['release_date']['date']}`)
//       .setDescription(`${gameData['about_the_game']}`)
//       .setTitle(`${gameData['name']}`)
//       .setImage(`${gameData['screenshots'][0]['path_full']}`);

//       message.channel.send(embed);
//     }
//   },
// };

module.exports = null;
