import React from 'react';
import { getGeocode, getLatLng } from 'use-places-autocomplete';

const CountryList = ({
  countries,
  setCenter,
  setZoom,
  setSelectedCountry,
  setSelectedStore,
}) => {
  const handleCountrySelect = async (country) => {
    getGeocode({ address: country })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setCenter({ lat, lng });
        setZoom(6);
      })
      .catch((error) => console.log(error));

    setSelectedStore(null);
    setSelectedCountry(country);
  };

  return (
    <div class="country-list">
      {countries.map((country) => (
        <button onClick={() => handleCountrySelect(country)} key={country}>
          {country}
        </button>
      ))}
    </div>
  );
};

export default CountryList;
