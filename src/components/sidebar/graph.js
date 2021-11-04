import React, { useEffect, useMemo, useState } from 'react';
import { Chart } from 'react-charts';
import LoadingAnimation from '../utils/LoadingAnimation';

export default function Graph({ countryList, options, startYear, endYear }) {
  const [data, setData] = useState([]);
  const [plottingData, setPlottingData] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const filterByOptions = () => {
    setIsLoading(true)

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

  // const generateData = (countryList) => {
  //   let dataPoints = [];
  //   console.log(typeof(countryList));
  //   countryList.forEach((country)=> {
  //     for(const key in country) {
  //       let datum = {
  //         label: key,
  //         data:[],
  //         // color:'#ffff4d'
  //       }

  //       country[key].forEach((item) => {
  //         let yearValArray = Object.entries(item)[0];
  //         let yearValObject = { primary: new Date(yearValArray[0]).setHours(0, 0, 0, 0), secondary: yearValArray[1]};
  //         datum.data.push(yearValObject);
  //       });
  //         dataPoints.push(datum);
  //     }
  //     setData(dataPoints);
  //   })

  // }

  const generatePlottingData = (filteredData) => {
  let dataPoints = [];
    filteredData.forEach((country)=> {
      for(const key in country) {

        let emissionArray = country[key];
        emissionArray.forEach((emissionItem) => {
          let datum = {
            label:"",
            data:[],
            // color:'#ffff4d'
          }
          datum.label =  Object.keys(emissionItem)[0];
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
      setIsLoading(false);

    })
  }

  useEffect(() => {
    filterByOptions();
  }, [options, startYear, endYear,]);

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
    <>
    {isLoading === true ? <LoadingAnimation/> :
    <div
    style={{
      width: '800px',
      height: '400px',
    }}
  >
    <p>Example Graph</p>
    <Chart data={plottingData} axes={axes} className="chart" tooltip />
  </div>
    }
    
    </>
  );
}
