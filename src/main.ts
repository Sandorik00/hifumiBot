import * as discord from 'discord.js';
import { Util } from 'discord.js';
import { Client, MessageEmbed, MessageAttachment, Message } from 'discord.js';
import * as fs from 'fs';
import { SettingsSystem } from './modules/fileSystem';

export let settings = new SettingsSystem();

const configFile: string = fs.readFileSync('./secrets/bot_config.json', 'utf8');
const configs: object = JSON.parse(configFile);

export const client = new discord.Client();
export const prefix: string = configs['prefix'];
export const ownerIDs: Set<string> = new Set(configs['ownerIDs']);
export const commands: Map<string, Command> = new Map();
export const dataObj = {};

//clean function
export function clean(text: string) {
    if (typeof text === 'string')
        return text
            .replace(/`/g, '`' + String.fromCharCode(8203))
            .replace(/@/g, '@' + String.fromCharCode(8203));
    else return text;
}

//command handler
interface Command {
    name: string;
    run(message?: Message, args?: Array<String>): void;
}

const commandFiles = fs
    .readdirSync(__dirname + '/commands')
    .filter((file) => file.endsWith('.js'));
for (let file of commandFiles) {
    let command: Command = require(`./commands/${file}`);
    commands.set(command.name, command);
}

//commandRunner
export function commandRun(
    commandName: string,
    message?: Message,
    args?: string[]
): void {
    console.log(commandName);
    try {
        if (message && commands.get(commandName) === undefined) {
            message.channel.send('Нет такой комманды, дурачок.');
            return;
        }
        if (message && args) {
            commands.get(commandName).run(message, args);
        } else if (message) {
            commands.get(commandName).run(message);
        } else commands.get(commandName).run();
    } catch (e) {
        console.log(e);
    }
}

//data handler
const dataFiles = fs
    .readdirSync('./data')
    .filter((file) => file.endsWith('.json'));
for (let file of dataFiles) {
    let tmpData = fs.readFileSync(`./data/${file}`, 'utf8');
    let fn = file.replace(/\.[^/.]+$/, '');
    dataObj[fn] = JSON.parse(tmpData);
}

//event handler
const eventFiles = fs
    .readdirSync(__dirname + '/events')
    .filter((file) => file.endsWith('.js'));
for (let file of eventFiles) {
    require(`./events/${file}`);
}

client.login(configs['bot-token']);
