import React, { useState } from 'react';
import {
  Container, Typography, TextField, Button, MenuItem,
  Select, FormControl, InputLabel, Table, TableHead,
  TableRow, TableCell, TableBody, Paper, useTheme
} from '@mui/material';

import { useCurrency } from '../context/CurrencyContext';
import useEMICalculator from '../hooks/useEmiCalculator';

const currencySymbols = { 
  USD: '$', 
  INR: '₹', 
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  AUD: 'A$',
  CAD: 'C$'
};

const exchangeRatesMock = { 
  USD: 1,
  INR: 84.4, 
  EUR: 0.91,
  GBP: 0.79,
  JPY: 151.5,
  AUD: 1.51,
  CAD: 1.36
};

const Home = () => {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const { emi, schedule, calculateEMI } = useEMICalculator();
  const { currency, updateCurrency } = useCurrency();
  const theme = useTheme();

  const handleCalculate = () => {
    if (amount && rate && term) {
      calculateEMI(Number(amount), Number(rate), Number(term));
    }
  };

  // Helper function to convert and format currency
  const convertCurrency = (value) => {
    return (value * exchangeRatesMock[currency]).toFixed(2);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Loan Calculator Dashboard
      </Typography>

      <Paper sx={{ p: 3, mb: 4, backgroundColor: theme.palette.background.paper }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
          <TextField
            label="Loan Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            error={!amount}
            helperText={!amount ? "Please enter loan amount" : ""}
          />
          <TextField
            label="Interest Rate (%)"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
            error={!rate}
            helperText={!rate ? "Please enter interest rate" : ""}
          />
          <TextField
            label="Term (Years)"
            type="number"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            required
            error={!term}
            helperText={!term ? "Please enter loan term" : ""}
          />
          <Button variant="contained" onClick={handleCalculate} disabled={!amount || !rate || !term}>
            Calculate
          </Button>
        </div>
      </Paper>

      {emi > 0 && (
        <Paper sx={{ p: 3, mb: 4, backgroundColor: theme.palette.background.paper }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography variant="h6" align="center" sx={{ flexGrow: 1 }}>
              Monthly EMI: {currencySymbols[currency]}{convertCurrency(emi)}
            </Typography>

            <Button
              onClick={() => {
                calculateEMI(0, 0, 0);
                setTimeout(() => calculateEMI(0, 0, 0), 0);
              }}
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
                <MenuItem key={curr} value={curr}>{curr}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography sx={{ mt: 2 }}>
            Converted EMI: <strong>{currencySymbols[currency]}{convertCurrency(emi)}</strong>
          </Typography>
        </Paper>
      )}

      {schedule.length > 0 && (
        <Paper sx={{ 
          overflow: 'hidden',
          backgroundColor: theme.palette.background.paper 
        }}>
          <Typography variant="h6" sx={{ p: 2 }}>
            Amortization Schedule ({currency})
          </Typography>
          <div style={{ 
            maxHeight: '400px',
            overflow: 'auto'
          }}>
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
                      {currencySymbols[currency]}{convertCurrency(item.principal)}
                    </TableCell>
                    <TableCell>
                      {currencySymbols[currency]}{convertCurrency(item.interest)}
                    </TableCell>
                    <TableCell>
                      {currencySymbols[currency]}{convertCurrency(item.balance)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Paper>
      )}
    </Container>
  );
};

export default Home;