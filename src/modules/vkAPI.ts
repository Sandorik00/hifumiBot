import { VKApi, ConsoleLogger, BotsLongPollUpdatesProvider } from "node-vk-sdk";

const vkSecrets = require("../../secrets/vk.json");

const api: VKApi = new VKApi({
  logger: new ConsoleLogger()
});

export async function getVKposts(amount?: Number) {
  if (!amount) {
    let posts = await api.wallGet({
      owner_id: vkSecrets['id'],
      count: 2,
      access_token: vkSecrets['token']
    });
    return posts;
  }
}