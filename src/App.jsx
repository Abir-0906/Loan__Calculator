import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ExchangeRates from './pages/ExchangeRates';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import {ThemeContextProvider} from './context/ThemeContext';
import ErrorBoundary from './pages/ErrorBoundary';

function App() {
  return (
    <ThemeContextProvider>
       <ErrorBoundary>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exchange" element={<ExchangeRates />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<ErrorPage />} />

      </Routes>
    </Router>
    </ErrorBoundary>
    </ThemeContextProvider>
  );
}

export default App;
