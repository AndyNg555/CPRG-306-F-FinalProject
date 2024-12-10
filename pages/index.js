import { useState, useEffect } from "react"; 
import { format } from "date-fns";
import CurrencyInputField from "../components/CurrencyInputField";
import axios from "axios";

const API_KEY = "fb2eb2a78836932ede001c02792fec38";
const EXCHANGE_API = `http://data.fixer.io/api/latest?access_key=${API_KEY}`;

export default function CurrencyConverter() {
  const [amountPrimary, setAmountPrimary] = useState(1);
  const [amountSecondary, setAmountSecondary] = useState(1);
  const [currencyPrimary, setCurrencyPrimary] = useState("CAD");
  const [currencySecondary, setCurrencySecondary] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(EXCHANGE_API)
      .then((response) => setExchangeRates(response.data.rates))
      .catch((error) => {
        console.error(error);
        setExchangeRates(null);
      });
  }, []);

  const formatToCurrency = (number) => number.toFixed(2);

  const handlePrimaryAmountChange = (newAmount) => {
    setAmountSecondary(
      formatToCurrency((newAmount * exchangeRates[currencySecondary]) / exchangeRates[currencyPrimary])
    );
    setAmountPrimary(newAmount);
  };

  const handleSecondaryAmountChange = (newAmount) => {
    setAmountPrimary(
      formatToCurrency((newAmount * exchangeRates[currencyPrimary]) / exchangeRates[currencySecondary])
    );
    setAmountSecondary(newAmount);
  };

  const handlePrimaryCurrencyChange = (newCurrency) => {
    setAmountSecondary(
      formatToCurrency((amountPrimary * exchangeRates[currencySecondary]) / exchangeRates[newCurrency])
    );
    setCurrencyPrimary(newCurrency);
  };

  const handleSecondaryCurrencyChange = (newCurrency) => {
    setAmountPrimary(
      formatToCurrency((amountSecondary * exchangeRates[currencyPrimary]) / exchangeRates[newCurrency])
    );
    setCurrencySecondary(newCurrency);
  };

  useEffect(() => {
    if (exchangeRates) {
      handlePrimaryAmountChange(1);
    }
  }, [exchangeRates]);

  return (
    <div>
      <h1>Currency Exchange Converter</h1>
      <p className="primaryCurrencyText">
        1 {currencyPrimary} equals
      </p>
      <p className="exchangeRateText">
        {formatToCurrency(amountSecondary / amountPrimary)} {currencySecondary}
      </p>
      <p className="date">{format(new Date(), "dd/MM/yyyy h:mm a")}</p>
      <CurrencyInputField
        value={amountPrimary}
        currencyType={currencyPrimary}
        availableCurrencies={Object.keys(exchangeRates)}
        onValueChange={handlePrimaryAmountChange}
        onCurrencySelect={handlePrimaryCurrencyChange}
      />
      <CurrencyInputField
        value={amountSecondary}
        currencyType={currencySecondary}
        availableCurrencies={Object.keys(exchangeRates)}
        onValueChange={handleSecondaryAmountChange}
        onCurrencySelect={handleSecondaryCurrencyChange}
      />
    </div>
  );
}
