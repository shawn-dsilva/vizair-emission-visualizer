import React, {useState,useEffect} from 'react'
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown'
import TimedError from './timed-error';

export default function YearRangeSelect({setStartYear, setEndYear, startYear, endYear}) {

    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if(Math.abs(startYear - endYear) < 6) {
            setStartYear(1990);
            setEndYear(2014);
        }
    },[startYear, endYear])

    const createYearRange = (type) => {
        let max;
        let min;
        if(type==="start") {
             max = 2014;
             min = 1990;
        } else if (type === "end") {
            max = 2014;
            min = 1999
        }

        let years = [];

        for(let i = min; i<=max; i++) {
            years.push(i);
        }
        return years
    }

    const startYears = createYearRange("start");
    const endYears = createYearRange("end");

    const onSelectStart = (selection) => {
        if(Math.abs(selection.value - endYear) < 6) {
            setErrorMessage(`Difference between ${selection.value} and ${endYear} is lesser than six, leave a gap of six years between start and end years for a proper chart to be drawn`)
            setIsError(true);
        } else {
            setStartYear(selection.value);
            let url = new URL(window.location);
            url.searchParams.set('startYear', selection.value);
            window.history.pushState({},'',url);
        }
       
    }

    const onSelectEnd = (selection) => {
        if(Math.abs(selection.value - endYear) < 6) {
            setErrorMessage(`Difference between ${startYear} and ${selection.value} is lesser than six, leave a gap of six years between start and end years for a proper chart to be drawn`)
            setIsError(true);
        } else {
            setEndYear(selection.value);
            let url = new URL(window.location);
            url.searchParams.set('endYear', selection.value);
            window.history.pushState({},'',url);
        }
    }

    return (
        <div className='year-select'>
            <label>Choose A Time Period</label>
            <p>Choose a starting and ending year, 1990( minimum ) to 2014( maximum ) are the defaults.</p>
            <p>If the starting and ending years from URL parameters have a difference of less than six, both are reset to default values</p>
            { isError && <TimedError errorMessage={errorMessage}/>}
            <div className='year-select-flex'>
                <Dropdown className='year-select-dropdown' options={startYears} value={startYear[0]}  onChange={onSelectStart}  placeholder="Select the Starting Year" />
                <Dropdown className='year-select-dropdown' options={endYears} value={endYear[0]} onChange={onSelectEnd} placeholder="Select the Ending Year" />
            </div>
        </div>
    )
}

