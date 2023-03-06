import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '@take-home-task/store';
import { fetchGetCryptoComparePriceMulti } from '../api';
import type { GetCryptoComparePriceMultiResponse } from '../api';

export const insertRatesThunk = createAsyncThunk<
  GetCryptoComparePriceMultiResponse | undefined,
  void,
  {
    dispatch: AppDispatch,
    state: RootState
  }
>(
  'exchangeRates/insertRates',
  async (_args, { getState }) => {
    try {
      const {
        exchangeRates: {
          baseCurrencies,
          quoteCurrencies
        }
      } = getState();
      const response = await fetchGetCryptoComparePriceMulti(baseCurrencies, quoteCurrencies);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);
