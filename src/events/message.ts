import {Message} from 'discord.js'
import {
    client, 
    prefix,
    commands
} from '../main'

client.on('message', (message: Message) =>
{
    let args = message.content.substring(prefix.length).split(' ')

    switch (args[0]) {

        case 'sojiro':
          commands.get('sojiro').run(message, args);
            
        break;
    }
})