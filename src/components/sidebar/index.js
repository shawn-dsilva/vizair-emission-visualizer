import React, {useState} from 'react';
import Graph from './graph';
import CountrySelect from './country-select';
import ParameterSelect from './parameter-select';

export default function Sidebar() {
  const [option, setOption] = useState('Carbon Dioxide (CO2)');
  const [country, setCountry] = useState();
  const [yearlyEmissionDataset, setYearlyEmissionDataset] = useState([
      { Australia:[
    {
        "2014": "393126.946994288"
    },
    {
        "2013": "396913.93653029"
    },
    {
        "2012": "406462.8477036"
    },
    {
        "2011": "403705.528313991"
    },
    {
        "2010": "406200.993184341"
    },
    {
        "2009": "408448.47899963"
    },
    {
        "2008": "404237.828214077"
    },
    {
        "2007": "398816.453543549"
    },
    {
        "2006": "391134.100909449"
    },
    {
        "2005": "385581.132806466"
    },
    {
        "2004": "381519.261592783"
    },
    {
        "2003": "368345.977425107"
    },
    {
        "2002": "361861.387896028"
    },
    {
        "2001": "357653.329899303"
    },
    {
        "2000": "349885.433108928"
    },
    {
        "1999": "343713.906947774"
    },
    {
        "1998": "334328.142646602"
    },
    {
        "1997": "320439.116819391"
    },
    {
        "1996": "311914.819824229"
    },
    {
        "1995": "305162.543548735"
    },
    {
        "1994": "293830.709141192"
    },
    {
        "1993": "289142.267681326"
    },
    {
        "1992": "284766.092717838"
    },
    {
        "1991": "279741.639011863"
    },
    {
        "1990": "278265.898940768"
    }
]}
])

  return (
    <div className="sidebar">
      <div className="dropdowns">
        <ParameterSelect option={option} setOption={setOption} />
        <CountrySelect emissionType={option} setDatapoints={setYearlyEmissionDataset} datapoints={yearlyEmissionDataset}/>
      </div>
      <Graph countryList={yearlyEmissionDataset} />
    </div>
  );
}
