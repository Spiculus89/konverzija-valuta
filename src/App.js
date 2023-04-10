import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [exchangeRates, setExchangeRates] = useState({});
  const [showTable, setShowTable] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [hideResults, setHideResults] = useState(false);

  const handleExchange = async () => {
    const response = await axios.get(
      `https://openexchangerates.org/api/latest.json?app_id=ce68380549634012ad80823f202c6358&base=${baseCurrency}&symbols=${targetCurrency}`
    );
    const rate = response.data.rates[targetCurrency];
    const convertedResult = amount * rate;
    setResult(convertedResult.toFixed(2));
    setHideResults(false)
  };

  const getRates = async () => {
    const exchangeRatesResponse = await axios.get(
      `https://openexchangerates.org/api/latest.json?app_id=ce68380549634012ad80823f202c6358&base=${baseCurrency}`
    );
    setExchangeRates(exchangeRatesResponse.data.rates);
    const keys = Object.keys(exchangeRatesResponse.data.rates);
    const currs = [...currencies, ...keys]
    setCurrencies(currs);
  }

  useEffect(() => {
    getRates()
  }, [])

  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
    setHideResults(true)
  };

  const handleTargetCurrencyChange = (event) => {
    setTargetCurrency(event.target.value);
    setHideResults(true)
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setHideResults(true)
  };

  const handleShowTable = () => {
    setShowTable(!showTable);
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-center font-bold text-2xl mb-8">
        Currency Exchange Rates
      </h1>
      <div className="flex justify-center items-center">
        <div className="mr-2">
          <label className="block font-bold mb-2" htmlFor="base-currency">
            From:
          </label>
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="base-currency"
            value={baseCurrency}
            onChange={handleBaseCurrencyChange}
          >
            <option value="USD">USD</option>
          </select>
        </div>
        <div className="mx-2">
          <label className="block font-bold mb-2" htmlFor="target-currency">
            To:
          </label>
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="target-currency"
            value={targetCurrency}
            onChange={handleTargetCurrencyChange}
          >
            {
              currencies.map((key)=><option value={key} key={key}>{key}</option>)
            }
          </select>
        </div>
        <div className="ml-2">
          <label className="block font-bold mb-2" htmlFor="amount">
            Amount:
          </label>
          <input
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            type="number"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleExchange}
        >
          Exchange
        </button>
        {!showTable ? (
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4 focus:outline-none focus:shadow-outline"
            onClick={handleShowTable}
          >
            Show Rates Table
          </button>
        ) : (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4 focus:outline-none focus:shadow-outline"
            onClick={handleShowTable}
          >
            Hide Rates Table
          </button>
        )}
      </div>
      {!hideResults ? (
        <div className="mt-4 text-center font-bold text-xl">
          {amount} {baseCurrency} = {result} {targetCurrency}
        </div>
      ) : null}
      {showTable && (
        <table className="table-auto mt-4 mx-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Currency</th>
              <th className="px-4 py-2">Exchange Rate</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(exchangeRates).map((currency) => (
              <tr key={currency}>
                <td className="border px-4 py-2">{currency}</td>
                <td className="border px-4 py-2">{exchangeRates[currency]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
