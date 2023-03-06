import React from 'react';
import type { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import type { DateTimeFieldProps } from '@mui/x-date-pickers/DateTimeField';

const dateTimeFieldStyles = {
  marginTop: 1
};

interface Props {
  endDateProps: DateTimeFieldProps<Dayjs>;
  startDateProps: DateTimeFieldProps<Dayjs>;
}

export default function DateTimeRange({
  endDateProps,
  startDateProps,
}: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <DateTimeField size='small' ampm={false} sx={dateTimeFieldStyles} {...startDateProps} />
        <DateTimeField size='small' ampm={false} sx={dateTimeFieldStyles} {...endDateProps} />
      </Box>
    </LocalizationProvider>
  );
}
