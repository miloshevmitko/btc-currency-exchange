import { rest } from 'msw';
import { generateRandomDecimalInRangeFormatted } from '@take-home-task/utils';

const GENERATE_PRICE_ARGS: [number, number, number] = [10000, 30000, 2];

export const handlers = [
  rest.get('/data/pricemulti', (req, res, ctx) => {
    const baseCurrencies = req.url.searchParams.get('fsyms')?.split(',') ?? [];
    const quoteCurrencies = req.url.searchParams.get('tsyms')?.split(',') ?? [];
    const response = baseCurrencies.reduce<Record<string, Record<string, number>>>((accumulator, baseCurrency) => {
      accumulator[baseCurrency] = quoteCurrencies.reduce<Record<string, number>>((accumulatorQuoteCurr, quoteCurrency) => {
        accumulatorQuoteCurr[quoteCurrency] = generateRandomDecimalInRangeFormatted(...GENERATE_PRICE_ARGS);
        return accumulatorQuoteCurr;
      }, {} as Record<string, number>);
      return accumulator;
    }, {} as Record<string, Record<string, number>>);

    return res(ctx.json(response));
  }),
];