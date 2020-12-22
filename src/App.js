import React from "react";
import { useState, useEffect } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  const getCountriesData = async () => {
    const response = await fetch("https://disease.sh/v3/covid-19/countries");
    const data = await response.json();
    const countries = data.map((country) => {
      return { name: country.country, value: country.countryInfo.iso2 };
    });

    setCountries(countries);
  };

  const onCountryChange = async (event) => {
    setCountry(event.target.value);
  };

  useEffect(() => {
    // async function
    getCountriesData();
  }, []);

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>;
            {countries.map((country) => {
              return <MenuItem value={country.value}>{country.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
