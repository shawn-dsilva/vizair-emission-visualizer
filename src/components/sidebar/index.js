import React, {useEffect, useState} from 'react';
import Graph from './graph';
import CountrySelect from './country-select';
import ParameterSelect from './parameter-select';
import YearRangeSelect from './year-range-select';
import ErrorBoundary from './ErrorBoundary';

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
  if(searchParams.has('startYear')) {
    setStartYear(searchParams.getAll('startYear'));
  }
  if(searchParams.has('endYear')) {
    setEndYear(searchParams.getAll('endYear'));

  }

  setIsLoading(true);
}

  useEffect( () => {
    getQuery();
  }, [])

  return (
    <div className="sidebar">
      <h1>Visualization Controls</h1>
      <div className="dropdowns">
      <ErrorBoundary>
        <CountrySelect countries={country} setCountries={setCountry} emissionType={options} setDatapoints={setDatapoints} datapoints={datapoints} />
        </ErrorBoundary>

        <ErrorBoundary>
         <ParameterSelect options={options} setOptions={setOptions} datapoints={datapoints} isLoading={isLoading} setIsLoading={setIsLoading}/>
         </ErrorBoundary>
        <YearRangeSelect setStartYear={setStartYear} setEndYear={setEndYear} startYear={startYear} endYear={endYear}/>

      </div>

      <ErrorBoundary>
      <Graph countryList={datapoints} options={options} startYear={startYear} endYear={endYear} isLoading={isLoading} setIsLoading={setIsLoading} country={country}  />
      </ErrorBoundary>
    </div>
  );
}
