import { Message } from 'discord.js';
import { GuildSettings } from '../modules/fileSystem';
import { ownerIDs, settings } from '../main';

module.exports = {
    name: 'set',
    async run(message: Message, args: string[]) {
        if (message.member.id === '218437393047355392') {
        } else if (!message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.send('アクセスが拒否されました');
            return;
        }
        let o: GuildSettings = { HelloChID: '', NewsChID: '' };
        let answer: string;

        switch (args[1]) {
            case 'append':
                if (args[2]) {
                    let options = args.slice(2);
                    o.HelloChID = options[0];
                    o.NewsChID = options[1];
                    settings.append(message.guild.id, o);
                    answer = 'appended';
                } else {
                    answer = 'Для этой настройки нужно больше аргументов.';
                }
                break;
            case 'remove':
                settings.remove(message.guild.id);
                answer = 'Removed';
                break;
            case 'get':
                answer = settings.getDesc(message.guild.id);
                break;
        }

        settings.updateSettingsFile();
        message.channel.send(answer);
    },
};
