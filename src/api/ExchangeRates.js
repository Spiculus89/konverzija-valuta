import axios from "axios";

const apiUrl = `https://openexchangerates.org/api/latest.json`;

export const getExchangeRate = async (from, to) => {
  const { data } = await axios.get(apiUrl, {
    params: {
      app_id: process.env.REACT_APP_API_KEY,
      base: from,
      symbols: to,
    },
  });
  return data.rates[to];
};

export const getCurrencies = async () => {
  const { data } = await axios.get(apiUrl, {
    params: {
      app_id: process.env.REACT_APP_API_KEY,
    },
  });
  return Object.keys(data.rates);
};
