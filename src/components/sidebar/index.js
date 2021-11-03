import React, {useState} from 'react';
import Graph from './graph';
import CountrySelect from './country-select';
import ParameterSelect from './parameter-select';
import YearRangeSelect from './year-range-select';

export default function Sidebar() {
  const [option, setOption] = useState('Carbon Dioxide (CO2)');
  const [country, setCountry] = useState();
  const [yearlyEmissionDataset, setYearlyEmissionDataset] = useState([])
  const [startYear, setStartYear] = useState(1990);
  const [endYear, setEndYear] = useState(2014);

  return (
    <div className="sidebar">
      <div className="dropdowns">
        <CountrySelect emissionType={option} setDatapoints={setYearlyEmissionDataset} datapoints={yearlyEmissionDataset}/>
         <ParameterSelect option={option} setOption={setOption} datapoints={yearlyEmissionDataset}/>
        <YearRangeSelect setStartYear={setStartYear} setEndYear={setEndYear}/>
      </div>
      {/* <Graph countryList={yearlyEmissionDataset} /> */}
    </div>
  );
}
