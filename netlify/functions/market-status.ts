import type { Handler } from '@netlify/functions'

export const handler: Handler = async () => {
  const configured = Boolean(process.env.MARKET_DATA_API_BASE_URL && process.env.MARKET_DATA_API_KEY)
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
    body: JSON.stringify({
      providerConfigured: configured,
      connectionStatus: configured ? 'CONFIGURED_NOT_VALIDATED' : 'NOT_CONFIGURED',
      marketDataStatus: 'NOT_LIVE',
      targetRefreshSeconds: 300,
      supportedData: ['IDX_COMPOSITE', 'EQUITY_QUOTES', 'MARKET_CAP'],
      message: configured
        ? 'Credentials are present. A provider-specific adapter and entitlement validation are still required.'
        : 'No licensed market data provider credentials are configured.'
    })
  }
}
