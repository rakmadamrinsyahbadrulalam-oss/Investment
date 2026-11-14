import type { Handler } from '@netlify/functions'

export const handler: Handler = async () => {
  const configured = Boolean(process.env.MARKET_DATA_API_BASE_URL && process.env.MARKET_DATA_API_KEY)
  return {
    statusCode: configured ? 501 : 503,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
    body: JSON.stringify({
      status: 'NOT_LIVE',
      providerConfigured: configured,
      data: null,
      message: configured
        ? 'Provider credentials detected, but no vendor-specific adapter has been implemented or validated. No live data is returned.'
        : 'Live market data is unavailable. Configure a licensed provider and implement its adapter first.'
    })
  }
}
