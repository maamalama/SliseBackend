import { DiscordResponse } from './discord-response';

export class TopHoldersResponse {
  whale: boolean;
  address: string;
  nfts: number;
  portfolio: number;
  label: string;
}
export class MutualHoldingsResponse {
  address: string;
  name: string;
  holdings: number;
}

export class WhitelistStatisticsResponse {
  whitelistSize: number;
  twitterFollowersCount?: number;
  discordInfo?: DiscordResponse;
  bluechipHolders: number;
  whales: number;
  bots: number;
  topHolders: TopHoldersResponse[];
  mutualHoldings: MutualHoldingsResponse[];
}