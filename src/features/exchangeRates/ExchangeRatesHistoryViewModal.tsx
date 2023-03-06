import React, { useMemo } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip  } from 'recharts';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAppSelector } from '@take-home-task/hooks';
import translations from '@take-home-task/intl/en.json';
import { getDataForHistoryViewModal } from './state/selectors';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 3,
};

interface HistoryChartData {
  timestamp: string;
  value: number;
}

interface Props {
  currencyPair?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExchangeRatesHistoryViewModal({
  currencyPair,
  isOpen,
  onClose
}: Props) {
  const baseCurrency = currencyPair?.substring(0, 3);
  const quoteCurrency = currencyPair?.substring(3, 6);
  const title = useMemo(() => {
    if (baseCurrency && quoteCurrency) {
      return translations.exchangeRates.historyViewModal.title
        .replace('{1}', baseCurrency)
        .replace('{2}', quoteCurrency);
    }
    return undefined;
  }, [baseCurrency, quoteCurrency]);
  const data: HistoryChartData[] = useAppSelector(getDataForHistoryViewModal(currencyPair ?? ''));

  return (
    <Modal
      aria-label='exchange rate history view modal'
      open={isOpen}
      onClose={onClose}
    >
      <Box sx={style}>
        <Typography variant='h6' component='h2' align='center'>
          {title}
        </Typography>
        <LineChart width={552} height={400} data={data}>
          <Line type='monotone' dataKey='value' stroke='#8884d8' />
          <CartesianGrid stroke='#ccc' />
          <XAxis dataKey='timestamp' />
          <YAxis type='number' domain={[]} />
          <Tooltip />
        </LineChart>
      </Box>
    </Modal>
  );
}
