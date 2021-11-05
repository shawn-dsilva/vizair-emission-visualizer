import React, { useEffect, useMemo, useState } from 'react';
import { Chart } from 'react-charts';
import LoadingAnimation from '../utils/LoadingAnimation';

export default function Graph({ countryList, options, startYear, endYear, isLoading, setIsLoading, country }) {
  const [data, setData] = useState([]);
  const [plottingData, setPlottingData] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  // const [filteredData, setFilteredData] = useState([]);

  const colors = [
   ['#ff0036', '#ff7390', '#ff91a9'],
   ['#0098ff', '#4fb8ff', '#86c5f0'],
   ['#ffc400','#ffce56', '#ffe5a6' ],
  ]

  const filterByOptions = () => {
    let finalData = [];
    let currKey;
    countryList.forEach(country => {
      for (const key in country) {
        currKey = key;
        let emissionArray = country[key];
        let optionsFilteredArray = [];
        options.forEach(option => {
          let passingItem = emissionArray.filter(emissionType => {
            return Object.keys(emissionType)[0] === option;
          });

          optionsFilteredArray.push(passingItem[0]);
          console.log(optionsFilteredArray);
        });
        let completeFilteredArray = filterByTimeFrame(optionsFilteredArray);
        const countryObjCopy = { [currKey]: completeFilteredArray };
        finalData.push(countryObjCopy);
      }

    });

    generatePlottingData(finalData);
  };

  const filterByTimeFrame = arrayToFilter => {
    let tempHoldingArray = [];
    let yearFilteredArray = [];
    arrayToFilter.forEach(emissionArray => {
      for (const key in emissionArray) {
        tempHoldingArray = emissionArray[key].filter(yearValueObject => {
          let year = Object.entries(yearValueObject)[0][0];
          return year >= startYear && year <= endYear;
        });

        let emissionObjCopy = { [key]: tempHoldingArray };
        yearFilteredArray.push(emissionObjCopy);
      }
    });
    return yearFilteredArray;
  };


  const generatePlottingData = (filteredData) => {
  let dataPoints = [];
  let multicolor;

  filteredData.length > 1 ? multicolor = true: multicolor = false;
    filteredData.forEach((country, countryIndex)=> {
      for(const key in country) {

        let emissionArray = country[key];

        emissionArray.forEach((emissionItem, emisssionIndex) => {
          let datum = {
            label:'',
            data:[],
            // color:'#ffff4d'
          }
          let emissionArray = Object.keys(emissionItem)[0].toString().split('/');
          let emissionPrettyPrint = `${emissionArray[0]} ( ${emissionArray[1]} )`;
          datum.label =  `${Object.keys(country)[0]}'s ${emissionPrettyPrint} Emissions `;
          if(multicolor) {
            datum.color = colors[countryIndex][emisssionIndex];
          }
          for(const yearValKey in emissionItem) {
            emissionItem[yearValKey].forEach((yearValueItem) => {
              let yearValArray = Object.entries(yearValueItem)[0];
              let yearValObject = { primary: new Date(yearValArray[0]).setHours(0, 0, 0, 0), secondary: yearValArray[1]};
              datum.data.push(yearValObject);
            })
          }       
          dataPoints.push(datum);

        });
      }
      setPlottingData(dataPoints);
      setIsFirstLoad(false);
      setIsLoading(false);

    })
  }

  const prettyPrint = (textArray) => {
    let prettyPrint = textArray.map( (string) => {
      string = string.split('/');
      string = `${string[0]} ( ${string[1]} )`;
      return string;
    })

    return prettyPrint.join(' , ');
  }

  useEffect(() => {
    filterByOptions();
  }, [countryList, options, startYear, endYear]);

  const dataTemp = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: [
          [0, 1],
          [1, 2],
          [2, 4],
          [3, 2],
          [4, 7],
        ],
      },
    ],
    []
  );

  const axes = [
    { primary: true, type: 'time', position: 'bottom' },
    { type: 'linear', position: 'left', format: tick => `${tick} ktCO2e` },
  ];

  return (
    <div className='graph-container' >
    <h1>Emissions by Country</h1>
    {isFirstLoad === true || options.length === 0 ? <div className="center-container"><h1 style={{margin:'auto', color:'grey'}}>Select A Country And Parameters to Get Started</h1></div>: 
        (isLoading === true ? <LoadingAnimation/> :
          <>
          <p>Showing results for {country.join(" , ")} with emission types {prettyPrint(options)} from {startYear} to {endYear}</p>
          <div style={{
            height:'500px',
            width: '800px',
            marginBottom:'2rem'
          }}>
          <Chart data={plottingData} axes={axes} className="chart" tooltip />
        </div>
        </>
  )
    }

    
    </div>
  );
}
