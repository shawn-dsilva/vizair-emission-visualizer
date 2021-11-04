import React, {useState,useEffect} from 'react'
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown'


export default function CountrySelect({emissionType, setDatapoints, datapoints}) {
    //Write logic to render all countries as dropdown options
    const [countryList, setCountryList] = useState([]);
    const [country, setCountry] = useState([]);

    useEffect(() => {
        fetchCountryList();
    }, [])


    const fetchCountryList = () => {
        fetch('./json/byCountry/country-list.json')
        .then(response => response.json())
        .then(data => setCountryList(data));
    }


    const fetchCountryData = (countryName) => {
        fetch(`./json/byCountry/${countryName}.json`)
        .then(response => response.json())
        .then((newCountryData) => {
            let newCountryObject = {[countryName]: newCountryData}
            setDatapoints(currCountries => [...currCountries, newCountryObject])
        });
    }
  
    const onSelect = (selection) => {
        fetchCountryData(selection.value);
        setCountry(selection.label)
    }
    
    // let options = makeCountryList();
    // const defaultOption = options[0];
    return(
        <div className="country-select">
            <label>Select From Available Countries</label>
            <Dropdown options={countryList}  onChange={onSelect} placeholder="Select a Country" />
            <p>You have selected  : {country+" , "} </p>

        </div>
    )
}