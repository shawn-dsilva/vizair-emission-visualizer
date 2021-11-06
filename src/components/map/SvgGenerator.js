import React, { useEffect, useState } from 'react'
import WorldMap from './svg/WorldMap.json';

function SvgGenerator({emissionData, isLoading, setIsLoading}) {

    const [colorized, setColorized] = useState({});

    const colors = [
      '#fff5f0',
      '#fee0d2',
      '#fcbba1',
      '#fc9272',
      '#fb6a4a',
      '#ef3b2c',
      '#cb181d',
      '#a50f15',
      '#67000d',
      '#420008'
    ]

    const colorizeData = () => {
      let colorized = {};

      for(const key in emissionData) {
          let val = emissionData[key];
          switch (true) {
            case val > 0 && val < 300000:
              colorized[key] = {'value':val, 'color' : colors[0]}
              break;
            case val > 300000 && val < 350000:
              colorized[key] = {'value':val, 'color' : colors[1]}
              break;
            case val > 350000 && val < 400000:
              colorized[key] = {'value':val, 'color' : colors[2]}
              break;
            case val > 400000 && val < 450000:
              colorized[key] = {'value':val, 'color' : colors[3]}
              break;
            case val > 450000 && val < 500000:
              colorized[key] = {'value':val, 'color' : colors[4]}
              break;
            case val > 500000 && val < 550000:
              colorized[key] = {'value':val, 'color' : colors[5]}
              break;
            case val > 50000 && val < 1500000:
              colorized[key] = {'value':val, 'color' : colors[6]}
              break;
            case val > 1500000 && val < 2000000:
              colorized[key] = {'value':val, 'color' : colors[7]}
              break;
            case val > 2000000 && val < 2500000:
              colorized[key] = {'value':val, 'color' : colors[8]}
              break;
            default:
              colorized[key] = {'value':val, 'color' : colors[9]}
          }
      }
      setColorized(colorized);  
      setIsLoading(false);

  }

    useEffect(() => {
        colorizeData();
    }, [emissionData])


    

    const getSafeColor = (countryName) => {
      if(countryName === 'United States') {
        // Check for American Exceptionalism
        return colorized['United States of America']?.color;
      } else if( colorized[countryName] === undefined) {
        // Return light grey hex code for countries that have no data
        return '#D3D3D3'
      } else {
        // Return the countries color
          return colorized[countryName].color;
        }
      }

    const createChildElements = () => {

        let countries = WorldMap.children[2].children;

        let elements = countries.map((country, index) => {
            let countryName = country.attributes["data-name"];
            console.log(countryName);
            console.log(colorized['United States of America']?.color);
            return <path key={index} d={country.attributes.d} fill={getSafeColor(countryName)} dataid={country.attributes["data-id"]} dataname={country.attributes["data-name"]} id={country.attributes.id} ><rect id="1" x="0" y="0" fill="#22222" width="20" height="20"></rect>
            </path>
        })
        return elements

    }


    return (
      <>
      { isLoading === true ? "LOADING" : (
        <svg enableBackground="new 0 0 1000 647" height="647px" pretty_print="False" style={{"strokeLineJoin": "round", "stroke":"#000", "fill": "none"}} version="1.1" viewBox="0 0 1000 647" width="1000px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><metadata><views><view h="647.825177808" padding="0" w="1000"><proj flip="auto" id="mercator" lon0="65.3146660706"/><bbox h="4064.12" w="6283.19" x="-3141.59" y="-2891.13"/></view></views></metadata><g class="" id="countries">
         {createChildElements()}
            </g>
        </svg>)
      }
      </>
    )
}

export default SvgGenerator
