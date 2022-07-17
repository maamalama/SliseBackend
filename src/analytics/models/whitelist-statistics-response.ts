import { DiscordResponse } from './discord-response';

export class TopHoldersResponse {
  whale: boolean;
  address: string;
  nfts: number;
  portfolio: number;
  label: string;
}

export class WhitelistStatisticsResponse {
  whitelistSize: number;
  twitterFollowersCount: number;
  discordInfo: DiscordResponse;
  bluechipHolders: number;
  whales: number;
  bots: number;
  topHolders: TopHoldersResponse[];
}