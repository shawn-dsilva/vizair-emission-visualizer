import React, {useState,useEffect} from 'react'
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown'


export default function YearRangeSelect({setStartYear, setEndYear, startYear, endYear}) {

    const createYearRange = (type) => {
        let max;
        let min;
        if(type==="start") {
             max = 2009;
             min = 1990;
        } else if (type === "end") {
            max = 2014;
            min = 1995
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
        setStartYear(selection);
    }

    const onSelectEnd = (selection) => {
        setEndYear(selection);
    }

    return (
        <div className='year-select'>
            <label>Choose A Time Period</label>
            <div className='year-select-flex'>
                <Dropdown className='year-select-dropdown' options={startYears}  onChange={onSelectStart}  placeholder="Select the Starting Year" />
                <Dropdown className='year-select-dropdown' options={endYears}  onChange={onSelectEnd} placeholder="Select the Ending Year" />
        </div>
        </div>
    )
}

