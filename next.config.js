/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    cryptoCompareApiKey: 'ed9cb8018de348aac60f6e4e0f5b0afff6af735d592586b2e9a6f9712e37104c',
    cryptoCompareHost: 'https://min-api.cryptocompare.com',
    cryptoCompareDataPriceMultyEndpoint: '/data/pricemulti',
  },
  reactStrictMode: true,
}

module.exports = nextConfig
