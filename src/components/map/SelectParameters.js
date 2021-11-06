import React, { useEffect } from 'react'

function SelectParameters({year, setYear, emissionType, setEmissionType, setEmissionData}) {

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
    },[])

    return (
        <div>
            
        </div>
    )
}

export default SelectParameters
