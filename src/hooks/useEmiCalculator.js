// src/hooks/useEMICalculator.js
import { useState } from 'react';

const useEMICalculator = () => {
  const [emi, setEmi] = useState(0);
  const [schedule, setSchedule] = useState([]);

  const calculateEMI = (P, annualRate, years) => {
    const N = years * 12;
    const R = annualRate / 12 / 100;

    const emiVal = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setEmi(emiVal.toFixed(2));

    const amortizationSchedule = [];
    let balance = P;

    for (let i = 1; i <= N; i++) {
      const interest = balance * R;
      const principal = emiVal - interest;
      balance -= principal;

      amortizationSchedule.push({
        month: i,
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        balance: balance > 0 ? balance.toFixed(2) : "0.00"
      });
    }

    setSchedule(amortizationSchedule);
  };

  return { emi, schedule, calculateEMI };
};

export default useEMICalculator;
