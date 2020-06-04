import {Attachment} from 'discord.js';

module.exports =
{
    name: 'sojiro',
    run (message, args)
    {
        const attachment = new Attachment('https://pbs.twimg.com/media/Cqfwjf1WEAAeiLC.jpg');
        message.channel.send(attachment);
    }
}