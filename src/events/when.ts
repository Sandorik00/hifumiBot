import { Message } from 'discord.js';
import { client } from '../main';

client.on('message', (message: Message) => {
    if (message.author.id === '652841585590927390') return;

    let re = new RegExp('\\S?(?:^|\\s+)(?:когда|when|вен)[\\s*?.!)]+', 'i');
    console.log(re);
    console.log(re.test(message.content.trim()));

    if (re.test(message.content.trim())) {
        let rand = Math.random();
        if (rand >= 0 && rand < 0.15) {
            message.channel.send('Тогда, когда сделаешь это самостоятельно!!');
        } else if (rand >= 0.15 && rand < 0.3) {
            message.channel.send('Никогда <:trololo:737998761262841948>');
        }
    }
});
