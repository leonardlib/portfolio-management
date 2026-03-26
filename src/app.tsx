import clsx from 'clsx';

import { Portfolio } from './domain/portfolio';
import type { AllocationTarget } from './types';
import { currencyFormatter, shareFormatter } from './utils/formatter';

const ALLOCATIONS_MOCK: AllocationTarget[] = [
  { ticker: 'META', weight: 40 },
  { ticker: 'AAPL', weight: 60 },
];

const portfolio = new Portfolio(ALLOCATIONS_MOCK);

const stocks = portfolio.getStocks();
const allocations = portfolio.getAllocations();
const totalMarketCap = portfolio.getTotalMarketCap();
const rebalancePlan = portfolio.getRebalancePlan();

const summaryCards = [
  {
    label: 'Total value',
    value: currencyFormatter(totalMarketCap),
    hint: 'Current market value of the portfolio',
  },
  {
    label: 'Holdings',
    value: stocks.length.toString(),
    hint: 'Active stock positions in the portfolio',
  },
  {
    label: 'Rebalance actions',
    value: rebalancePlan.length.toString(),
    hint: 'Trades needed to reach target weights',
  },
];

function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 lg:px-8 lg:py-16">
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/3 shadow-2xl shadow-black/20">
          <div className="grid gap-8 px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div>
              <p className="text-sm font-medium uppercase text-cyan-300">
                Fintual
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Portfolio management
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Review current holdings, compare them against target allocation,
                and identify the exact trades needed to move the portfolio back
                toward its intended distribution.
              </p>
            </div>

            <div className="grid gap-3 grid-cols-3">
              {summaryCards.map((card) => (
                <article
                  key={card.label}
                  className="rounded-2xl border border-white/10 bg-slate-900/80 p-4"
                >
                  <p className="text-sm text-slate-400">{card.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {card.value}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {card.hint}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Current holdings
                </p>
                <h2 className="mt-1 text-xl font-semibold text-white">
                  Positions in the portfolio
                </h2>
              </div>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-inset ring-white/10">
                {stocks.length} positions
              </span>
            </div>

            <ul role="list" className="mt-6 space-y-3">
              {stocks.map((stock) => (
                <li
                  key={stock.getTicker()}
                  className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/3 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-base font-semibold text-white">
                      {stock.getTicker()}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      {shareFormatter(stock.getShares())} shares
                    </p>
                  </div>
                  <div className="grid gap-1 text-left sm:text-right">
                    <p className="text-base font-semibold text-white">
                      {currencyFormatter(stock.getMarketCap())}
                    </p>
                    <p className="text-sm text-slate-400">
                      Price {currencyFormatter(stock.getCurrentPrice())}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <div className="grid gap-6">
            <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <p className="text-sm font-medium text-slate-400">
                Target allocation
              </p>
              <h2 className="mt-1 text-xl font-semibold text-white">
                Desired portfolio distribution
              </h2>

              <ul role="list" className="mt-6 space-y-3">
                {allocations.map((allocation) => (
                  <li
                    key={allocation.ticker}
                    className="rounded-2xl border border-white/10 bg-white/3 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-white">
                          {allocation.ticker}
                        </p>
                        <p className="mt-1 text-sm text-slate-400">
                          Target weight
                        </p>
                      </div>
                      <p className="text-lg font-semibold text-white">
                        {(allocation.weight * 100).toFixed(0)}%
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">
                Rebalance result
              </p>
              <h2 className="mt-1 text-xl font-semibold text-white">
                Trades to execute
              </h2>
            </div>
            <p className="text-sm text-slate-400">
              Sorted by the current portfolio state and target weights.
            </p>
          </div>

          {rebalancePlan.length > 0 ? (
            <ul role="list" className="mt-6 space-y-3">
              {rebalancePlan.map((action) => (
                <li
                  key={`${action.ticker}-${action.action}`}
                  className="rounded-2xl border border-white/10 bg-white/3 p-4"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <span
                          className={clsx(
                            'inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide',
                            {
                              'bg-emerald-400/10 text-emerald-300 ring-1 ring-inset ring-emerald-400/30':
                                action.action === 'buy',
                              'bg-rose-400/10 text-rose-300 ring-1 ring-inset ring-rose-400/30':
                                action.action === 'sell',
                            },
                          )}
                        >
                          {action.action}
                        </span>
                        <p className="text-base font-semibold text-white">
                          {action.ticker}
                        </p>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-400">
                        Move from {currencyFormatter(action.currentMarketCap)}{' '}
                        to {currencyFormatter(action.targetMarketCap)}.
                      </p>
                    </div>

                    <div className="grid gap-3 grid-cols-2">
                      <div className="rounded-2xl bg-slate-950/60 px-4 py-3">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Reference price
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {currencyFormatter(action.currentPrice)}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-slate-950/60 px-4 py-3 sm:col-span-2 lg:col-span-1">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Target value
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {currencyFormatter(action.targetMarketCap)}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200">
              The portfolio is already within the rebalance tolerance.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
