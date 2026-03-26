import type { AllocationTarget, RebalanceAction } from '../types';
import { Stock } from './stock';

const HOLDINGS_MOCK: Stock[] = [
  new Stock('META', 8),
  new Stock('AAPL', 18),
  new Stock('MSFT', 4),
];

/**
 * Represents a portfolio composed of current stock holdings and a target
 * allocation that describes how capital should be distributed.
 */
export class Portfolio {
  private readonly stocks: Stock[];

  private readonly allocations: AllocationTarget[];

  /**
   * Creates a portfolio from the desired allocation weights.
   * Holdings are resolved separately because we may resolve them through an API
   * request or something similar.
   */
  constructor(allocations: AllocationTarget[]) {
    this.stocks = this.resolveStocks();
    this.allocations = this.normalizeAllocations(allocations);
  }

  /**
   * Returns the current stock holdings associated with the portfolio.
   * In a real application, this would likely involve fetching data from an API
   * or database, but here we return a static mock to keep the focus on the
   * rebalancing logic.
   */
  private resolveStocks(): Stock[] {
    return HOLDINGS_MOCK;
  }

  /**
   * Converts allocation weights into normalized fractions so callers can pass
   * values such as 40 and 60 instead of 0.4 and 0.6.
   */
  private normalizeAllocations(
    allocations: AllocationTarget[],
  ): AllocationTarget[] {
    if (allocations.length === 0) return [];

    const totalWeight = allocations.reduce(
      (sum, { weight }) => sum + weight,
      0,
    );

    return allocations.map(({ ticker, weight }) => ({
      ticker,
      weight: weight / totalWeight,
    }));
  }

  getStocks(): Stock[] {
    return this.stocks;
  }

  getAllocations(): AllocationTarget[] {
    return this.allocations;
  }

  /**
   * Calculates the total market value of all holdings in the portfolio.
   */
  getTotalMarketCap(): number {
    return this.stocks.reduce((sum, stock) => sum + stock.getMarketCap(), 0);
  }

  /**
   * Compares each holding against its target allocation and returns the trades
   * required to move the portfolio toward the desired distribution.
   *
   * @param tolerance Minimum price difference required before suggesting a trade.
   * @returns A list of buy or sell actions for holdings that are outside tolerance.
   */
  getRebalancePlan(tolerance = 10): RebalanceAction[] {
    return this.stocks
      .map<RebalanceAction | undefined>((stock) => {
        const allocationTarget = this.allocations.find(
          (allocation) => stock.getTicker() == allocation.ticker,
        );

        if (!allocationTarget) {
          return {
            ticker: stock.getTicker(),
            action: 'sell',
            currentMarketCap: stock.getMarketCap(),
            targetMarketCap: 0,
            currentPrice: stock.getCurrentPrice(),
          };
        }

        const targetMarketCap =
          this.getTotalMarketCap() * allocationTarget.weight;
        const marketCapDiff = targetMarketCap - stock.getMarketCap();

        if (Math.abs(marketCapDiff) <= tolerance) return undefined;

        return {
          ticker: stock.getTicker(),
          action: marketCapDiff > 0 ? 'buy' : 'sell',
          currentMarketCap: stock.getMarketCap(),
          targetMarketCap,
          currentPrice: stock.getCurrentPrice(),
        };
      })
      .filter((action) => action !== undefined);
  }
}
