import { TextChannel } from 'discord.js';
import { client, prefix, commandRun, settings } from '../main';

client.on("guildMemberRemove", async member =>
{
          const channel = member.guild.channels.cache.find(
            (ch) => ch.id === settings.get(member.guild.id).HelloChID
          )
          if (!channel) return;
          //will be rewrited
          if (settings.get(member.guild.id).IgnoredIDs.find((v) => v === member.id) !== undefined) return;
          if (member.guild.id === '849388857689899019') {
            (channel as TextChannel).send(`${member.user.tag}` + " не гусь!");
            return;
          }
          (channel as TextChannel).send("Пользователь " + `${member.user.tag}` + " покинул сервер!");
        
});
