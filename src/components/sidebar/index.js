import React, {useEffect, useState} from 'react';
import Graph from './graph';
import CountrySelect from './country-select';
import ParameterSelect from './parameter-select';
import YearRangeSelect from './year-range-select';

export default function Sidebar() {
  const [options, setOptions] = useState([]);
  const [country, setCountry] = useState([]);
  const [datapoints, setDatapoints] = useState([])
  const [startYear, setStartYear] = useState(1990);
  const [endYear, setEndYear] = useState(2014);
  const [isLoading, setIsLoading] = useState(false);


const getQuery = () => {
  const searchParams =  new URLSearchParams(window.location.search)
  console.log(searchParams.getAll('countries'));
  console.log(searchParams.getAll('emissions'));
  setCountry(searchParams.getAll('countries'));
  setOptions(searchParams.getAll('emissions'));
}

  useEffect( () => {
    getQuery();
  }, [])

  return (
    <div className="sidebar">
      <h1>Visualization Controls</h1>
      <div className="dropdowns">
        <CountrySelect countries={country} setCountries={setCountry} emissionType={options} setDatapoints={setDatapoints} datapoints={datapoints} />
         <ParameterSelect options={options} setOptions={setOptions} datapoints={datapoints} isLoading={isLoading} setIsLoading={setIsLoading}/>
        <YearRangeSelect setStartYear={setStartYear} setEndYear={setEndYear} startYear={startYear} endYear={endYear}/>
      </div>
      <Graph countryList={datapoints} options={options} startYear={startYear} endYear={endYear} isLoading={isLoading} setIsLoading={setIsLoading} country={country}  />
    </div>
  );
}
