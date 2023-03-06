import dayjs from 'dayjs';
import { currencies, ExchangeRateTrend } from '@take-home-task/constants';
import { RootState } from '@take-home-task/store';
import { isNotNullOrUndefined } from '@take-home-task/utils';
import type { RowData } from '../ExchangeRatesTable';
import type { ExchangeRate } from './slice';

function getExchangeRateTrend(exchangeRates: ExchangeRate[]): ExchangeRateTrend {
  if (exchangeRates.length < 2) return ExchangeRateTrend.NO_CHANGE;

  const prevValue = exchangeRates[exchangeRates.length - 2].value;
  const currValue = exchangeRates[exchangeRates.length - 1].value;

  if (prevValue === currValue) return ExchangeRateTrend.NO_CHANGE;
  return currValue > prevValue ? ExchangeRateTrend.INCREASE : ExchangeRateTrend.DECREASE;
}

export function getRowsForExchangeRatesTable(state: RootState): RowData[] {
  const { avgRateEndDate, avgRateStartDate } = getAvgRateDates(state);
  const exchangesOfInterest = state.exchangeRates.baseCurrencies
    .map((baseCurrency) => state.exchangeRates.quoteCurrencies
      .map((quoteCurrency) => ({
        baseCurrency,
        quoteCurrency,
      }))
    )
    .flat();

  const rows = exchangesOfInterest.map(({ baseCurrency, quoteCurrency }) => {
    const currentPairRates = state.exchangeRates.rates[`${baseCurrency}${quoteCurrency}`];

    if (currentPairRates === undefined) {
      return;
    }

    const latestPriceValue = currentPairRates[currentPairRates.length - 1].value;
    const latestPriceTrend = getExchangeRateTrend(currentPairRates);
    const averagePriceReduce = currentPairRates.reduce<{ sum: number; count: number }>((previousValue, currentValue) => {
      const { value, timestamp } = currentValue;

      if (timestamp > (avgRateStartDate ?? 0) && timestamp < (avgRateEndDate ?? 9999999999999)) {
        previousValue.sum = previousValue.sum + value;
        previousValue.count = previousValue.count + 1;
      }

      return previousValue;
    }, { sum: 0, count: 0});
    const averagePrice = averagePriceReduce.sum / averagePriceReduce.count;

    return {
      baseCurrency,
      quoteCurrency,
      latestPrice: {
        value: latestPriceValue,
        trend: latestPriceTrend,
      },
      averagePrice
    };
  })
  .filter(isNotNullOrUndefined);

  return rows;
}

export function getDataForHistoryViewModal(currencyPair: string) {
  return function getDataForHistoryViewModalCallback(state: RootState) {
    if (state.exchangeRates.rates[currencyPair] === undefined) {
      return [];
    }

    return state.exchangeRates.rates[currencyPair].map((rate) => ({
      timestamp: dayjs(rate.timestamp).format('YYYY-MM-DD HH:mm:ss'),
      value: rate.value
    }));
  }
}

export function getAvailableQuoteCurrencies(state: RootState) {
  return currencies.filter((currency) => !state.exchangeRates.quoteCurrencies.includes(currency));
}

export function getAvgRateDates(state: RootState) {
  const {
    exchangeRates: {
      settings: {
        avgRateEndDate,
        avgRateStartDate,
      }
    }
  } = state;
  return {
    avgRateEndDate,
    avgRateStartDate,
  };
}