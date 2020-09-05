import * as util from '../utils';
import * as fr from '../modules/firebase';
import {GuildMember, GuildChannel, TextChannel} from 'discord.js';
import
{
    client, 
    prefix,
    commandRun
} from '../main';

client.on('guildMemberAdd', async (member: GuildMember) =>
{
    const HelloChannel: GuildChannel = member.guild.channels.cache.find(ch => ch.id === '674609296050487306');
    if (!HelloChannel) return;
    //hardcoded now but will be rewrited later

    let InviteStats = await util.getReferalInvites(member.guild);
    let oldStats = await util.getInvitesData();
    let from: string = await util.fromCheck(InviteStats, oldStats);
    let memData: util.MemberData = new util.MemberData(member, from, InviteStats);

    if (member.user.bot)
    {
        memData.bot = true;
        (HelloChannel as TextChannel).send(`Ну бот и бот ¯\\\\\\_(ツ)\\_/¯. Заходи ${member}`);
    } else
    {
        (HelloChannel as TextChannel).send("Привет " + `${member}!! ` + `Судя по моим записям ты воспользовался **${from}** инвайтом.`);
    }

    

    await fr.writeToCollection('users', memData.toJSON());
})