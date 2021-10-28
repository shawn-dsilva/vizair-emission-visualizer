import React, {useState} from 'react'
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown'

export default function ParameterSelect({option, setOption}) {
    //Write logic to render all countries as dropdown options
    const options = [
        'Carbon Dioxide (CO2)', 'Greenhouse Gases (GHG) Type 1', 'Greenhouse Gases (GHG) Type 2','Hydrofluorocarbons (HFC)', 'Methane (CH4)', 'Nitrogen Triflouride (NF3)', 'Nitrous Oxide (N2O)', 'Perflourocarbons (PFC)', 'Sulphur Hexaflouride (SF6)', 'Unspecified HFC & PFC Mix'
    ];
    const defaultOption = options[0];

    const onSelect = (selection) => {
        setOption(selection.value);
    }

    return(
        <div className="parameter-select">
            <label>Emission Type</label>
            <Dropdown options={options} value={defaultOption} onChange={onSelect} placeholder="Select an option" />

            <span>Your Selection : {option}</span>
        </div>
    )
}