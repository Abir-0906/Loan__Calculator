// src/pages/ErrorPage.js
import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ error }) => {
  const navigate = useNavigate();

  return (
    <Container sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h3" gutterBottom color="error">
        {error ? 'Something went wrong!' : '404 - Page Not Found'}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        {error?.message || "The page you're looking for doesn't exist or an unexpected error occurred."}
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')}>
        Go Home
      </Button>
    </Container>
  );
};

export default ErrorPage;
