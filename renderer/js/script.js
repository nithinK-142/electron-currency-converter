const axios = require("axios");

const apiKey = "2f7990eddb50099a9ef605d3";
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/`;

// Currency conversion logic
const convertButton = document.getElementById("convert");
const result = document.getElementById("result");
const spinner = document.querySelector(".spinner-gear");

const convertCurrency = async () => {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const inputAmount = amount.value.trim();

  if (inputAmount === "") {
    result.innerText = "Please enter a valid amount.";
    return;
  }

  result.innerText = "";
  spinner.style.display = "inline-block";

  try {
    const response = await axios.get(`${apiUrl}${from}/${to}/${inputAmount}`);

    // console.log(response);

    const convertedAmount = response.data.conversion_result;

    setTimeout(() => {
      spinner.style.display = "none";
      result.innerText = `${inputAmount} ${from} = ${convertedAmount} ${to}`;
    }, 200);
  } catch (error) {
    // console.error(error);
    result.innerText = "Error: Unable to perform currency conversion.";
  }
};

document.addEventListener("DOMContentLoaded", function () {

  convertButton.addEventListener("click", convertCurrency);

  amount.addEventListener("keydown", (event) => {
    if (event.key === "Enter") convertCurrency();
  });
});