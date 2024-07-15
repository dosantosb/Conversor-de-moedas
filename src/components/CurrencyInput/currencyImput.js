import React from "react";
import "./currencyInput.css";

const CurrencyInput = ({
  amount, // quantidade
  currency, // moeda
  onAmountChange, // valor alterado
  onCurrencyChange, // mudança de moeda
  currencies, // moedas
}) => {
  return (
    <div className="Container-input">

      <input
        type="number"
        value={amount}
        onChange={(e) => onAmountChange(parseFloat(e.target.value))}
      />
      <select
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyInput;
