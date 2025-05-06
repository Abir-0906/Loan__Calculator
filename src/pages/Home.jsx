import React, { useState } from 'react';
import {
  Container, Typography, TextField, Button,
  Paper, useTheme
} from '@mui/material';

import { useCurrency } from '../context/CurrencyContext';
import useEMICalculator from '../hooks/useEmiCalculator';
import EmiResult from '../components/EmiResults';


const Home = () => {
  const [amount, setAmount] = useState('100000');
  const [rate, setRate] = useState('8.5');
  const [term, setTerm] = useState('5');
  const { emi, schedule, calculateEMI } = useEMICalculator();
  const { currency } = useCurrency();
  const theme = useTheme();

  const handleCalculate = () => {
    if (amount && rate && term) {
      calculateEMI(Number(amount), Number(rate), Number(term));
    }
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

      <EmiResult
        emi={emi}
        schedule={schedule}
        currency={currency}
        resetTable={() => calculateEMI(0, 0, 0)}
      />
    </Container>
  );
};

export default Home;
