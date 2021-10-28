import React from 'react'
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown'
import co2_emissions from '../../json/carbon_dioxide_co2_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent.json'

export default function CountrySelect() {
    //Write logic to render all countries as dropdown options
    
    let countries = []

    co2_emissions.forEach((emissionType) => {
        countries.push(Object.keys(emissionType)[0]);
    })
    
    
    const defaultOption = countries[0];
    console.log(co2_emissions);
    return(
        <div className="country-select">
            <label>Select Country</label>
            <Dropdown options={countries} value={defaultOption} placeholder="Select an option" />
        </div>
    )
}