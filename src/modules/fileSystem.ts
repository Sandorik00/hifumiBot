import * as fs from 'fs';
import * as path from 'path';

export interface GuildSettings {
    HelloChID: string;
    NewsChID: string;
}

interface Parsed {
    Name: string;
    Value: GuildSettings;
}

let settingsFilePath = path.join(
    path.dirname(__dirname),
    '..',
    'secrets',
    'settings.json'
);

export class SettingsSystem {
    private content: Map<string, GuildSettings>;

    constructor() {
        if (!fs.existsSync(settingsFilePath)) {
            fs.appendFileSync(settingsFilePath, '[]');
        }

        let parsed = JSON.parse(
            fs.readFileSync(settingsFilePath, 'utf8')
        ) as Array<Parsed>;

        this.content = new Map(parsed.map(({ Name, Value }) => [Name, Value]));
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
        let m: string;
        for (const key in this.content.get(guild)) {
            m += `\n${key}: ${this.content.get(guild)[key]}`;
        }
        return m;
    }

    updateSettingsFile() {
        let settingsArray = new Array<Parsed>();
        this.content.forEach((val, key) => {
            settingsArray.push({ Name: key, Value: val });
        });
        fs.writeFileSync(settingsFilePath, JSON.stringify(settingsArray));
    }
}
