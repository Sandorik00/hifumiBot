import {dataObj} from './main';
import * as fr from './modules/firebase'
import * as discord from "discord.js";

//util functions
export async function getReferalInvites(guild: discord.Guild): Promise<object>
{
          let invites = await guild.fetchInvites();
          //Привести всё к виду InviteStats
          let InviteStats: object = {};
          invites.forEach((i) => {
                    InviteStats[dataObj['referalInvites'][i.code]] = i.uses; 
          })
          return InviteStats;
}

export async function getInvitesData()
{
          let users = await fr.readCollection('users');
          let oldInvitesStats: object = users[users.length - 1]['InviteStats'];
          return oldInvitesStats;
}

export async function fromCheck(newStats: object, oldStats: object): Promise<string>
{
          let from = 'из далёких земель';
          for (let key in newStats) {
                    if (key in oldStats)
                    {
                              if (newStats[key] > oldStats[key])
                              {
                                from = key;
                              }
                    }
          }
          return from;
}

//util classes
export class MemberData
{
          member: string;
          nickname: string;
          from: string;
          date: string;
          InviteStats: object;
          timestamp: any;
          bot: boolean;
          constructor(mem: discord.GuildMember, place: string, invStats)
          {
                    this.member = `${mem}`;
                    this.nickname = `${mem.user.username}`;
                    this.from = place;
                    this.date = `${new Date().toLocaleString("ru-RU")}`;
                    this.InviteStats = invStats;
                    this.bot = false;
                    this.timestamp = fr.FieldValue.serverTimestamp();
          }
}