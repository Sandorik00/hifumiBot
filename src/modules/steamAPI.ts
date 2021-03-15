import * as SteamAPI from "steamapi";
const steamSecret = require("../../secrets/steam.json");

const steam: SteamAPI = new SteamAPI(steamSecret['token']);

export async function GetUser(userName: string) {
          let data;
          await steam.resolve(`https://steamcommunity.com/id/${userName}`).then(id => {
                    console.log(id);
                    data = id; 
          });
          await steam.getUserSummary(`${data}`).then(summary => {
                    console.log(summary);
                    data = summary;
          });
          return data;
}

export async function GetGame(gameName: string) {
          let data: Array<object> = await steam.getAppList();
          let gameCheck = data.find((e) => e['name'] === gameName);
          console.log(gameCheck);
          let game = await steam.getGameDetails(`${gameCheck['appid']}`);
          console.log(game);
          return game;
}