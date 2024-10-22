import React, { useEffect, useState } from 'react';

const CurrencySelect = ({ selectedCurrency, handleCurrency }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch country data from the provided endpoint
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => setCountries(data));
  }, []);

  return (
    <div className="currency-select">
      <label className="block text-sm font-medium text-gray-700">Select Currency:</label>
      <select 
        onChange={handleCurrency} 
        value={selectedCurrency} 
        className='w-full p-2 bg-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
      >
        {countries.map(country => {
          const currencyCode = country.currencies ? Object.keys(country.currencies)[0] : '';
          return (
            <option 
              key={country.cca3} 
              value={currencyCode}
            >
              {country.name.common} ({currencyCode})
            </option>
          );
        })}
      </select>

      {/* Display flag of the selected currency */}
      <div className="selected-flag mt-2 flex items-center">
        {countries.map(country => {
          const currencyCode = country.currencies ? Object.keys(country.currencies)[0] : '';
          if (currencyCode === selectedCurrency) {
            return (
              <div key={country.cca3} className="flex items-center">
                <img
                  src={country.flags.png}
                  alt={`${country.name.common} flag`}
                  style={{ width: '30px', marginRight: '8px'  }}
                />
              </div>
            );
          }
          return null; 
        })}
      </div>
    </div>
  );
};

export default CurrencySelect;
