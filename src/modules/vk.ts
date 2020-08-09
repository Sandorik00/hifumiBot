import { VKApi, ConsoleLogger, BotsLongPollUpdatesProvider } from "node-vk-sdk";

const api: VKApi = new VKApi({
  //token: '11e91ac0becee11434f2a4d7a38e2133816de7b6565b2a254c17288868749ee9fa631153b250a0727418f',
  logger: new ConsoleLogger(),
});

