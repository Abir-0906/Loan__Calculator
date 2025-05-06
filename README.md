

🔗 Live Demo
👉 https://loan-calculator-dusky.vercel.app/
Replace with your actual deployed link (Vercel/Netlify)

🛠️ Tech Stack
React JS

Material UI (MUI) – UI framework

Context API – Global state management (theme & currency)

Custom Hooks – EMI calculation, exchange rate fetching

ExchangeRate.host API – Real-time currency conversion

React Router – Routing with 404 & error handling

Vercel / Netlify – Deployment

✨ Features
✅ Loan EMI Calculator using standard financial formula
✅ Amortization Schedule with monthly breakdown
✅ Live Currency Conversion with over 160+ currencies
✅ Paginated Exchange Rate Table
✅ Light/Dark Mode Toggle
✅ Responsive Design (Mobile, Tablet, Desktop)
✅ Collapsible Navigation Bar on mobile
✅ 404 Not Found Page
✅ Error Boundary Page for runtime errors

📁 Folder Structure
bash
Copy
Edit
src/
├── components/        # Reusable UI components
├── context/           # Theme & Currency Contexts
├── constants/         # currencySymbols, etc.
├── hooks/             # useEmiCalculator, useExchangeRates
├── pages/             # Page-level components (Home, 404, etc.)
├── theme.js           # MUI Theme setup
├── App.jsx            # Main app routing & layout
└── index.js           # Entry point
🚀 Getting Started
1. Clone the repo
bash
Copy
Edit
git clone https://github.com/your-username/loan-calculator-app.git
cd loan-calculator-app
2. Install dependencies
bash
Copy
Edit
npm install
3. Run locally
bash
Copy
Edit
npm start
App will run on: http://localhost:3000

📌 Key Implementation Steps
EMI Formula Used:
EMI = [P × R × (1+R)^N] / [(1+R)^N – 1]
where:

P = principal loan amount

R = monthly interest rate (annual rate / 12 / 100)

N = number of monthly installments

1. Context Setup
CurrencyContext to track selected currency

ThemeContext to toggle light/dark mode

2. Custom Hooks
useEmiCalculator: Reusable EMI logic and amortization schedule

useExchangeRates: Fetches live exchange rates

3. Live Currency Conversion
Integrated ExchangeRate.host API

Automatically converts EMI & principal values to selected currency

4. Responsive UI
Built with MUI’s Grid, Box, useTheme, and useMediaQuery

Navigation adapts to mobile view (collapsible)

5. Theming
Light/dark theme switch with createTheme() and ThemeProvider

6. Routing
Configured with react-router-dom

404 Page for unmatched routes

ErrorBoundary to catch runtime UI errors

🌐 Deployment
You can deploy using:

Vercel

Netlify

GitHub Pages

Make sure to:

Build the app: npm run build

Link your GitHub repo on the deployment platform

Add the Live Demo link to the GitHub repo "About" section

🧪 Testing Checklist
Feature	Tested
EMI calculation	✅
Schedule Table	✅
Currency Conversion	✅
Mobile Responsiveness	✅
Theme Toggle	✅
404 Not Found Page	✅
Runtime Error Handling	✅
Live Deployment	✅

🧾 Commit Best Practices
Use descriptive commit messages:

vbnet
Copy
Edit
feat: add dark/light theme toggle
fix: handle exchange rate API failure
chore: update README with instructions
🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

📃 License
This project is open-source under the MIT License.