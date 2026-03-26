import { HOLDINGS_MOCK } from '../constants';
import type { AllocationTarget, RebalanceAction } from '../types';
import type { Stock } from './stock';

export class Portfolio {
  private readonly stocks: Stock[];

  private readonly allocations: AllocationTarget[];

  constructor(allocations: AllocationTarget[]) {
    this.stocks = this.resolveStocks();
    this.allocations = this.normalizeAllocations(allocations);
  }

  private resolveStocks(): Stock[] {
    return HOLDINGS_MOCK;
  }

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

  getTotalMarketCap(): number {
    return this.stocks.reduce((sum, stock) => sum + stock.getMarketCap(), 0);
  }

  getRebalancePlan(tolerance = 0.1): RebalanceAction[] {
    return this.stocks
      .map<RebalanceAction | undefined>((stock) => {
        const allocationTarget = this.allocations.find(
          (allocation) => stock.getTicker() == allocation.ticker,
        );

        if (!allocationTarget) return undefined;

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
