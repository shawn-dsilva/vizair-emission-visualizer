const fs = require('fs')

const CO2_KEY = "carbon_dioxide_co2_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent";

let CO2_Array = [];

const makeJSONArray = (item) => {

    commaSeperatedArray = item.split(",");
    let countryName = commaSeperatedArray[0];
    let year = commaSeperatedArray[1];
    let value = commaSeperatedArray[2];

    
    // variable names as keys don't work directly
    // variable names have to be enclosed with [] to work
    // which are called "computed properties"
    let yearValuePair = {[year]: value};

    // let exist = CO2_Array.filter(object => object.hasOwnProperty(countryName)).length>0;

    // Checks if Object exist, if it does, it's index is returned, else, -1
    let exist = CO2_Array.findIndex(object => object.hasOwnProperty(countryName));

    // only true if exist is a value other than -1
    if(exist>=0){
        // Accessing countryname Object property only works with
        // [countryName] syntax
        CO2_Array[exist][countryName].push(yearValuePair);

    } else {
        // Create new entry of country and push yearValuePair onto it
        CO2_Array.push({[countryName]:[yearValuePair]});
    }

}


const writeToJsonFile = (data) => {

  let jsonString = JSON.stringify(data);
  fs.appendFile(`./json/${CO2_KEY}.json`, jsonString, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

fs.readFile('./greenhouse_gas_inventory_data_data.csv', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  
  let dataArray = data.split("\n");

//   dataArray.forEach((item)=> {
//     console.log("\n");
//     console.log(item);
//   })

  for(let i = 1; i < 150; i++) {
      makeJSONArray(dataArray[i]);
  }

  CO2_Array.forEach((item) => {
    console.log(item);
  })

  writeToJsonFile(CO2_Array);
  // fs.access('./json', fs.F_OK, (err) => {
  //   if (err) {
  //     console.error(err)
  //     return
  //   }
  
  //   //file exists
  // })

})
