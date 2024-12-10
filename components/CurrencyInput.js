const CurrencyField = ({ value, currency, availableCurrencies, onValueChange, onCurrencySelect }) => {
    return (
        <div className="fieldWrapper">
            <input
                type="number"
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
            />
            <select value={currency} onChange={(e) => onCurrencySelect(e.target.value)}>
                {availableCurrencies.map((currencyOption) => (
                    <option key={currencyOption} value={currencyOption}>
                        {currencyOption}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CurrencyField;
