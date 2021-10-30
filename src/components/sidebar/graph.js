import React,{ useEffect, useMemo, useState } from 'react'
import { Chart } from 'react-charts'
 
export default function Graph({country}) {

  const [data,setData] = useState([]);

  const generateData = (country) => {
    let dataPoints = [];

    for(const key in country) {
      let datum = {
        label: key,
        data:[]
      }

      country[key].forEach((item) => {
        let yearValArray = Object.entries(item)[0];
        let yearValObject = { primary: parseInt(yearValArray[0]), secondary: parseInt(yearValArray[1])};
        datum.data.push(yearValObject);
      });

      console.log(datum);
      dataPoints.push(datum);
    }
    setData(dataPoints);
  }

  useEffect(()=> {
    generateData(country);
    console.log(data);
  },[country]);

  const dataTemp = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
      },
    ],
    []
  )
 
  // const axes = React.useMemo(
  //   () => [
  //     { primary: true, type: 'linear', position: 'bottom' },
  //     { type: 'linear', position: 'left'}
  //   ],
  //   []
  // )

  const axes =  [
    { primary: true, type: 'linear', position: 'bottom' },
    { type: 'linear', position: 'left'}
  ]
 
  return (
    <div
      style={{
        width: '800px',
        height: '400px'
      }}
      className="chart"
    >
      <p>Example Graph</p>
      <Chart data={data} axes={axes} tooltip />
    </div>
  )
}