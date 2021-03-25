import * as util from '../utils';
import * as fr from '../modules/firebase';
//import { ServerDefenceMemberEntity } from '../modules/serverDefense';
import { GuildMember, GuildChannel, TextChannel } from 'discord.js';
import { client, prefix, commandRun, settings, dataObj } from '../main';

let islastSUS = false;

const forParadox = [
  'если ещё раз выйдешь то бан!!',
  'ты совсем дурачок или как?',
  'слушай, ну хватит уже...',
  'даже если ты не Парадокс, то всё равно бан.',
  'ты глупый или что-то?',
  'ты совсем идиот всё таки.',
  'нет такой комманды, дурачок.',
  'ты задержан или просто глупый?',
  'в этот раз тебе будет выдан бан просто потому, что ты - эвриван.',
  'я тебе не выдам роли Искателя и Гексакаста. Чтоб ты помучался.',
  'дверь вон там.',
  '<:DogeInGlasses:811992635363295243>',
  'ты забанен на три часа. Возвращайся, когда сделаешь домашку.',
];

let forParadoxRecent: string[] = [];

function getNextGreetingForParadox(): string | null {
  if (forParadoxRecent.length === 0) {
    forParadoxRecent = [...forParadox];
  }

  if (forParadoxRecent.length > 0) {
    let index = Math.floor(Math.random() * forParadoxRecent.length);
    let greeting = forParadoxRecent[index];
    forParadoxRecent.splice(index, 1);
    return greeting;
  } else {
    return null;
  }
}

client.on('guildMemberAdd', async (member: GuildMember) => {
  //let defEnt = new ServerDefenceMemberEntity(member);
  const HelloChannel: GuildChannel = member.guild.channels.cache.find(
    (ch) => ch.id === settings.get(member.guild.id).HelloChID,
  );
  if (!(HelloChannel instanceof TextChannel)) return;

  let collectionGN = '';
  if (member.guild.id === '500980710870614019') {
    collectionGN = 'users';
  } else {
    collectionGN = member.guild.id;
  }

  let InviteStats = await util.getReferalInvites(member.guild);
  let oldStats = await util.getInvitesData(collectionGN);
  let from: string | null = await util.fromCheck(InviteStats, oldStats);
  let memData: util.MemberData = new util.MemberData(member, from, InviteStats);

  if (member.id === '641366682761166860') {
    member.roles.add('751923183384264725');
    let greeting = getNextGreetingForParadox();
    if (greeting != null) HelloChannel.send(`${member}, ` + greeting);
  } else if ((settings.get(member.guild.id).IgnoredIDs ?? []).includes(member.id)) {
  } else if (member.user.bot) {
    memData.bot = true;
    HelloChannel.send(`Ну бот и бот ¯\\\\\\_(ツ)\\_/¯. Заходи ${member}`);
  } else {
    if (
      Object.keys(dataObj['referalInvites'][member.guild.id]).find(
        (key) => dataObj['referalInvites'][member.guild.id][key] === from,
      ) === from ||
      !from
    ) {
      HelloChannel.send(
        'Привет, ' + `${member}!! ` + `Судя по моим записям, ты воспользовался инвайтом.`,
      );
    } else {
      HelloChannel.send(
        'Привет, ' +
          `${member}!! ` +
          `Судя по моим записям, ты воспользовался инвайтом - "**${from}**".`,
      );
    }
  }

  await fr.writeToCollection(collectionGN, memData.toJSON());
});
