import React, {useState, useEffect} from 'react'
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown'

export default function ParameterSelect({option, setOption, datapoints}) {
    //Write logic to render all countries as dropdown options
    // const emissionTypes = [
    //     {value:'CO2', label:'Carbon Dioxide (CO2)'}, 
    //     {value:'GHG1',label:'Greenhouse Gases (GHG) Type 1'}, 
    //     {value:'GHG2', label:'Greenhouse Gases (GHG) Type 2'},
    //     {value:'HFC', label:'Hydrofluorocarbons (HFC)'}, 
    //     {value:'CH4', label:'Methane (CH4)'}, 
    //     {value:'NF3', label:'Nitrogen Triflouride (NF3)'}, 
    //     {value:'N2O', label:'Nitrous Oxide (N2O)'}, 
    //     {value:'PFC', label:'Perflourocarbons (PFC)'}, 
    //     {value:'SF6', label:'Sulphur Hexaflouride (SF6)'}, 
    //     {value:'MIX', label:'Unspecified HFC & PFC Mix'}
    // ];

    const [emissionTypes, setEmissionTypes] = useState([]);

    useEffect(() => {
        makeParamsList()
    }, [datapoints])

    const makeParamsList = () => {
        console.log(datapoints);
        if(datapoints.length !== 0) {
        datapoints.forEach((country) => {
            country = Object.entries(country)[0][1];
            console.log(country);
            country.forEach( (emissionType) => {
                setEmissionTypes(currEmissionTypes => [...currEmissionTypes, Object.keys(emissionType)]);
            })
        })
        }

    }

    const onSelect = (selection) => {
        setOption(selection.value);
    }

    return(
        <div className="parameter-select">
            <label>Select Emission Type Dataset</label>
            <Dropdown options={emissionTypes} value={option} onChange={onSelect} placeholder="Select an Emission Type" />

            <span>Your Selection : {option}</span>
        </div>
    )
}