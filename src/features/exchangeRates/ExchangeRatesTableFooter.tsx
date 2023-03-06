import React, { useState } from 'react';
import MuiAlert from '@mui/material/Alert';
import type { AlertProps } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import { useAppDispatch, useAppSelector } from '@take-home-task/hooks';
import translations from '@take-home-task/intl/en.json';
import { getAvailableQuoteCurrencies } from './state/selectors';
import { insertQuoteCurrency } from './state/slice';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ExchangeRatesTableFooter() {
  const dispatch = useAppDispatch();
  const availableCurrencies = useAppSelector(getAvailableQuoteCurrencies);
  const [selectedQuoteCurrency, setSelectedQuoteCurrency] = useState<string>('');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  function onChangeAddQuoteCurrencySelect(event: SelectChangeEvent) {
    setSelectedQuoteCurrency(event.target.value);
  }

  function onClickAddQuoteCurrency() {
    if (selectedQuoteCurrency) {
      dispatch(insertQuoteCurrency(selectedQuoteCurrency));
      setIsSnackbarOpen(true);
      setSelectedQuoteCurrency('');
    }
  }

  function onCloseSnackbar(event?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }

    setIsSnackbarOpen(false);
  }

  return (
    <TableFooter>
      <TableRow>
        <TableCell />
        <TableCell colSpan={5}>
          <Box display='flex'>
            <FormControl size='small' sx={{ marginRight: '16px' }}>
              <InputLabel id='select-currency-label'>{translations.exchangeRates.table.footer.selectCurrencyLabel}</InputLabel>
              <Select
                labelId='select-currency-label'
                size='small'
                sx={{ width: 170 }}
                value={selectedQuoteCurrency}
                label={translations.exchangeRates.table.footer.selectCurrencyLabel}
                onChange={onChangeAddQuoteCurrencySelect}
              >
                <MenuItem value={''} />
                {
                  availableCurrencies.map((currency) => (
                    <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <Button
              aria-label='add quote currency'
              variant='outlined'
              disabled={!selectedQuoteCurrency}
              onClick={onClickAddQuoteCurrency}
              sx={{ textTransform: 'none' }}
            >
              {translations.exchangeRates.table.footer.addQuoteCurrencyLabel}
            </Button>
            <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={onCloseSnackbar}>
              <Alert severity='success' onClose={onCloseSnackbar} sx={{ width: '100%' }}>
                {translations.exchangeRates.table.footer.quoteCurrencyAddedNotification}
              </Alert>
            </Snackbar>
          </Box>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}