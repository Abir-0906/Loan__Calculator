// src/pages/ErrorPage.js
import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ error }) => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: { xs: 8, sm: 12 },
        px: { xs: 2, sm: 4 },
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        color="error"
        sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}
      >
        {error ? 'Something went wrong!' : '404 - Page Not Found'}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 4,
          fontSize: { xs: '1rem', sm: '1.1rem' },
          maxWidth: '90%',
        }}
      >
        {error?.message || "The page you're looking for doesn't exist or an unexpected error occurred."}
      </Typography>

      <Button
        variant="contained"
        size="large"
        onClick={() => navigate('/')}
        sx={{ textTransform: 'none', fontSize: { xs: '0.9rem', sm: '1rem' } }}
      >
        Go Home
      </Button>
    </Container>
  );
};

export default ErrorPage;

