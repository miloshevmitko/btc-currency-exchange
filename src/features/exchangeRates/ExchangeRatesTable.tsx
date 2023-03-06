import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TimelineIcon from '@mui/icons-material/Timeline';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import { ExchangeRateTrend } from '@take-home-task/constants';
import { formatToCurrency } from '@take-home-task/utils';
import translations from '@take-home-task/intl/en.json';
import ExchangeRatesHistoryViewModal from './ExchangeRatesHistoryViewModal';
import ExchangeRatesTableFooter from './ExchangeRatesTableFooter';
import { getClassNameFromExchangeRateTrend } from './utils';

export interface RowData {
  baseCurrency: string;
  quoteCurrency: string;
  latestPrice: {
    value: number;
    trend: ExchangeRateTrend;
  };
  averagePrice: number;
}

interface Props {
  rows: RowData[];
}

export default function ExchangeRatesTable({ rows }: Props) {
  const [isHistoryViewModalOpen, setIsHistoryViewModalOpen] = useState(false);
  const [historyViewModalCurrencyPair, setHistoryViewModalCurrencyPair] = useState<string>();

  function onClickTimelineIcon(event: React.MouseEvent<HTMLButtonElement>) {
    setHistoryViewModalCurrencyPair(event.currentTarget.dataset.currencyPair);
    setIsHistoryViewModalOpen(true);
  }

  function onCloseHistoryViewModal() {
    setHistoryViewModalCurrencyPair(undefined);
    setIsHistoryViewModalOpen(false);
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
        <Table size='small' aria-label='exchange rates table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>#</TableCell>
              <TableCell align='center' width={'22%'}>{translations.exchangeRates.table.baseCurrencyHeader}</TableCell>
              <TableCell align='center' width={'22%'}>{translations.exchangeRates.table.quoteCurrencyHeader}</TableCell>
              <TableCell align='right' width={'22%'}>{translations.exchangeRates.table.latestRateHeader}</TableCell>
              <TableCell align='right' width={'22%'}>{translations.exchangeRates.table.averageRateHeader}</TableCell>
              <TableCell align='center' width={'22%'}>{translations.exchangeRates.table.actionsHeader}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody aria-label='exchange rates table body'>
            {
              rows.map((row, index) => {
                const currencyPairKey = `${row.baseCurrency}${row.quoteCurrency}`;
                return (
                  <TableRow key={currencyPairKey} aria-label={currencyPairKey}>
                    <TableCell align='left'>{index + 1}</TableCell>
                    <TableCell align='center'>{row.baseCurrency}</TableCell>
                    <TableCell align='center'>{row.quoteCurrency}</TableCell>
                    <TableCell
                      align='right'
                      aria-label='latest price'
                      sx={{ fontWeight: 600 }}
                      className={getClassNameFromExchangeRateTrend(row.latestPrice.trend)}
                    >
                      {formatToCurrency(row.latestPrice.value, row.quoteCurrency)}
                    </TableCell>
                    <TableCell
                      align='right'
                      aria-label='average price'
                    >
                      {formatToCurrency(row.averagePrice, row.quoteCurrency)}
                    </TableCell>
                    <TableCell align='center'>
                      <Tooltip title={translations.exchangeRates.table.viewHistoricalDataTooltip}>
                        <IconButton
                          onClick={onClickTimelineIcon}
                          aria-label='open historical rates view'
                          data-currency-pair={currencyPairKey}
                        >
                          <TimelineIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
          <ExchangeRatesTableFooter />
        </Table>
      </TableContainer>
      <ExchangeRatesHistoryViewModal
        currencyPair={historyViewModalCurrencyPair}
        isOpen={isHistoryViewModalOpen}
        onClose={onCloseHistoryViewModal}
      />
    </>
  );
}