import * as discord from 'discord.js';
import {Client, MessageEmbed, MessageAttachment, Message} from 'discord.js';
import * as fs from 'fs';

const configFile: string = fs.readFileSync('./secrets/bot_config.json', 'utf8');
const configs: object = JSON.parse(configFile);


export const client = new discord.Client();
export const prefix: string = configs['prefix'];
export const ownerID: string = configs['ownerID'];
export const commands: Map<string, Command> = new Map();
export const dataObj = {};

//clean function
export function clean(text: string) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}


//command handler
interface Command 
{
  name: string;
  run(message?: Message, args?: Array<String>): void;
}

const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));
for (let file of commandFiles)
{
  let command: Command = require(`./commands/${file}`);
  commands.set(command.name, command);
}

//commandRunner
export function commandRun(commandName: string, message?: Message, args?: string[]): void
{
  console.log(commandName);
  if (message && args)
  {
    commands.get(commandName).run(message, args);
  } else if (message)
  {
    commands.get(commandName).run(message);
  } else commands.get(commandName).run();
}

//data handler
const dataFiles = fs.readdirSync('./data').filter(file => file.endsWith('.json'));
for (let file of dataFiles)
{
  let tmpData = fs.readFileSync(`./data/${file}`, 'utf8');
  let fn = file.replace(/\.[^/.]+$/, "");
  dataObj[fn] = JSON.parse(tmpData);
}

//event handler
const eventFiles = fs.readdirSync(__dirname + '/events').filter(file => file.endsWith('.js'));
for (let file of eventFiles)
{
  require(`./events/${file}`)
}

//probably many messages getter
export async function lots_of_messages_getter(channel, limit) {
  const sum_messages = [];
  let last_id;

  while (true) {
      const options = { limit: 100 };
      if (last_id) {
          options['before'] = last_id;
      }

      const messages = await channel.messages.fetch(options);
      sum_messages.push(...messages.array());
      last_id = messages.last().id;

      if (messages.size != 100 || sum_messages.length >= limit) {
          break;
      }
  }

  return sum_messages;
}



client.login(configs['bot-token']);