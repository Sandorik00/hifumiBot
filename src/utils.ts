import { dataObj } from './main';
import * as fr from './modules/firebase';
import * as discord from 'discord.js';
import { time } from 'console';

//util functions
export async function getReferalInvites(guild: discord.Guild): Promise<object> {
    let invites = await guild.fetchInvites();
    //Привести всё к виду InviteStats
    let InviteStats: object = {};
    invites.forEach((i) => {
        InviteStats[dataObj['referalInvites'][guild.id][i.code]] = i.uses;
    });
    return InviteStats;
}

export async function getInvitesData(collection: string) {
    let users = await fr.readCollection(collection);
    let oldInvitesStats: object = users[users.length - 1]['InviteStats'];
    return oldInvitesStats;
}

export async function fromCheck(
    newStats: object,
    oldStats: object
): Promise<string | null> {
    let from: string | null = null;
    for (let key in newStats) {
        if (key in oldStats) {
            if (newStats[key] > oldStats[key]) {
                from = key;
            }
        }
    }
    return from;
}

//util classes
export class MemberData {
    member: string;
    nickname: string;
    from: string;
    date: string;
    InviteStats: object;
    timestamp: any;
    bot: boolean;
    constructor(mem: discord.GuildMember, place: string, invStats) {
        this.member = `${mem}`;
        this.nickname = `${mem.user.username}`;
        this.from = place;
        this.date = `${new Date().toLocaleString('ru-RU')}`;
        this.InviteStats = invStats;
        this.bot = false;
        this.timestamp = 'time';
    }

    toJSON() {
        let data = {};
        let keys = Object.keys(this);
        keys.forEach((e) => {
            if (e === 'timestamp') {
                data[e] = fr.FieldValue.serverTimestamp();
                return;
            }
            data[e] = JSON.parse(JSON.stringify(this[e]));
        });
        return data;
    }
}
