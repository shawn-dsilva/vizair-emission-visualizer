import React, {useState,useEffect} from 'react'
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';
import TimedError from './timed-error';

const colors = [
    ['#ff0036', '#ff7390', '#ff91a9'],
    ['#0098ff', '#4fb8ff', '#86c5f0'],
    ['#ffc400','#ffce56', '#ffe5a6' ],
   ]

export default function CountrySelect({emissionType, setDatapoints, datapoints, countries, setCountries, }) {
    //Write logic to render all countries as dropdown options
    const [countryList, setCountryList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchCountryList();
        console.log(countries);
        // fetchCountryData('Austria');
        countries.forEach((param) => {
            fetchCountryData(param);
        });
    }, [countries])


    const fetchCountryList = () => {
        fetch('./json/byCountry/country-list.json')
        .then(response => response.json())
        .then(data => setCountryList(data));
    }

    const MakeCountryBadges = () => {
        return <div className="country-badge-container">
        { countries.map((country, index) => {
            return <span className="country-badge" style={{'backgroundColor':colors[index][0]}}onClick={() => removeCountry(country)}>{country}</span>
        })}
        </div> 
    }

    const removeCountry = (countryName) => {
        setCountries(countries.filter((country) => country !== countryName ));
        setDatapoints(datapoints.filter((country) => Object.keys(country)[0] !== countryName));
        const searchParams =  new URLSearchParams(window.location.search)

        // Option removed from URL when deselected
        const uriEncodedSelection = countryName.replace(" ","+");
        let paramsString = searchParams.toString();
        let newParams = paramsString.replace(`&countries=${uriEncodedSelection}`,'');

        window.history.pushState({},'','?'+newParams);
    }

    const fetchCountryData = (countryName) => {

        const index = datapoints.findIndex( (country) => Object.keys(country)[0] === countryName);
        console.log(index);
        if(index === -1) {
            fetch(`./json/byCountry/${countryName}.json`)
            .then(response => response.json())
            .then((newCountryData) => {
                let newCountryObject = {[countryName]: newCountryData}
                setDatapoints(currCountries => [...currCountries, newCountryObject])
            });
        }
        
    }
  
    const onSelect = (selection) => {
        const isPresent = countries.findIndex((country) => Object.keys(country)[0] === selection.label);
        console.log(isPresent)
        if(countries.includes(selection.value)) {
            removeCountry(selection.label);
        } else if(countries.length !== 3) {
            // fetchCountryData(selection.value);
            setCountries([...countries, selection.label])
            let url; 
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
            <p>You can select countries using the dropdown, to deselect any country just click on the country badge that appears under the dropdown or select the same country in the dropdown</p>
            <Dropdown options={countryList}  onChange={onSelect} placeholder="Select a Country" />
            <MakeCountryBadges/>
            <TimedError errorMessage={errorMessage}/>

        </div>
    )
}