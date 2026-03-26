# Portfolio Management Module

This project is a small portfolio management UI built with React, TypeScript, Vite, and Tailwind CSS.

It models a portfolio of stock holdings, compares those holdings against a target allocation, and shows the rebalance actions required to move the portfolio toward that target.

## Live preview

https://leonardlib.github.io/portfolio-management/

## Project Structure

```text
src/
  App.tsx                Main dashboard UI
  domain/
    __tests__/
      portfolio.spec.ts  Portfolio domain tests
      stock.spec.ts      Stock domain tests
    portfolio.ts         Portfolio and rebalance logic
    stock.ts             Stock model
  types.ts               Shared types for allocations and actions
  utils/
    formatter.ts         Currency and share formatting helpers
```

## Run Locally

### Prerequisites

- Node.js
- npm

### Install Dependencies

```bash
npm install
```

### Start The Development Server

```bash
npm run dev
```

This starts the Vite development server with hot module replacement.

### Build For Production

```bash
npm run build
```

This runs TypeScript compilation and creates a production build in `dist/`.

### Preview The Production Build

```bash
npm run preview
```

### Run Linting

```bash
npm run lint
```

### Run Testing

```bash
npm run test
```
