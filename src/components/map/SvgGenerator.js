import React, { useEffect, useState } from 'react'
import WorldMap from './svg/WorldMap.json';

function SvgGenerator({emissionData}) {

    const [colorized, setColorized] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const colors = [
        '#fee5d9',
        '#fcbba1',
        '#fc9272',
        '#fb6a4a',
        '#de2d26',
        '#a50f15'
    ]

    useEffect(() => {
        colorizeData();
    }, [])


    const colorizeData = () => {
        setIsLoading(true);
        let colorized = {};

        for(const key in emissionData) {
            let val = Math.trunc(emissionData[key]);
            switch (val) {
              case val > 0 && val < 500000:
                colorized[key] = {'value':val, 'color' : colors[0]}
                break;
              case val > 500000 && val < 1000000:
                colorized[key] = {'value':val, 'color' : colors[1]}
                break;
              case val > 1000000 && val < 1500000:
                colorized[key] = {'value':val, 'color' : colors[2]}
                break;
              case val > 1500000 && val < 2000000:
                colorized[key] = {'value':val, 'color' : colors[3]}
                break;
              case val > 2000000 && val < 2500000:
                colorized[key] = {'value':val, 'color' : colors[4]}
                break;
              default:
                colorized[key] = {'value':val, 'color' : colors[5]}
            }
        }
        console.log(colorized)


        setColorized(colorized);  
        
        // setIsLoading(false);
    }

    const getSafeColor = (countryName) => {
      if( colorized[countryName] === undefined) {
        return '#D3D3D3'
      } else {
        return colorized[countryName].color.toString();
      }
    }

    const createChildElements = () => {
        let countries = WorldMap.children[2].children;

        let elements = countries.map((country) => {
            let countryName = country.attributes["data-name"];
            console.log(colorized[countryName]?.color);
            return <path d={country.attributes.d} fill={getSafeColor(countryName)} dataid={country.attributes["data-id"]} dataname={country.attributes["data-name"]} id={country.attributes.id} />
        })
        return elements
    }


    return (
        <svg enableBackground="new 0 0 1000 647" height="647px" pretty_print="False" style={{"strokeLineJoin": "round", "stroke":"#000", "fill": "none"}} version="1.1" viewBox="0 0 1000 647" width="1000px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><metadata><views><view h="647.825177808" padding="0" w="1000"><proj flip="auto" id="mercator" lon0="65.3146660706"/><bbox h="4064.12" w="6283.19" x="-3141.59" y="-2891.13"/></view></views></metadata><g class="" id="countries">

            { isLoading && createChildElements()}
            </g>
        </svg>

    )
}

export default SvgGenerator
