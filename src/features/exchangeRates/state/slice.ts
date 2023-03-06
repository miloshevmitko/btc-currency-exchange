import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@take-home-task/store';
import { HYDRATE } from 'next-redux-wrapper';
import { insertRatesThunk } from './thunks';

export interface ExchangeRate {
  timestamp: number;
  value: number;
}

export interface ExchangeRatesSettings {
  avgRateEndDate: number | null;
  avgRateStartDate: number | null;
}

export interface ExchangeRatesState {
  baseCurrencies: string[];
  quoteCurrencies: string[];
  rates: Record<string, ExchangeRate[]>;
  settings: ExchangeRatesSettings;
}

const initialState: ExchangeRatesState = {
  baseCurrencies: ['BTC'],
  quoteCurrencies: ['HKD', 'EUR', 'USD'],
  rates: {},
  settings: {
    avgRateEndDate: null,
    avgRateStartDate: null,
  }
};

function insertBaseCurrencyReducer(state: ExchangeRatesState, action: PayloadAction<string>) {
  return {
    ...state,
    baseCurrencies: [...state.baseCurrencies, action.payload]
  };
}

function insertQuoteCurrencyReducer(state: ExchangeRatesState, action: PayloadAction<string>) {
  return {
    ...state,
    quoteCurrencies: [...state.quoteCurrencies, action.payload]
  };
}

function setAvgRateDatesReducer(
  state: ExchangeRatesState,
  action: PayloadAction<{ avgRateEndDate: number | null; avgRateStartDate: number | null }>
) {
  return {
    ...state,
    settings: {
      ...state.settings,
      avgRateEndDate: action.payload.avgRateEndDate,
      avgRateStartDate: action.payload.avgRateStartDate
    }
  }
}

const slice = createSlice({
  name: 'exchangeRates',
  initialState,
  reducers: {
    insertBaseCurrency: insertBaseCurrencyReducer,
    insertQuoteCurrency: insertQuoteCurrencyReducer,
    setAvgRateDates: setAvgRateDatesReducer,
  },
  extraReducers: (builder) => {
    builder.addCase<string, PayloadAction<RootState>>(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.exchangeRates,
      };
    });

    builder.addCase(insertRatesThunk.fulfilled, (state, action) => {
      if (action.payload === undefined) {
        console.warn('insertRatesThunk.fulfilled: Empty payload!');
        return;
      }

      // Note: Ideally the timestamp value should come from the ticker as part of the api response
      const exchangeRateTimestamp = Date.now();
      const rates = Object
        .entries(action.payload)
        .reduce<[string, ExchangeRate][]>((previousValue, currentValue) => {
          const [baseCurrency, rates] = currentValue;
          const nextValue: [string, ExchangeRate][] = Object
            .entries(rates)
            .map(([quoteCurrency, value]) => ([baseCurrency + quoteCurrency, { value, timestamp: exchangeRateTimestamp}]));
          return previousValue.concat(nextValue);
        }, [])
        .reduce((previousValue, currentValue) => {
          const [currencyPair, exchangeRate] = currentValue;
          return {
            ...previousValue,
            [currencyPair]: (previousValue[currencyPair] ?? []).concat(exchangeRate),
          };
        }, state.rates);

        return {
          ...state,
          rates
        };
    });
  },
});

export const {
  insertBaseCurrency,
  insertQuoteCurrency,
  setAvgRateDates,
} = slice.actions;

export default slice.reducer;
