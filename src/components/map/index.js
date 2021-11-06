import React, { useState } from 'react';
import SelectParameters from './SelectParameters';
import SvgGenerator from './SvgGenerator';
// import {ReactComponent as ZaWarudo} from './svg/zawarudo.svg';

export default function Map() {

  const[ year, setYear] = useState(2014);
  const[ emissionType, setEmissionType] = useState("carbon_dioxide_co2_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent")
  const[ emissionData, setEmissionData] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  return (
    //The code to render a map goes here.
    <div className="map">
      <h1> CO2 Emissions in {year} </h1>
      <SelectParameters year={year} setYear={setYear} emissionType={emissionType} setEmissionType={setEmissionType} emissionData={emissionData} setEmissionData={setEmissionData} />
      <SvgGenerator year={year} setYear={setYear} emissionType={emissionType} setEmissionType={setEmissionType} emissionData={emissionData} setEmissionData={setEmissionData} isLoading={isLoading} setIsLoading={setIsLoading}/>

    </div>
  );
}
