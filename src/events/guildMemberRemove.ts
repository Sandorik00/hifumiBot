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
          if (member.id === '364720702252908544') return;
          (channel as TextChannel).send("Пользователь " + `${member.user.tag}` + " покинул сервер!");
        
});