import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '@take-home-task/hooks';
import translations from '@take-home-task/intl/en.json';
import ExchangeRatesTable from './ExchangeRatesTable';
import ExchangeRatesTableSettings from './ExchangeRatesTableSettings';
import { getRowsForExchangeRatesTable } from './state/selectors';

export default function ExchangeRatesTableWrap() {
  const rows = useAppSelector(getRowsForExchangeRatesTable);

  return (
    <Box>
      <Paper>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant='h6'>
            {translations.exchangeRates.table.wrap.tableTitle}
          </Typography>
          <ExchangeRatesTableSettings />
        </Toolbar>
        <ExchangeRatesTable rows={rows} />
      </Paper>
    </Box>
  );
}
