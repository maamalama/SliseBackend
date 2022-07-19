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
  totalholdings: number;
  percent: number
  holdings?: CollectionInfoResponse;
}

export class CollectionInfoResponse {
  totalSupply?: number;
  logo?: string;
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

export class WhitelistResponse {
  address: number;
  holdings: CollectionInfoResponse[];
  nfts: number;
  avgNFTsPrice: number;
  balance: number;
  portfolio: number;
  label: string;
  bluechipHolders: number;
  whales: number;
  bots: number;
  twitter?: string;
  discord?: string;
}