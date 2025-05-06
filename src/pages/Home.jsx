import React, { useState } from 'react';
import {
  Container, Typography, TextField, Button, MenuItem,
  Select, FormControl, InputLabel, Table, TableHead,
  TableRow, TableCell, TableBody, Paper, useTheme, Grid, Box
} from '@mui/material';

import { useCurrency } from '../context/CurrencyContext';
import useEMICalculator from '../hooks/useEmiCalculator';

import currencySymbols from '../constants/currencySymbols';
import exchangeRates from '../constants/exchangeRates';

const Home = () => {
  const [amount, setAmount] = useState('100000');
  const [rate, setRate] = useState('8.5');
  const [term, setTerm] = useState('5');
  const { emi, schedule, calculateEMI } = useEMICalculator();
  const { currency, updateCurrency } = useCurrency();
  const theme = useTheme();

  const handleCalculate = () => {
    if (amount && rate && term) {
      calculateEMI(Number(amount), Number(rate), Number(term));
    }
  };

  const handleReset = () => {
    calculateEMI(0, 0, 0);
  };

  const convertCurrency = (value) =>
    (value * exchangeRates[currency]).toFixed(2);

  const renderTextField = (label, value, setValue, errorMsg) => (
    <TextField
      label={label}
      type="number"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required
      error={!value}
      helperText={!value ? errorMsg : ""}
      fullWidth
    />
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Loan Calculator Dashboard
      </Typography>

      {/* Input Section */}
      <Paper sx={{ p: 3, mb: 4, backgroundColor: theme.palette.background.paper }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            {renderTextField("Loan Amount", amount, setAmount, "Please enter loan amount")}
          </Grid>
          <Grid item xs={12} sm={4}>
            {renderTextField("Interest Rate (%)", rate, setRate, "Please enter interest rate")}
          </Grid>
          <Grid item xs={12} sm={4}>
            {renderTextField("Term (Years)", term, setTerm, "Please enter loan term")}
          </Grid>
          <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={handleCalculate}
              disabled={!amount || !rate || !term}
              sx={{ minWidth: '200px' }}
            >
              Calculate
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* EMI Summary Section */}
      {emi > 0 && (
        <Paper sx={{ p: 3, mb: 4, backgroundColor: theme.palette.background.paper }}>
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2
          }}>
            <Typography variant="h6">
              Monthly EMI: {currencySymbols[currency]}{convertCurrency(emi)}
            </Typography>
            <Button
              onClick={handleReset}
              variant="outlined"
              sx={{ borderColor: '#b39ddb', color: '#b39ddb' }}
            >
              RESET TABLE
            </Button>
          </Box>

          <FormControl sx={{ mt: 2 }} size="small">
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

      {/* Amortization Schedule */}
      {schedule.length > 0 && (
        <Paper sx={{ overflow: 'hidden', backgroundColor: theme.palette.background.paper }}>
          <Typography variant="h6" sx={{ p: 2 }}>
            Amortization Schedule ({currency})
          </Typography>
          <Box sx={{ maxHeight: '400px', overflow: 'auto' }}>
            <Table stickyHeader size="small">
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
                    <TableCell>{currencySymbols[currency]}{convertCurrency(item.principal)}</TableCell>
                    <TableCell>{currencySymbols[currency]}{convertCurrency(item.interest)}</TableCell>
                    <TableCell>{currencySymbols[currency]}{convertCurrency(item.balance)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default Home;
