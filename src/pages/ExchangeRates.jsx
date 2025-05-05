import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TablePagination, Typography, Box
} from '@mui/material';

const ExchangeRates = () => {
  const [rates, setRates] = useState({});
  const [currencyKeys, setCurrencyKeys] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Replace with your actual API key from ExchangeRate-API
  const API_KEY = 'cd3acbcb5e9ee7fe9e58ed3a';
  const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

  useEffect(() => {
    axios.get(BASE_URL)
      .then(res => {
        const data = res.data.conversion_rates || {};
        setRates(data);
        setCurrencyKeys(Object.keys(data).sort()); // Sort currency keys for consistent display
      })
      .catch(err => {
        console.error('Failed to fetch exchange rates:', err);
      });
  }, [API_KEY]); // Re-fetch if the API key changes (though unlikely in this setup)

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const slicedKeys = currencyKeys.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ width: '95%', margin: 'auto', mt: 3 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Live Exchange Rates (Base: USD)
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Currency</strong></TableCell>
              <TableCell align="right"><strong>Rate</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedKeys.map(code => (
              <TableRow key={code}>
                <TableCell component="th" scope="row">
                  {code}
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    {rates[code]}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5,10, 25, 50,100]}
        component="div"
        count={currencyKeys.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ExchangeRates;