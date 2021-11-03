import React, { useEffect, useMemo, useState } from 'react';
import { Chart } from 'react-charts';

export default function Graph({ countryList, options, startYear, endYear }) {
  const [data, setData] = useState([]);
  const [plottingData, setPlottingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

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

    setFilteredData(finalData);
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

  const generatePlottingData = () => {

  }
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
    <div
      style={{
        width: '800px',
        height: '400px',
      }}
    >
      <p>Example Graph</p>
      <Chart data={dataTemp} axes={axes} className="chart" tooltip />
    </div>
  );
}
