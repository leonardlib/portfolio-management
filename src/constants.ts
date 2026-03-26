import { Stock } from './domain/stock';
import type { AllocationTarget } from './types';

export const HOLDINGS_MOCK: Stock[] = [
  new Stock('META', 8),
  new Stock('AAPL', 18),
  new Stock('MSFT', 4),
];

export const ALLOCATIONS_MOCK: AllocationTarget[] = [
  { ticker: 'META', weight: 40 },
  { ticker: 'AAPL', weight: 60 },
];
