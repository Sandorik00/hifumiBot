import { TextChannel } from 'discord.js';
import
{
    client, 
    prefix,
    commandRun
} from '../main';


client.on("guildMemberRemove", async member =>
{
          const channel = member.guild.channels.cache.find(ch => ch.id === '674609296050487306');
          if (!channel) return;
          //will be rewrited
          (channel as TextChannel).send("Пользователь " + `${member.user.tag}` + " покинул сервер!");
        
});