const CurrencyInputField = ({ value, currencyType, availableCurrencies, onValueChange, onCurrencySelect }) => {
    return (
        <div className="wrapper">
            <input
                type="number"
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
            />
            <select value={currencyType} onChange={(e) => onCurrencySelect(e.target.value)}>
                {availableCurrencies.map((currency) => (
                    <option key={currency} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CurrencyInputField;
