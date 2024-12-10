import { useState, useEffect } from "react"; 
import { format } from "date-fns"; 
import CurrencyField from "../components/CurrencyField"; 
import axios from "axios"; 

const API_KEY = "fb2eb2a78836932ede001c02792fec38"; 
const EXCHANGE_API = `http://data.fixer.io/api/latest?access_key=${API_KEY}`;

export default function CurrencyExchange() { 
  const [primaryAmount, setPrimaryAmount] = useState(1); 
  const [secondaryAmount, setSecondaryAmount] = useState(1); 
  const [primaryCurrency, setPrimaryCurrency] = useState("CAD"); 
  const [secondaryCurrency, setSecondaryCurrency] = useState("USD"); 
  const [exchangeRateData, setExchangeRateData] = useState(null); 

  useEffect(() => { 
    axios 
      .get(EXCHANGE_API) 
      .then((response) => setExchangeRateData(response.data.rates)) 
      .catch((error) => { 
        console.error(error); 
        setExchangeRateData(null); 
      }); 
  }, []);

  const formatCurrency = (number) => number.toFixed(2);

  const handlePrimaryAmountChange = (newAmount) => { 
    setSecondaryAmount( 
      formatCurrency((newAmount * exchangeRateData[secondaryCurrency]) / exchangeRateData[primaryCurrency]) 
    ); 
    setPrimaryAmount(newAmount); 
  };

  const handleSecondaryAmountChange = (newAmount) => { 
    setPrimaryAmount( 
      formatCurrency((newAmount * exchangeRateData[primaryCurrency]) / exchangeRateData[secondaryCurrency]) 
    ); 
    setSecondaryAmount(newAmount); 
  };

  const handlePrimaryCurrencyChange = (newCurrency) => { 
    setSecondaryAmount( 
      formatCurrency((primaryAmount * exchangeRateData[secondaryCurrency]) / exchangeRateData[newCurrency]) 
    ); 
    setPrimaryCurrency(newCurrency); 
  };

  const handleSecondaryCurrencyChange = (newCurrency) => { 
    setPrimaryAmount( 
      formatCurrency((secondaryAmount * exchangeRateData[primaryCurrency]) / exchangeRateData[newCurrency]) 
    ); 
    setSecondaryCurrency(newCurrency); 
  };

  useEffect(() => { 
    if (exchangeRateData) { 
      handlePrimaryAmountChange(1); 
    } 
  }, [exchangeRateData]);

  return (
    <div style={styles.container}>
      <h1>Currency Exchange</h1>
      <p className="exchangeRateText">
        {formatCurrency(secondaryAmount / primaryAmount)} {secondaryCurrency}
      </p>
      <div className="currencyFields" style={styles.currencyFields}>
        <CurrencyField
          value={primaryAmount}
          currency={primaryCurrency}
          availableCurrencies={Object.keys(exchangeRateData)}
          onValueChange={handlePrimaryAmountChange}
          onCurrencySelect={handlePrimaryCurrencyChange}
          style={styles.field}
        />
        <CurrencyField
          value={secondaryAmount}
          currency={secondaryCurrency}
          availableCurrencies={Object.keys(exchangeRateData)}
          onValueChange={handleSecondaryAmountChange}
          onCurrencySelect={handleSecondaryCurrencyChange}
          style={styles.field}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    padding: "20px",
    borderRadius: "10px",
    color: "white",
    maxWidth: "600px",
    margin: "0 auto",
  },
  currencyFields: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    gap: "20px",
  },
  field: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#333",
    border: "1px solid #555",
    borderRadius: "5px",
  },
};
