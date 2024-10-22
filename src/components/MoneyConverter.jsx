import { useEffect, useState } from 'react';
import { FaArrowRightArrowLeft } from "react-icons/fa6"; 
import CurrencySelect from './currencySelect/CurrencySelect'; 

const MoneyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState("BDT");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState("");

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getExchangeRate = async () => {
    const API_KEY = import.meta.env.VITE_API_KEY; 
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;

    setIsLoading(true);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw Error("Something went wrong!");

      const data = await response.json();
      const rate = (data.conversion_rate * amount).toFixed(2);
      setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
      setConvertedAmount(rate); // Set the converted amount
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount > 0) {
      getExchangeRate();
    } else {
      setResult("Please enter a valid amount.");
    }
  };

  return (
    <div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
      <h2 className='mb-5 text-2xl font-semibold text-gray-700 text-center'>Currency Exchanger</h2>
      <form onSubmit={handleSubmit} className="converter-form">
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'>
          <div className='form-section'>
            <label className="form-label">From:</label>
            <CurrencySelect
              selectedCurrency={fromCurrency}
              handleCurrency={e => setFromCurrency(e.target.value)}
            />
          </div>
          <div className='flex justify-center'>
            <button
              type="button" // Change this to type="button" for swapping
              onClick={handleSwapCurrencies}
              className='p-2 mb-6 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300'>
              <FaArrowRightArrowLeft className='text-xl text-gray-700' />
            </button>
          </div>
          <div className='form-section'>
            <label className="form-label">To:</label>
            <CurrencySelect
              selectedCurrency={toCurrency}
              handleCurrency={e => setToCurrency(e.target.value)}
            />
          </div>
        </div>
        <div className='mt-4'>
          <label htmlFor="amount" className='block text-sm font-medium text-gray-700'>Amount:</label>
          <input
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            type="number"
            className='w-full p-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1'
            min="1"
            required
          />
        </div>
        <div className='mt-4'>
          <label htmlFor="convertedAmount" className='block text-sm font-medium text-gray-700'>Converted Amount:</label>
          <input
            value={convertedAmount || ""}
            readOnly
            type="text"
            className='w-full p-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1 bg-gray-100'
          />
        </div>
        <div className='flex justify-end mt-6'>
          <button
            className={`px-5 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isLoading ? "animate-pulse" : ""}`}
            type="submit">
            Convert
          </button>
        </div>
      </form>
      <p className="exchange-rate-result">{isLoading ? "Getting exchange rate..." : result}</p>
    </div>
  );
};

export default MoneyConverter;
