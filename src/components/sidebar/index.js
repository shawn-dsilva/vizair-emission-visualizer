import React, {useState} from 'react';
import Graph from './graph';
import CountrySelect from './country-select';
import ParameterSelect from './parameter-select';
import YearRangeSelect from './year-range-select';

export default function Sidebar() {
  const [option, setOption] = useState('Carbon Dioxide (CO2)');
  const [country, setCountry] = useState();
  const [yearlyEmissionDataset, setYearlyEmissionDataset] = useState([
      { 
        "United States of America": [
            {
                "2014": "5556006.57780565"
            },
            {
                "2013": "5502550.71398641"
            },
            {
                "2012": "5349220.94664921"
            },
            {
                "2011": "5559507.66443653"
            },
            {
                "2010": "5688756.00501015"
            },
            {
                "2009": "5488320.28042503"
            },
            {
                "2008": "5923201.37582301"
            },
            {
                "2007": "6121653.86307212"
            },
            {
                "2006": "6042393.61487176"
            },
            {
                "2005": "6122746.6118598"
            },
            {
                "2004": "6096978.36306809"
            },
            {
                "2003": "5982289.16712555"
            },
            {
                "2002": "5935738.78360961"
            },
            {
                "2001": "5894462.94151346"
            },
            {
                "2000": "5992438.03977823"
            },
            {
                "1999": "5818972.3854139"
            },
            {
                "1998": "5744672.1958021"
            },
            {
                "1997": "5704996.86860223"
            },
            {
                "1996": "5630113.71546884"
            },
            {
                "1995": "5441599.22972902"
            },
            {
                "1994": "5377492.21747199"
            },
            {
                "1993": "5284758.62020545"
            },
            {
                "1992": "5170274.35048577"
            },
            {
                "1991": "5064879.75034285"
            },
            {
                "1990": "5115095.04749812"
            }
        ]
    }
])
  const [startYear, setStartYear] = useState(1990);
  const [endYear, setEndYear] = useState(2014);

  return (
    <div className="sidebar">
      <div className="dropdowns">
        {/* <ParameterSelect option={option} setOption={setOption} /> */}
        <CountrySelect emissionType={option} setDatapoints={setYearlyEmissionDataset} datapoints={yearlyEmissionDataset}/>
        <YearRangeSelect setStartYear={setStartYear} setEndYear={setEndYear}/>
      </div>
      {/* <Graph countryList={yearlyEmissionDataset} /> */}
    </div>
  );
}
