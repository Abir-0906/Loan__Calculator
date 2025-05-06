// src/components/EmiResult.jsx
import React from 'react';
import {
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useTheme
} from '@mui/material';
import { currencySymbols } from '../constants/currencySymbols';

const exchangeRatesMock = {
  USD: 1,
  INR: 84.4,
  EUR: 0.91,
  GBP: 0.79,
  JPY: 151.5,
  AUD: 1.51,
  CAD: 1.36
};

const EmiResult = ({ emi, schedule, currency, updateCurrency, resetTable }) => {
  const theme = useTheme();

  const convertCurrency = (value) => {
    const rate = exchangeRatesMock[currency] || 1;
    return (value * rate).toFixed(2);
  };

  const getSymbol = (code) => {
    return currencySymbols[code] || code + ' ';
  };

  return (
    <>
      {emi > 0 && (
        <Paper sx={{ p: 3, mb: 4, backgroundColor: theme.palette.background.paper }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
          >
            <Typography variant="h6" align="center" sx={{ flexGrow: 1 }}>
              Monthly EMI: {getSymbol(currency)}{convertCurrency(emi)}
            </Typography>

            <Button
              onClick={resetTable}
              variant="outlined"
              sx={{ borderColor: '#b39ddb', color: '#b39ddb', ml: 2 }}
            >
              RESET TABLE
            </Button>
          </div>

          <FormControl sx={{ mt: 2 }}>
            <InputLabel>Currency</InputLabel>
            <Select
              value={currency}
              label="Currency"
              onChange={(e) => updateCurrency(e.target.value)}
              sx={{ width: 120 }}
            >
              {Object.keys(currencySymbols).map((curr) => (
                <MenuItem key={curr} value={curr}>
                  {curr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography sx={{ mt: 2 }}>
            Converted EMI: <strong>{getSymbol(currency)}{convertCurrency(emi)}</strong>
          </Typography>
        </Paper>
      )}

      {schedule.length > 0 && (
        <Paper sx={{ overflow: 'hidden', backgroundColor: theme.palette.background.paper }}>
          <Typography variant="h6" sx={{ p: 2 }}>
            Amortization Schedule ({currency})
          </Typography>
          <div style={{ maxHeight: '400px', overflow: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>Principal</TableCell>
                  <TableCell>Interest</TableCell>
                  <TableCell>Remaining Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedule.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.month}</TableCell>
                    <TableCell>
                      {getSymbol(currency)}{convertCurrency(item.principal)}
                    </TableCell>
                    <TableCell>
                      {getSymbol(currency)}{convertCurrency(item.interest)}
                    </TableCell>
                    <TableCell>
                      {getSymbol(currency)}{convertCurrency(item.balance)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Paper>
      )}
    </>
  );
};

export default EmiResult;
