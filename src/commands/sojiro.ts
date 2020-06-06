import {MessageAttachment} from 'discord.js';

module.exports =
{
    name: 'sojiro',
    async run (message, args)
    {
        let attachment = new MessageAttachment('https://pbs.twimg.com/media/Cqfwjf1WEAAeiLC.jpg');
        message.channel.send(attachment);
    }
}