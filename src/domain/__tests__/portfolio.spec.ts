import { describe, expect, it } from 'vitest';

import { Portfolio } from '../portfolio';

describe('Portfolio', () => {
  it('normalizes allocation weights into percentages of the total target weight', () => {
    const portfolio = new Portfolio([
      { ticker: 'META', weight: 40 },
      { ticker: 'AAPL', weight: 60 },
    ]);

    expect(portfolio.getAllocations()).toEqual([
      { ticker: 'META', weight: 0.4 },
      { ticker: 'AAPL', weight: 0.6 },
    ]);
  });

  it('calculates the total market cap from all resolved holdings', () => {
    const portfolio = new Portfolio([
      { ticker: 'META', weight: 40 },
      { ticker: 'AAPL', weight: 60 },
    ]);

    expect(portfolio.getTotalMarketCap()).toBe(2700);
  });

  it('creates buy and sell actions based on the target allocation', () => {
    const portfolio = new Portfolio([
      { ticker: 'META', weight: 40 },
      { ticker: 'AAPL', weight: 60 },
    ]);

    expect(portfolio.getRebalancePlan()).toEqual([
      {
        ticker: 'META',
        action: 'buy',
        currentMarketCap: 800,
        targetMarketCap: 1080,
        currentPrice: 100,
      },
      {
        ticker: 'AAPL',
        action: 'buy',
        currentMarketCap: 900,
        targetMarketCap: 1620,
        currentPrice: 50,
      },
      {
        ticker: 'MSFT',
        action: 'sell',
        currentMarketCap: 1000,
        targetMarketCap: 0,
        currentPrice: 250,
      },
    ]);
  });

  it('returns no actions when each holding is already within tolerance', () => {
    const portfolio = new Portfolio([
      { ticker: 'META', weight: 800 },
      { ticker: 'AAPL', weight: 900 },
      { ticker: 'MSFT', weight: 1000 },
    ]);

    expect(portfolio.getRebalancePlan()).toEqual([]);
  });

  it('sells holdings that are not part of the target allocation', () => {
    const portfolio = new Portfolio([{ ticker: 'META', weight: 100 }]);

    expect(portfolio.getRebalancePlan()).toEqual([
      {
        ticker: 'META',
        action: 'buy',
        currentMarketCap: 800,
        targetMarketCap: 2700,
        currentPrice: 100,
      },
      {
        ticker: 'AAPL',
        action: 'sell',
        currentMarketCap: 900,
        targetMarketCap: 0,
        currentPrice: 50,
      },
      {
        ticker: 'MSFT',
        action: 'sell',
        currentMarketCap: 1000,
        targetMarketCap: 0,
        currentPrice: 250,
      },
    ]);
  });
});
