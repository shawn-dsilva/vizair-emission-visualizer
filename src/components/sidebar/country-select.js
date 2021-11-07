import React, {useState,useEffect} from 'react'
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';
import TimedError from './timed-error';


export default function CountrySelect({emissionType, setDatapoints, datapoints, countries, setCountries, }) {
    //Write logic to render all countries as dropdown options
    const [countryList, setCountryList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchCountryList();
        // fetchCountryData('Austria');
            countries.forEach((param) => {
                fetchCountryData(param);
            })
    }, [countries])


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
        if(countries.length !== 3) {
            fetchCountryData(selection.value);
            setCountries([...countries, selection.label])


            let url; 

            // if(!window.location.search) {
            //      url = new URL(window.location);
            //      url.searchParams.set('countries', selection.value);

            // } else {
            //     url = new URL(window.location.search);
            //     url.searchParams.append()
            // }
            url = new URL(window.location);
            url.searchParams.append('countries', selection.value);
            window.history.pushState({},'',url);

        } else {
            setErrorMessage("Maximum of 3 countries are allowed");
        }
        
    }
    
    // let options = makeCountryList();
    // const defaultOption = options[0];
    return(
        <div className="country-select">
            <label>Select From Available Countries</label>
            <Dropdown options={countryList}  onChange={onSelect} placeholder="Select a Country" />
            <p>You have selected  : {countries+" , "} </p>
            <TimedError errorMessage={errorMessage}/>

        </div>
    )
}