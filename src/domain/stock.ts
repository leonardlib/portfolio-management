const PRICES_MOCK: Record<string, number> = {
  META: 100,
  AAPL: 50,
  MSFT: 250,
};

/**
 * Represents a stock holding inside the portfolio.
 * It stores the ticker, owned shares, and a simplified current price.
 */
export class Stock {
  private readonly ticker: string;

  private readonly shares: number;

  private readonly currentPrice: number;

  /**
   * Creates a stock position with a mocked market price.
   */
  constructor(ticker: string, shares: number) {
    this.ticker = ticker;
    this.shares = shares;
    this.currentPrice = this.resolveCurrentPrice();
  }

  /**
   * Resolves the latest available price for the stock.
   * In this simplified example, the price is randomly generated, but in a real
   * application, this would involve fetching data from a financial API
   * or database.
   */
  private resolveCurrentPrice(): number {
    return PRICES_MOCK[this.ticker] ?? 0;
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

  /**
   * Calculates the total market value of the position.
   */
  getMarketCap(): number {
    return this.shares * this.currentPrice;
  }
}
