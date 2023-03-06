import { fireEvent, screen, within } from '@testing-library/react';
import {
  getClassNameFromExchangeRateTrend,
  getRowsForExchangeRatesTable,
  insertRatesThunk
} from '@take-home-task/features/exchangeRates';
import { formatToCurrency, renderWithProvider } from '@take-home-task/utils';
import Home from '@take-home-task/pages/index';

describe('Home page', () => {
  it('should render the exchange rates table with correct values', async () => {
    // Render the Home page
    const { store } = renderWithProvider(<Home />);
    
    // Check the table is visible and empty (no rows)
    expect(screen.getByRole('heading', { name: /exchange rates/i })).toBeInTheDocument();
    const tableEl = screen.getByLabelText('exchange rates table');
    const tableBody = within(tableEl).getByLabelText('exchange rates table body');
    expect(tableBody).toBeInTheDocument();
    expect(within(tableBody).queryAllByRole('row').length).toBe(0);

    // Trigger async thunks to fetch data
    store.dispatch(insertRatesThunk());
    store.dispatch(insertRatesThunk());
    store.dispatch(insertRatesThunk());

    // Check the rows are rendered after the data fetch
    const tableRows = await within(tableBody).findAllByRole('row');
    const { rates } = store.getState().exchangeRates;
    const ratesKeys = Object.keys(rates);
    expect(tableRows.length).toBe(ratesKeys.length);

    // Check the data in the table is correctly displayed
    const rowsData = getRowsForExchangeRatesTable(store.getState());
    rowsData.forEach((rowData) => {
      const currencyPair = rowData.baseCurrency + rowData.quoteCurrency;
      const currentRow = within(tableBody).getByRole('row', { name: currencyPair });
      const latestPriceCell = within(currentRow).getByRole('cell', { name: 'latest price' });
      const avgPriceCell = within(currentRow).getByRole('cell', { name: 'average price' });

      expect(formatToCurrency(rowData.latestPrice.value, rowData.quoteCurrency)).toBe(latestPriceCell.textContent);
      expect(formatToCurrency(rowData.averagePrice, rowData.quoteCurrency)).toBe(avgPriceCell.textContent);
      expect(latestPriceCell.classList.contains(getClassNameFromExchangeRateTrend(rowData.latestPrice.trend))).toBeTruthy();
    });
  });

  it('should be possible to add new quote currency', async () => {
    // Render the Home page
    const { store } = renderWithProvider(<Home />);
    
    // Check the table is visible and empty (no rows)
    expect(screen.getByRole('heading', { name: /exchange rates/i })).toBeInTheDocument();
    const tableEl = screen.getByLabelText('exchange rates table');
    const tableBody = within(tableEl).getByLabelText('exchange rates table body');
    expect(tableBody).toBeInTheDocument();
    expect(within(tableBody).queryAllByRole('row').length).toBe(0);

    // Trigger async thunks to fetch data
    store.dispatch(insertRatesThunk());

    // Check the rows are rendered after the data fetch
    const tableRows = await within(tableBody).findAllByRole('row');
    const { rates } = store.getState().exchangeRates;
    expect(tableRows.length).toBe(Object.keys(rates).length);

    // Check Add Quote Currency button is disabled (because no currency is selected)
    const addQuoteCurrencyBtn = within(tableEl).getByLabelText('add quote currency');
    expect(addQuoteCurrencyBtn).toBeInTheDocument();
    expect(addQuoteCurrencyBtn).toBeDisabled();
    
    // Add new Quote Currency to the table
    const addQuoteCurrencySelect = within(tableEl).getByLabelText('Select currency');
    fireEvent.mouseDown(addQuoteCurrencySelect); // Open the select
    const quoteCurrenciesList = await screen.findByRole('listbox');
    const quoteCurrenciesOptions = within(quoteCurrenciesList).getAllByRole('option');
    const currencyToAdd = quoteCurrenciesOptions[1];
    fireEvent.click(currencyToAdd); // Select any currency except the first (the first option in the list is empty)
    expect(addQuoteCurrencyBtn).not.toBeDisabled(); // Button is clicable
    fireEvent.click(addQuoteCurrencyBtn);
    expect(addQuoteCurrencyBtn).toBeDisabled(); // Button is disabled after the currency is added

    // Trigger a new data fetch and check if the currency is added
    store.dispatch(insertRatesThunk());
    const newTableRowCell = await within(tableBody).findByRole('cell', { name: currencyToAdd.textContent as string });
    expect(newTableRowCell).toBeInTheDocument();
  });

  it('should be possible to view the exchange rate history for a currency', async () => {
    // Render the Home page
    const { store } = renderWithProvider(<Home />);
    
    // Check the table is visible and empty (no rows)
    expect(screen.getByRole('heading', { name: /exchange rates/i })).toBeInTheDocument();
    const tableEl = screen.getByLabelText('exchange rates table');
    const tableBody = within(tableEl).getByLabelText('exchange rates table body');
    expect(tableBody).toBeInTheDocument();
    expect(within(tableBody).queryAllByRole('row').length).toBe(0);

    // Trigger async thunks to fetch data
    store.dispatch(insertRatesThunk());

    // Check the rows are rendered after the data fetch
    const tableRows = await within(tableBody).findAllByRole('row');
    const { rates } = store.getState().exchangeRates;
    expect(tableRows.length).toBe(Object.keys(rates).length);

    // Open the history view
    const openHistoryViewBtn = within(tableRows[0]).getByLabelText('open historical rates view');
    fireEvent.click(openHistoryViewBtn);
    const historyViewModal = await screen.findByLabelText('exchange rate history view modal');
    expect(historyViewModal).toBeInTheDocument();
  });
});
