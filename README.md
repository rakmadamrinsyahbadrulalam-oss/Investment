# Nusantara Wealth Terminal

Responsive Indonesian equity market and portfolio intelligence dashboard.

## Stack
- React + TypeScript + Vite
- Recharts
- Netlify static hosting

## Local development
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
```

## Netlify
Build command: `npm run build`
Publish directory: `dist`
Node version: `20`

The initial interface uses clearly labeled simulated data only. No live IDX feed is connected. A licensed market data provider and appropriate display/redistribution rights are required before live prices or scheduled refreshes can be enabled. Store provider credentials in Netlify environment variables, never in client-side source code.