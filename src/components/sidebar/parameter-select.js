import React, {useState, useEffect} from 'react'
import 'react-dropdown/style.css';
import TimedError from './timed-error';

export default function ParameterSelect({options, setOptions, datapoints, isLoading, setIsLoading}) {
    const [emissionTypes, setEmissionTypes] = useState([]);
    const [isCheckedObject, setIsCheckedObject] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const preCheck = () => {                
            let checkedObject = {};
            options.forEach((option) => {
                checkedObject[option] = true;
            })
            setIsCheckedObject(checkedObject);
        }
        preCheck();
        makeParamsList();
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
        // i.e deselect the option, add the option ( checked )
        if(options.includes(selection)) { // Uncheck if selected
            setOptions(options.filter(option => option !== selection));
            setIsCheckedObject({...isCheckedObject, [selection]: false})
            const searchParams =  new URLSearchParams(window.location.search)

            // Option removed from URL when deselected
            const uriEncodedSelection = selection.replace("/","%2F").replaceAll(" ","+").replaceAll("&","%26");
            let paramsString = searchParams.toString();
            let newParams = paramsString.replace(`&emissions=${uriEncodedSelection}`,'');
            console.log(uriEncodedSelection);
            window.history.pushState({},'','?'+newParams);

            setIsLoading(true);

        } else if(countries.length >= 2 && options.length >= 3) { // Error messages if conditions met
            setErrorMessage("You can only chose 3 parameters if you have selected more than one country");
            setIsError(true);
            setIsCheckedObject({...isCheckedObject, [selection]: false})

        } else { // check and add to options array and URL
            setOptions(currOptions => [...currOptions, selection]);
            setIsCheckedObject({...isCheckedObject, [selection]: true})
            const url = new URL(window.location);
            url.searchParams.append('emissions', selection);
            window.history.pushState({},'',url);
            setIsLoading(true);
        }
    }

    return(
        <div className="parameter-select">
            <label>Select Emission Type Dataset</label>
            <p>You can select and deselect emission types, not all of the selected countries will have the same emission types however, emission type checkboxes are loaded upon selecting a country</p>
            <div className='checkbox-container'>
                {makeCheckBoxList()}
            </div>

            <TimedError visible={isError} setVisible={setIsError} errorMessage={errorMessage}/>
        </div>
    )
}