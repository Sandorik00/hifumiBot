import { TextChannel } from 'discord.js';
import
{
    client, 
    prefix,
    commandRun,
    settings
} from '../main';


client.on("guildMemberRemove", async member =>
{
          const channel = member.guild.channels.cache.find(ch => ch.id === '674609296050487306');
          if (!channel) return;
          //will be rewrited
          if (settings.get(member.guild.id).IgnoredIDs.find((v) => v === member.id) !== undefined) return;
          (channel as TextChannel).send("Пользователь " + `${member.user.tag}` + " покинул сервер!");
        
});