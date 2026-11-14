export default async () => {
  return new Response(JSON.stringify({
    status: "UNAVAILABLE",
    dataMode: "DEMO",
    liveDataEnabled: false,
    reason: "PROVIDER_ADAPTER_NOT_CONFIGURED",
    message: "A signed provider agreement, real-time display entitlement, and provider-specific API adapter are required before live market data can be served.",
    requiredFeeds: ["IDX_COMPOSITE_INDEX", "IDX_EQUITY_QUOTES", "SHARES_OUTSTANDING"],
    checkedAt: new Date().toISOString()
  }), {
    status: 503,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
  });
};
