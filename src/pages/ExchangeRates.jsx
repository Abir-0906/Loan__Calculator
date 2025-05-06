import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TablePagination, Typography, Container, Box
} from '@mui/material';
import axios from 'axios';

const ExchangeRates = () => {
  const [rates, setRates] = useState({});
  const [currencyKeys, setCurrencyKeys] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;
  //const API_KEY= 'cd3acbcb5e9ee7fe9e58ed3a' ;
  const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;
 

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
    <Container maxWidth="lg" sx={{ mt: 4, px: { xs: 2, sm: 4 } }}>
      <Paper elevation={3} sx={{
        bgcolor: 'background.paper',
        p: { xs: 2, sm: 3 },
        width: '100%', // Ensure Paper takes full width
      }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
          Live Exchange Rates (Base: USD)
        </Typography>

        <Box sx={{ overflowX: 'auto', width: '100%' }}>
          <TableContainer sx={{ width: '100%' }}>
            <Table size="small" sx={{ width: '100%' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '1rem', sm: '1.2rem' },
                    py: { xs: 1, sm: 2 }
                  }}>
                    Currency
                  </TableCell>
                  <TableCell sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '1rem', sm: '1.2rem' },
                    textAlign: 'right',
                    py: { xs: 1, sm: 2 }
                  }}>
                    Rate
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slicedKeys.map(code => (
                  <TableRow key={code}>
                    <TableCell sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem' }, py: { xs: 1, sm: 2 } }}>
                      {code}
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem' }, textAlign: 'right', py: { xs: 1, sm: 2 } }}>
                      {rates[code]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={currencyKeys.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(+e.target.value);
            setPage(0);
          }}
          sx={{
            mt: 2,
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              fontSize: { xs: '0.8rem', sm: '0.95rem' }
            }
          }}
        />
      </Paper>
    </Container>
  );
};

export default ExchangeRates;
