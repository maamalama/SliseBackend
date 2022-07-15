import { DiscordResponse } from './discord-response';

export class WhitelistStatisticsResponse {
  whitelistSize: number;
  twitterFollowersCount: number;
  discordInfo: DiscordResponse;
  bluechipHolders: number;
  whales: number;
  bots: number;
}