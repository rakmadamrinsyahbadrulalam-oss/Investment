# Real-time IDX market data integration

## Target
- IDX Composite (IHSG) index quote and intraday history
- Listed-equity quotes (last, change, volume, value, timestamp)
- Market capitalization per issuer and total market capitalization
- Target polling interval: 300 seconds (5 minutes), subject to vendor contract, rate limits and exchange entitlements

## Provider selection
Do not hard-code a vendor before commercial and technical due diligence. Obtain written proposals from IDX Data Services / authorized redistributors (initial candidates: RTI Infokom and IQ Plus) and compare:
1. Real-time entitlement for IDX index and all listed equities
2. Display rights for a web dashboard and permitted number/type of users
3. Derived-data rights for market capitalization and historical storage
4. API protocol, authentication, rate limits, symbol master and corporate-action adjustments
5. SLA, latency, uptime, support, fees and redistribution restrictions

A public website, unofficial endpoint, scraping or a retail terminal subscription is not a substitute for a licensed API entitlement.

## Netlify environment variables
Set in Netlify Site configuration > Environment variables:
- MARKET_DATA_API_BASE_URL
- MARKET_DATA_API_KEY

Never put credentials in VITE_ variables or client-side source. Never commit real credentials.

## Endpoints added
- `/.netlify/functions/market-status`: reports whether credential variables exist. This is not proof that credentials work or that live entitlements exist.
- `/.netlify/functions/market-snapshot`: intentionally returns NOT_LIVE until a provider-specific adapter is implemented and validated.

## Required normalized response (future adapter)
```json
{
  "status": "LIVE",
  "provider": "vendor-name",
  "market": "IDX",
  "asOf": "ISO-8601 timestamp with timezone",
  "delaySeconds": 0,
  "index": { "symbol": "COMPOSITE", "last": 0, "change": 0, "changePercent": 0 },
  "market": { "totalMarketCapIdr": 0, "currency": "IDR" },
  "quotes": [
    { "symbol": "BBCA", "last": 0, "change": 0, "changePercent": 0, "volume": 0, "valueIdr": 0, "sharesOutstanding": 0, "marketCapIdr": 0, "asOf": "ISO-8601 timestamp" }
  ]
}
```

The adapter must validate schema, timestamp freshness, symbol mapping, currency, corporate actions and entitlement. Market cap must use current eligible shares outstanding and a documented price convention. Missing, stale or inconsistent data must be rejected, never silently replaced with demo values.

## Rollout gates
1. Execute vendor contract and confirm real-time display/derived-data rights.
2. Receive API documentation and sandbox credentials.
3. Implement and test vendor adapter against vendor examples and exchange reference data.
4. Validate timestamp, latency, completeness, corporate actions and rate limits.
5. Add scheduled refresh/cache only after vendor limits are confirmed.
6. Display LIVE only when the latest successful payload passes validation; otherwise show DELAYED, STALE or UNAVAILABLE.
