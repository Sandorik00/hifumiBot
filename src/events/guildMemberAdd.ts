import {GuildMember} from 'discord.js'
import
{
    client, 
    prefix,
    commandRun
} from '../main'

client.on('guildMemberAdd', (member: GuildMember) =>
{
          console.log(member);
})