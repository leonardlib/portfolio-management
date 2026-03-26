export class Stock {
  private readonly ticker: string;

  private readonly shares: number;

  private readonly currentPrice: number;

  constructor(ticker: string, shares: number) {
    this.ticker = ticker;
    this.shares = shares;
    this.currentPrice = this.resolveCurrentPrice();
  }

  private resolveCurrentPrice(): number {
    const array = new Uint8Array(1);
    return crypto.getRandomValues(array)[0];
  }

  getTicker(): string {
    return this.ticker;
  }

  getShares(): number {
    return this.shares;
  }

  getCurrentPrice(): number {
    return this.currentPrice;
  }

  getMarketCap(): number {
    return this.shares * this.currentPrice;
  }
}
