export default async () => {
  const provider = process.env.MARKET_DATA_PROVIDER || null;
  const hasApiKey = Boolean(process.env.MARKET_DATA_API_KEY);
  const hasBaseUrl = Boolean(process.env.MARKET_DATA_API_BASE_URL);
  const configured = Boolean(provider && hasApiKey && hasBaseUrl);

  return new Response(JSON.stringify({
    application: "Nusantara Wealth Terminal",
    connectionStatus: configured ? "CONFIGURED_ADAPTER_PENDING" : "NOT_CONNECTED",
    dataMode: "DEMO",
    provider,
    credentialsPresent: { apiKey: hasApiKey, baseUrl: hasBaseUrl },
    liveDataEnabled: false,
    message: configured
      ? "Credentials are present, but a provider-specific adapter and license validation are still required."
      : "No licensed market-data provider is connected. Simulated values must not be treated as live market data.",
    checkedAt: new Date().toISOString()
  }), {
    status: 200,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
  });
};
