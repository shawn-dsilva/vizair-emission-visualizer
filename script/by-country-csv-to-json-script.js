const fs = require('fs')
let holdingArray = []; // temporary array to hold country name and year:value pairs for an emission type
//let current_index = 1; // global index, that marks the current position in the array of file date

const EMISSION_TYPES = {
        
  'carbon_dioxide_co2_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent':'CO2/Carbon Dioxide' , 
  'greenhouse_gas_ghgs_emissions_including_indirect_co2_without_lulucf_in_kilotonne_co2_equivalent': 'GHG1/Greenhouse Gas Type 1', 
  'greenhouse_gas_ghgs_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent' :'GHG2/Green House Gas Type 2',
  'hydrofluorocarbons_hfcs_emissions_in_kilotonne_co2_equivalent':'HFC/Hydrofluorocarbons', 
  'methane_ch4_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent': 'CH4/Methane', 
  'nitrogen_trifluoride_nf3_emissions_in_kilotonne_co2_equivalent': 'NF3/Nitrogen Triflouride', 
  'nitrous_oxide_n2o_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent':'N2O/Nitrous Oxide', 
  'perfluorocarbons_pfcs_emissions_in_kilotonne_co2_equivalent':'PFC/Perflourocarbons', 
  'sulphur_hexafluoride_sf6_emissions_in_kilotonne_co2_equivalent':'SF6/Sulphur Hexafluoride', 
  'unspecified_mix_of_hydrofluorocarbons_hfcs_and_perfluorocarbons_pfcs_emissions_in_kilotonne_co2_equivalent':'MIX/Unspecified HFC & PFC Mix'
      
  }


const makeJSONArray = (item) => {

    let commaSeperatedArray = item.split(",");
    let countryName = commaSeperatedArray[0];
    let year = commaSeperatedArray[1];
    let value = commaSeperatedArray[2];
    let emission = EMISSION_TYPES[commaSeperatedArray[3]];

    
    // variable names as keys don't work directly
    // variable names have to be enclosed with [] to work
    // which are called "computed properties"
    let yearValuePair = {[year]: value};


    // Checks if Country Object exist, if it does, it's index is returned, else, -1
    let countryIndex = holdingArray.findIndex(object => object.hasOwnProperty(countryName));

    // only true if countryIndex is a value other than -1
    if(countryIndex>=0){
  
        // Checks if emission Object exists, if it does, index is returned, else -1
        let emissionIndex = holdingArray[countryIndex][countryName].findIndex(object => object.hasOwnProperty(emission));

        // If emission array is found, push year value pair onto it
        if(emissionIndex>=0) {
        // Accessing countryname Object property only works with
        // [countryName] syntax
          holdingArray[countryIndex][countryName][emissionIndex][emission].push(yearValuePair);
        } else {
          // else create new emission object/array
          let emissionObject = {[emission]:[yearValuePair]}
          holdingArray[countryIndex][countryName].push(emissionObject);
        }

    } else {
        // Create new entry of country and push emissionTypeArray  onto it
        let emissionTypeArray = {[emission]: [yearValuePair,]};
        holdingArray.push({[countryName]:[emissionTypeArray]});
    }

}

// Writes content of holdingArray into file, filename is supposed to be emission type
const writeToJsonFile = () => {

  // List of countries
  let countryList = [];
  // Iterates through each country object in holding array
  holdingArray.forEach((country) => {
    // Extract name of the country which is also key to it's array i.e Australia
    // which is also a key e.g country.Australia
    const countryKeyName = Object.keys(country)[0];

    countryList.push(countryKeyName);
    // Turn country's emission data into JSON
    let countryJSONString = JSON.stringify(country[countryKeyName]);

    // Write to file, each file is named after the country whose emission's data it contains
    fs.writeFile(`./json/${countryKeyName}.json`, countryJSONString, function (err) {
      if (err) throw err;
      console.log(`Data Written to ${countryKeyName}.json`);
    });
  })
 
  // Write List of countries into file
  countryList = JSON.stringify(countryList);
  fs.appendFile("./json/country-list.json", countryList, function (err) {
    if (err) throw err;
    console.log(`Data Written to country-list.json`);
  });
  // Reset holdingArray to empty for next emmission type based dataset
  holdingArray = [];
}

// Creates all files based on emission types
// Takes in dataArray which is the file data split by newline into array
const generateAllFiles = (dataArray) => {

    // current_index starts at 1 and ends at whatever value it has when loop terminates
    // loop terminates when last instance of emission type string is found in array, this is done via
    // dataArray[current_index].includes(item) where item is the emission type string for e.g 
    // "carbon_dioxide_co2_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent"
    // without current_index to mark till where the array was processed, cycles would be wasted reading and checking 
    // the whole array with emission types from the start
    for(let current_index = 1; current_index<dataArray.length; current_index++) {
      makeJSONArray(dataArray[current_index]);
    }
      writeToJsonFile();
  

}

// Main function, reads CSV file and generates files
fs.readFile('./greenhouse_gas_inventory_data_data.csv', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  let dataArray = data.split("\n");
  generateAllFiles(dataArray);



})
