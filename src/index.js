require("dotenv").config();
const axios = require("axios");

// Read API key from .env file
const EXCHANGE_RATE_API_KEY = process.env.EXCHANGE_RATE_API_KEY;

// 1st function - getExchangeRate with a new API
const getExchangeRate = async (fromCurrency, toCurrency) => {
  const response = await axios.get(
    `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/latest/${fromCurrency}`
  );

  const rate = response.data.conversion_rates[toCurrency];

  if (isNaN(rate)) {
    throw new Error(
      `Unable to get exchange rate from ${fromCurrency} to ${toCurrency}`
    );
  }

  return rate;
};

// 2nd function - getCountries with updated API
const getCountries = async (toCurrency) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/currency/${toCurrency}`
    );

    return response.data.map((country) => country.name.common).join(", ");
  } catch (error) {
    throw new Error(`Unable to get countries that use ${toCurrency}`);
  }
};

// 3rd function - convertCurrency
const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  try {
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    const countries = await getCountries(toCurrency);
    const convertedAmount = (amount * exchangeRate).toFixed(2);

    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend these in the following countries: ${countries}`;
  } catch (error) {
    console.error(error.message);
  }
};

// Call convert currency to get meaningful data
convertCurrency("USD", "CAD", 30)
  .then((message) => {
    if (message) {
      console.log(message);
    }
  })
  .catch((error) => {
    console.log(error.message);
  });
