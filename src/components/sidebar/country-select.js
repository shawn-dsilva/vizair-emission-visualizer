import React, {useState,useEffect} from 'react'
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown'


export default function CountrySelect({emissionType, setDatapoints, datapoints}) {
    //Write logic to render all countries as dropdown options
    
    const EMISSION_TYPES = {
        
    'CO2': 'carbon_dioxide_co2_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent' , 
    'GHG1':'greenhouse_gas_ghgs_emissions_including_indirect_co2_without_lulucf_in_kilotonne_co2_equivalent', 
    'GHG2':'greenhouse_gas_ghgs_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent',
    'HFC':'hydrofluorocarbons_hfcs_emissions_in_kilotonne_co2_equivalent', 
    'CH4':'methane_ch4_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent', 
    'NF3':'nitrogen_trifluoride_nf3_emissions_in_kilotonne_co2_equivalent', 
    'N2O':'nitrous_oxide_n2o_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent', 
    'PFC':'perfluorocarbons_pfcs_emissions_in_kilotonne_co2_equivalent', 
    'SF6':'sulphur_hexafluoride_sf6_emissions_in_kilotonne_co2_equivalent', 
    'MIX':'unspecified_mix_of_hydrofluorocarbons_hfcs_and_perfluorocarbons_pfcs_emissions_in_kilotonne_co2_equivalent'
        
    }

    const [countryList, setCountryList] = useState([]);
    const [country, setCountry] = useState(['Australia']);

    useEffect(() => {
        makeCountryList(emissionType);
    }, [emissionType])

    // useEffect(() => {
    //     setDatapoints(countryList[0].value);
    // }, [countryList])

    const getEmissionData = (type) => {
        return fetch(`./json/${type}.json`)
            .then(response => response.json());
    };


    const makeCountryList = (emissionType) => {
        getEmissionData(EMISSION_TYPES[emissionType]).then( emissionData=> {
            let countries = []
            emissionData.forEach((emissionType) => {
                const labelValuePair = {'value': emissionType, 'label': Object.keys(emissionType)[0]}
                countries.push(labelValuePair);
            })
            console.log(countries[0].value);
            setCountryList(countries);
            // setDatapoints(countries[0].value);

        });
    }
   
    const onSelect = (selection) => {
        // setDatapoints(rawEmissionDataset[selection.value])
        setCountry(currCountries => [...currCountries, selection.label]);
        setDatapoints(currDatapoints => [...currDatapoints, selection.value]);
        console.log(selection.value);
    }
    
    // let options = makeCountryList();
    // const defaultOption = options[0];
    return(
        <div className="country-select">
            <label>Select From Available Countries</label>
            <Dropdown options={countryList} value={countryList[0]} onChange={onSelect} placeholder="Select a Country" />
            <span>Selected Countries : {country+" , "} </span>

        </div>
    )
}