export interface GetCryptoComparePriceMultiResponse {
  [key: string]: Record<string, number>;
}

export async function fetchGetCryptoComparePriceMulti(
  baseCurrencies: string[],
  quoteCurrencies: string[]
): Promise<GetCryptoComparePriceMultiResponse> {
  const urlSearchQuery = new URLSearchParams({
    fsyms: baseCurrencies.join(','),
    tsyms: quoteCurrencies.join(',')
  }).toString();
  const response = await fetch(`${process.env.cryptoCompareHost}${process.env.cryptoCompareDataPriceMultyEndpoint}?${urlSearchQuery}`, {
    method: 'GET',
    headers: {
      'Authorization': `Apikey ${process.env.cryptoCompareApiKey}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}