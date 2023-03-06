import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { DateTimeRange } from '@take-home-task/features/dateTimeRange';
import { useAppDispatch, useAppSelector } from '@take-home-task/hooks';
import translations from '@take-home-task/intl/en.json';
import { getAvgRateDates } from './state/selectors';
import { setAvgRateDates } from './state/slice';

export default function ExchangeRatesTableSettings() {
  const dispatch = useAppDispatch();
  const { avgRateEndDate, avgRateStartDate } = useAppSelector(getAvgRateDates);
  const [avgRateEndDateLocal, setAvgRateEndDateLocal] = useState<Dayjs | null>(null);
  const [avgRateStartDateLocal, setAvgRateStartDateLocal] = useState<Dayjs | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(menuAnchorEl);

  const onClickSettingsButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAvgRateEndDateLocal(avgRateEndDate ? dayjs(avgRateEndDate) : null);
    setAvgRateStartDateLocal(avgRateStartDate ? dayjs(avgRateStartDate) : null);
    setMenuAnchorEl(event.currentTarget);
  };

  const onCloseMenu = () => {
    setAvgRateEndDateLocal(null);
    setAvgRateStartDateLocal(null);
    setMenuAnchorEl(null);
  }

  const onClickApplySettings = () => {
    dispatch(setAvgRateDates({
      avgRateEndDate: avgRateEndDateLocal ? avgRateEndDateLocal.valueOf() : null,
      avgRateStartDate: avgRateStartDateLocal ? avgRateStartDateLocal.valueOf() : null,
    }));
    onCloseMenu();
  }

  return (
    <>
      <Tooltip title={translations.exchangeRates.table.settings.menuBtnLabel}>
        <IconButton
          aria-label='open exchange rates settings'
          aria-haspopup='true'
          aria-expanded={isMenuOpen ? 'true' : undefined}
          aria-controls={isMenuOpen ? 'exchange-rates-settings-menu' : undefined}
          id='exchange-rates-settings-btn'
          onClick={onClickSettingsButton}
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Menu
        aria-label='exchange rates settings menu'
        id='exchange-rates-settings-menu'
        anchorEl={menuAnchorEl}
        open={isMenuOpen}
        onClose={onCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'exchange-rates-settings-btn',
        }}
      >
        <MenuItem>
          <Box>
            <Typography component='label'>
              {translations.exchangeRates.table.settings.avgRateDateTimeRangeLabel}
            </Typography>
            <DateTimeRange
              endDateProps={{
                label: translations.exchangeRates.table.settings.endDateDateTimeRangeLabel,
                value: avgRateEndDateLocal,
                onChange: setAvgRateEndDateLocal
              }}
              startDateProps={{
                label: translations.exchangeRates.table.settings.startDateDateTimeRangeLabel,
                value: avgRateStartDateLocal,
                onChange: setAvgRateStartDateLocal
              }}
            />
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={onClickApplySettings}>
          <Button variant='contained' fullWidth sx={{ textTransform: 'none' }}>
            {translations.exchangeRates.table.settings.applyBtnLabel}
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
}