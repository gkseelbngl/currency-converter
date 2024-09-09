const { getExchangeRate, getCountries } = require("../src/index");

test("getExchangeRate should return a number", async () => {
  const rate = await getExchangeRate("USD", "EUR");
  expect(typeof rate).toBe("number");
});

test("getCountries should return a string of country names", async () => {
  const countries = await getCountries("USD");
  expect(typeof countries).toBe("string");
});
