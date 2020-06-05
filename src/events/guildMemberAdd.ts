import {GuildMember} from 'discord.js'
import
{
    client, 
    prefix,
    commandRun
} from '../main'

class sUser extends GuildMember
{
          from: string;
}

client.on('guildMemberAdd', (member: sUser) =>
{
          console.log(member);
})