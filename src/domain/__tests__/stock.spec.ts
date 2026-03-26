import { describe, expect, it } from 'vitest';

import { Stock } from '../stock';

describe('Stock', () => {
  it('resolves the current price', () => {
    const meta = new Stock('META', 8);
    const aapl = new Stock('AAPL', 18);
    const msft = new Stock('MSFT', 4);

    expect(meta.getCurrentPrice()).toBe(100);
    expect(aapl.getCurrentPrice()).toBe(50);
    expect(msft.getCurrentPrice()).toBe(250);
  });

  it('falls back to zero when the ticker has no known price', () => {
    const stock = new Stock('NFLX', 3);

    expect(stock.getCurrentPrice()).toBe(0);
  });

  it('calculates market cap as shares multiplied by the current price', () => {
    const stock = new Stock('MSFT', 4);

    expect(stock.getMarketCap()).toBe(1000);
  });
});
