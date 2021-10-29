import React, {useState} from 'react';
import Graph from './graph';
import CountrySelect from './country-select';
import ParameterSelect from './parameter-select';

export default function Sidebar() {
  const [option, setOption] = useState('Carbon Dioxide (CO2)');
  const [country, setCountry] = useState();
  const [yearlyEmissionDataset, setYearlyEmissionDataset] = useState()

  return (
    <div className="sidebar">
      <div className="dropdowns">
        <ParameterSelect option={option} setOption={setOption} />
        <CountrySelect emissionType={option} setDatapoints={setYearlyEmissionDataset} datapoints={yearlyEmissionDataset}/>
      </div>
      <Graph country={yearlyEmissionDataset} />
    </div>
  );
}
