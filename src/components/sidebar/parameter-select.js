import React, {useState, useEffect} from 'react'
import 'react-dropdown/style.css';
import TimedError from './timed-error';

export default function ParameterSelect({options, setOptions, datapoints, isLoading, setIsLoading}) {
    const [emissionTypes, setEmissionTypes] = useState([]);
    const [isCheckedObject, setIsCheckedObject] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        makeParamsList()
    }, [datapoints])

    const makeParamsList = () => {
        if(datapoints.length !== 0) {
        datapoints.forEach((country) => {
            country = Object.entries(country)[0][1];
            country.forEach( (emissionType) => {
                // Only adds EmissionType to List if not already present
                if(!emissionTypes.includes(Object.keys(emissionType)[0]) )
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
              <input type="checkbox" checked={isCheckedObject[emission]} onChange={ () => onChange(emission) }/>
              <label>{ emissionPrettyPrint }</label>
            </div>
            )
        })

        return checkBoxList;
    }

    const onChange = (selection) => {
            let countries = Object.keys(datapoints);
        // If selection is found in options, remove it (unchecked)
        // i.e deselect the option, else add the option ( checked )
        if(options.includes(selection)) {
            setOptions(options.filter(option => option !== selection));
            setIsCheckedObject({...isCheckedObject, [selection]: false})
            setIsLoading(true);
        } else if(countries.length >= 2 && options.length >= 3) {
            setErrorMessage("You can only chose 3 parameters if you have selected more than one country");
            setIsError(true);
            setIsCheckedObject({...isCheckedObject, [selection]: false})
            setIsError(false);

        } else {
            setOptions(currOptions => [...currOptions, selection]);
            setIsCheckedObject({...isCheckedObject, [selection]: true})
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
            <p>Your Selection : {options + " , "}</p>

            { setIsError && <TimedError errorMessage={errorMessage}/>}
        </div>
    )
}