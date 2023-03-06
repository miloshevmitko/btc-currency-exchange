import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { exchangeRatesReducer } from './features/exchangeRates';

export function setupStore() {
  return configureStore({
    reducer: {
      exchangeRates: exchangeRatesReducer
    },
  });
}

export type AppStore = ReturnType<typeof setupStore>;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];

export type AppThunk<ReturnType = void, ExtraThunkArg = unknown> = ThunkAction<
  Promise<ReturnType>,
  RootState,
  ExtraThunkArg,
  Action<string>
>;

export const storeWrapper = createWrapper<AppStore>(setupStore);
