const fs = require('fs')

const EMISSION_TYPES = [
  "carbon_dioxide_co2_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent",
  "greenhouse_gas_ghgs_emissions_including_indirect_co2_without_lulucf_in_kilotonne_co2_equivalent",
  "greenhouse_gas_ghgs_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent",
  "hydrofluorocarbons_hfcs_emissions_in_kilotonne_co2_equivalent",
  "methane_ch4_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent",
  "nitrogen_trifluoride_nf3_emissions_in_kilotonne_co2_equivalent",
  "nitrous_oxide_n2o_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent",
  "perfluorocarbons_pfcs_emissions_in_kilotonne_co2_equivalent",
  "sulphur_hexafluoride_sf6_emissions_in_kilotonne_co2_equivalent",
  "unspecified_mix_of_hydrofluorocarbons_hfcs_and_perfluorocarbons_pfcs_emissions_in_kilotonne_co2_equivalent",
]

let holdingArray = []; // temporary array to hold country name and year:value pairs for an emission type
let current_index = 1; // global index, that marks the current position in the array of file date


const makeJSONArray = (item) => {

    let commaSeperatedArray = item.split(",");
    let countryName = commaSeperatedArray[0];
    let year = commaSeperatedArray[1];
    let value = commaSeperatedArray[2];

    
    // variable names as keys don't work directly
    // variable names have to be enclosed with [] to work
    // which are called "computed properties"
    let yearValuePair = {[year]: value};

    // let exist = holdingArray.filter(object => object.hasOwnProperty(countryName)).length>0;

    // Checks if Object exist, if it does, it's index is returned, else, -1
    let exist = holdingArray.findIndex(object => object.hasOwnProperty(countryName));

    // only true if exist is a value other than -1
    if(exist>=0){
        // Accessing countryname Object property only works with
        // [countryName] syntax
        holdingArray[exist][countryName].push(yearValuePair);

    } else {
        // Create new entry of country and push yearValuePair onto it
        holdingArray.push({[countryName]:[yearValuePair]});
    }

}

// Writes content of holdingArray into file, filename is supposed to be emission type
const writeToJsonFile = (data, filename) => {

  // Turns data from holdingArray into string
  let jsonString = JSON.stringify(data);

  // Creates file with given filename if doesn't exist and
  // Writes data into the file
  fs.writeFile(`./json/${filename}.json`, jsonString, function (err) {
    if (err) throw err;
    console.log(`Data Written to ${filename}.json`);
  });

  // Reset holdingArray to empty for next emmission type based dataset
  holdingArray = [];
}

// Creates all files based on emission types
// Takes in dataArray which is the file data split by newline into array
const generateAllFiles = (dataArray) => {

  EMISSION_TYPES.forEach( (item) => {

    // current_index starts at 1 and ends at whatever value it has when loop terminates
    // loop terminates when last instance of emission type string is found in array, this is done via
    // dataArray[current_index].includes(item) where item is the emission type string for e.g 
    // "carbon_dioxide_co2_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent"
    // without current_index to mark till where the array was processed, cycles would be wasted reading and checking 
    // the whole array with emission types from the start
    for(current_index; dataArray[current_index].includes(item); current_index++) {
      makeJSONArray(dataArray[current_index]);
    }
      writeToJsonFile(holdingArray, item);
  })
  

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
