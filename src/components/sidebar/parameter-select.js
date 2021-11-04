import React, {useState, useEffect} from 'react'
import 'react-dropdown/style.css';

export default function ParameterSelect({options, setOptions, datapoints, isLoading, setIsLoading}) {
    const [emissionTypes, setEmissionTypes] = useState([]);

    useEffect(() => {
        makeParamsList()
    }, [datapoints])

    const makeParamsList = () => {
        if(datapoints.length !== 0) {
        datapoints.forEach((country) => {
            country = Object.entries(country)[0][1];
            country.forEach( (emissionType) => {
                setEmissionTypes(currEmissionTypes => [...currEmissionTypes, Object.keys(emissionType)[0]]);
            })
        })
        }

    }

    const makeCheckBoxList = () => {
       let  checkBoxList = emissionTypes.map( (emission,index) => {
           let emissionArray = emission.split('/');
           let emissionPrettyPrint = `${emissionArray[1]} (${emissionArray[0]})`;
            return (
            <div className="checkbox-item" key={index}>
              <input type="checkbox"  onChange={ () => onChange(emission) }/>
              <label>{ emissionPrettyPrint }</label>
            </div>
            )
        })

        return checkBoxList;
    }

    const onChange = (selection) => {

        // If selection is found in options, remove it (unchecked)
        // i.e deselect the option, else add the option ( checked )
        if(options.includes(selection)) {
            setOptions(options.filter(option => option !== selection));
            setIsLoading(true);
        } else {
            setOptions(currOptions => [...currOptions, selection]);
            setIsLoading(true);
        }
    }

    return(
        <div className="parameter-select">
            <label>Select Emission Type Dataset</label>
            {/* <Dropdown options={emissionTypes} value={option} onChange={onSelect} placeholder="Select an Emission Type" /> */}
            <div className='checkbox-container'>
                {makeCheckBoxList()}
            </div>
            <span>Your Selection : {options}</span>
        </div>
    )
}