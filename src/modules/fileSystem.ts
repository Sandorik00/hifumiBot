import * as fs from 'fs';
import { type } from 'os';
import * as path from 'path';

export interface GuildSettings {
  HelloChID: string;
  NewsChID: string;
  IgnoredIDs: Set<string>;
}

interface Parsed {
  Name: string;
  Value: GuildSettings;
}

let settingsFilePath = path.join(path.dirname(__dirname), '..', 'secrets', 'settings.json');

export class SettingsSystem {
  private content: Map<string, GuildSettings>;

  constructor() {
    if (!fs.existsSync(settingsFilePath)) {
      fs.appendFileSync(settingsFilePath, '[]');
    }

    let parsed = JSON.parse(fs.readFileSync(settingsFilePath, 'utf8')) as Array<Parsed>;

    this.content = new Map(parsed.map(({ Name, Value }) => [Name, Value]));
    console.log(this.content);
  }

  append(guild: string, settings: GuildSettings) {
    this.content.set(guild, settings);
  }

  remove(guild: string) {
    this.content.delete(guild);
  }

  get(guild: string): GuildSettings {
    return this.content.get(guild);
  }

  getDesc(guild: string): string {
    let m = '';
    let gs = this.content.get(guild);
    for (const key in gs) {
      gs[key] = gs[key] instanceof Set ? Array.from(gs[key]) : gs[key];
      m += `\n${key}: ${gs[key]}`;
    }
    return m;
  }

  updateSettingsFile() {
    let settingsArray = new Array<Parsed>();
    this.content.forEach((val, key) => {
      settingsArray.push({ Name: key, Value: val });
    });
    fs.writeFileSync(
      settingsFilePath,
      JSON.stringify(settingsArray, (_k, v) => {
        if (v instanceof Set) {
          return Array.from(v);
        } else {
          return v;
        }
      }),
    );
  }
}
