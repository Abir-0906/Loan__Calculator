
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeContextProvider } from './context/ThemeContext.jsx'
import { CurrencyProvider } from './context/CurrencyContext.jsx'


createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
      <CurrencyProvider>
    <App />
    </CurrencyProvider>
    </ThemeContextProvider>
    
 
)
