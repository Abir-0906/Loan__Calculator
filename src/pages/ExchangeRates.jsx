// ExchangeRates.jsx
import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TablePagination, Typography, Container
} from '@mui/material';
import axios from 'axios';

const ExchangeRates = () => {
  const [rates, setRates] = useState({});
  const [currencyKeys, setCurrencyKeys] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const API_KEY = ' cd3acbcb5e9ee7fe9e58ed3a';
  const BASE_URL = ` https://v6.exchangerate-api.com/v6/cd3acbcb5e9ee7fe9e58ed3a/latest/USD`;

  useEffect(() => {
    axios.get(BASE_URL)
      .then(response => {
        const data = response.data;
        setRates(data.conversion_rates || {});
        setCurrencyKeys(Object.keys(data.conversion_rates || {}));
      })
      .catch(err => console.error('Failed to fetch rates:', err));
  }, []);

  const slicedKeys = currencyKeys.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ bgcolor: 'background.paper', p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Live Exchange Rates (Base: USD)
        </Typography>
        <TableContainer>
        <Table>
  <TableHead>
    <TableRow>
      <TableCell sx={{ fontWeight: 'bold', width: '50%' }}>Currency</TableCell>
      <TableCell sx={{ fontWeight: 'bold', textAlign: 'right', width: '50%' }}>Rate</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {slicedKeys.map(code => (
      <TableRow key={code}>
        <TableCell sx={{ width: '50%' }}>{code}</TableCell>
        <TableCell sx={{ textAlign: 'right', width: '50%' }}>{rates[code]}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={currencyKeys.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(+e.target.value);
            setPage(0);
          }}
        />
      </Paper>
    </Container>
  );
};

export default ExchangeRates;
