import {Message} from 'discord.js'
import
{
    client, 
    prefix,
    commandRun
} from '../main'

client.on('message', (message: Message) =>
{
    if (!message.content.startsWith(prefix) || message.author.bot)
    {
        return;
    }

    let args = message.content.substring(prefix.length).split(' ');

    commandRun(args[0], message);
})