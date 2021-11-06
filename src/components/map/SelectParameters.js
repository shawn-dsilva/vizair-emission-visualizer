import React, { useEffect } from 'react'
import Dropdown from 'react-dropdown';

function SelectParameters({year, setYear, emissionType, setEmissionType, setEmissionData}) {

    const createYearRange = () => {
        let max = 2014;
        let min = 1990;
        let years = [];

        for(let i = min; i<=max; i++) {
            years.push(i);
        }
        return years
    }

    useEffect(() => {
        const fetchEmissionData = () => {
            let filteredData = {};

            fetch(`./json/byEmission/${emissionType}.json`)
            .then(response => response.json())
            .then(data => {
                data.forEach( (country) => {
                    for( const key in country) {
                        let filteredDatum = country[key].filter( (yearValueObject) => {
                            // let thisYear = Object.entries(yearValueObject)[0][0];
                            // return parseInt(thisYear) === parseInt(year);
                            return yearValueObject[year] !== undefined;
                        })[0]

                        if(filteredDatum !== undefined) {
                            filteredData[key] = filteredDatum[year];
                        }

                    }
                })
                console.log(filteredData);
                setEmissionData(filteredData);
            });
        }
        fetchEmissionData();
    },[year])

    const onSelect = (selection) => {
        setYear(selection.value);
    }
    return (
        <div>
                <Dropdown className='single-year-select-dropdown' options={createYearRange()}  onChange={onSelect}  placeholder="Select the Starting Year" />       
      </div>
    )
}

export default SelectParameters
