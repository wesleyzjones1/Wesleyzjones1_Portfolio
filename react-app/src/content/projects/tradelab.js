export default {
  slug: 'tradelab',
  title: 'TradeLab',
  tagline: 'A rules-based trading research system that explains every decision and never trades without approval.',
  summary:
    'A personal trading engine written in Python. Once a trading day it scans a broad market universe, ranks candidates with a written reason for each, and waits for a human to approve a name before it may ever be traded. From there it decides buy, hold, sell or avoid from explicit technical and fundamental rules under hard risk limits, records the full rule trace behind every call, and reports on itself. It runs on a simulated budget with paper trades; the live path exists but is off behind three independent switches.',

  status: 'in-progress',
  featured: true,
  year: '2026',
  role: 'Sole developer',
  category: 'Automation',

  tech: ['Python', 'SQLAlchemy', 'Alembic', 'FastAPI', 'Typer', 'pandas', 'Hypothesis', 'mypy', 'React', 'TypeScript', 'GitHub Actions'],
  cover: 'projects/tradelab.webp',
  repo: null, // private repository

  metrics: [
    { value: '900+', label: 'hermetic tests' },
    { value: '32k', label: 'lines of Python' },
    { value: '21', label: 'strategy files' },
    { value: '4', label: 'data providers' },
  ],

  highlights: [
    'One decision engine for backtests and live sessions: a backtest is a replay of the same daily pipeline, and a test asserts byte-identical decisions from identical starting state.',
    'No lookahead by construction. A decision for a session may only read data available at that close, fundamentals are filtered by filing date, and decision code never asks for today’s date; it asks an injected clock.',
    'Every rule evaluation is stored (name, inputs, threshold, actual value, pass or fail), so “why did it buy?” and “why did it not buy?” are equally answerable from the dashboard.',
    'Safe by default: paper mode, an approval gate checked in the order path itself, risk caps that configuration cannot widen, a kill switch checked inside the broker adapter, and an API with no route that can place an order. A test reads the OpenAPI schema to prove that last one.',
    'Append-only accounting with Decimal money. Property-based tests hold the ledger invariants, and golden decision traces pin every shipped strategy so a refactor cannot quietly move a trade.',
    'A React and TypeScript dashboard with nine tabs: portfolio and equity against the benchmark, the candidate review queue, holdings, trades, statistics, a searchable decision log, reports, strategy parameters and system health.',
  ],

  gallery: [
    {
      src: 'projects/tradelab/backtests.webp',
      caption: 'Saved backtests: every strategy release ranked on the same window, with in-sample and held-out results side by side.',
    },
    {
      src: 'projects/tradelab/run-detail.webp',
      caption: 'One run in detail: drawdown from peak, returns and risk, and the trades broken down by exit reason.',
    },
  ],

  sections: [
    {
      heading: 'Why I built it',
      body: [
        'I wanted to know whether a set of written-down rules could do better than guessing, and I wanted the answer to be auditable. That meant a system that can replay the past exactly as it would act in the present, keeps the reasoning for every trade, and refuses to touch real money until several deliberate steps have been taken.',
      ],
    },
    {
      heading: 'Architecture',
      bullets: [
        'Python 3.11 with SQLAlchemy and Alembic (CI checks that the migrations match the models), Pydantic settings and strategy schemas, a Typer command line and a FastAPI read-side API.',
        'Market data from Alpaca, fundamentals and sector codes from SEC EDGAR, macro series from FRED and listings from Nasdaq, behind a point-in-time cache so a replay sees exactly what was known at the time.',
        'Strategy families (dip-buying, channel breakout, dual momentum and a combined trigger) share every rule except the trigger, so they produce the same trace shape and pass the same parity tests. A strategy is a YAML file with published parameters and a content hash.',
        'Backtests run in isolated workspaces over a read-only market file, report progress live, and produce a self-contained HTML report; a tournament command ranks every strategy file on held-out data.',
        'The dashboard binds to localhost on purpose: it holds the portfolio, so it has no login and deliberately no way to place an order from a browser.',
      ],
    },
    {
      heading: 'Quality',
      body: [
        'Every push runs ruff, a strict mypy pass, the full suite with coverage, a migration check and a strategy load, plus a type-checked build of the dashboard. The suite is hermetic: nothing in CI holds a provider credential, so a test that reaches for the network fails there instead of passing locally and failing on a bad day.',
      ],
    },
    {
      heading: 'Status',
      body: [
        'Built to run itself once per trading day in paper mode, with a tuning loop documented well enough for an agent to follow. The live path writes risk-checked order tickets for an agent to execute through Robinhood’s Agentic Trading MCP server and reconciles the fills back into the book; arming it takes three independent switches. The repository is private; I am happy to walk through the design in an interview.',
      ],
    },
  ],
}
