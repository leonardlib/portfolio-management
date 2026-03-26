export type AllocationTarget = {
  ticker: string;
  weight: number;
};

export type RebalanceAction = {
  ticker: string;
  action: 'buy' | 'sell';
  currentMarketCap: number;
  targetMarketCap: number;
  currentPrice: number;
};
