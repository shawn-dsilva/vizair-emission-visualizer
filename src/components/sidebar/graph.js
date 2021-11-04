import React, { useEffect, useMemo, useState } from 'react';
import { Chart } from 'react-charts';
import LoadingAnimation from '../utils/LoadingAnimation';

export default function Graph({ countryList, options, startYear, endYear, isLoading, setIsLoading }) {
  const [data, setData] = useState([]);
  const [plottingData, setPlottingData] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  // const [filteredData, setFilteredData] = useState([]);

  const filterByOptions = () => {
    let finalData = [];
    let optionsFilteredArray = [];
    let currKey;
    countryList.forEach(country => {
      for (const key in country) {
        currKey = key;
        let emissionArray = country[key];
        options.forEach(option => {
          let passingItem = emissionArray.filter(emissionType => {
            return Object.keys(emissionType)[0] === option;
          });

          optionsFilteredArray.push(passingItem[0]);
        });
      }
      let completeFilteredArray = filterByTimeFrame(optionsFilteredArray);
      const countryObjCopy = { [currKey]: completeFilteredArray };
      finalData.push(countryObjCopy);
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
    filteredData.forEach((country)=> {
      for(const key in country) {

        let emissionArray = country[key];
        emissionArray.forEach((emissionItem) => {
          let datum = {
            label:'',
            data:[],
            // color:'#ffff4d'
          }
          let emissionArray = Object.keys(emissionItem)[0].toString().split('/');
          let emissionPrettyPrint = `${emissionArray[0]} ( ${emissionArray[1]} )`;
          datum.label =  `${emissionPrettyPrint} Emissions by ${Object.keys(country)[0]}`;
          for(const yearValKey in emissionItem) {
            emissionItem[yearValKey].forEach((yearValueItem) => {
              let yearValArray = Object.entries(yearValueItem)[0];
              let yearValObject = { primary: new Date(yearValArray[0]).setHours(0, 0, 0, 0), secondary: yearValArray[1]};
              datum.data.push(yearValObject);
            })
          }       
          console.log(datum);   
          dataPoints.push(datum);

        });
      }
      console.log(dataPoints)
      setPlottingData(dataPoints);
      setIsFirstLoad(false);
      setIsLoading(false);

    })
  }

  useEffect(() => {
    filterByOptions();
  }, [options, startYear, endYear]);

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
    {isFirstLoad === true ? <div className="center-container"><h1 style={{margin:'auto', color:'grey'}}>Select A Country And Parameters to Get Started</h1></div>: 
        (isLoading === true ? <LoadingAnimation/> :
          <div style={{
            height:'500px',
            width: '800px',
            marginBottom:'2rem'
          }}>
          <Chart data={plottingData} axes={axes} className="chart" tooltip />
        </div>
  )
    }

    
    </div>
  );
}
