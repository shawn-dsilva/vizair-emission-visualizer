import React from 'react'
import WorldMap from './svg/WorldMap.json';

function SvgGenerator({countryColorTable}) {

    const createChildElements = () => {
        let countries = WorldMap.children[2].children;

        let elements = countries.map((country) => {
            return <path d={country.attributes.d} fill={"gray"} dataid={country.attributes["data-id"]} dataname={country.attributes["data-name"]} id={country.attributes.id} />
        })
        return elements
    }


    return (
        <svg enableBackground="new 0 0 1000 647" height="647px" pretty_print="False" style={{"strokeLineJoin": "round", "stroke":"#000", "fill": "none"}} version="1.1" viewBox="0 0 1000 647" width="1000px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><metadata><views><view h="647.825177808" padding="0" w="1000"><proj flip="auto" id="mercator" lon0="65.3146660706"/><bbox h="4064.12" w="6283.19" x="-3141.59" y="-2891.13"/></view></views></metadata><g class="" id="countries">
            {createChildElements()}
            </g>
        </svg>

    )
}

export default SvgGenerator
