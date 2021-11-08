# VizAir - Emission Visualizer

VizAir is an Emissions Visualizer built in React with just a single third party library( provided in starter code ) as a take home assignment by BSA.
You can visualize the emissions of various countries on a line graph for various emission types like carbon dioxide, greenhouse gases, methane etc ranging from the years 1990 to 2014, and also view the carbon dioxide emissions of countries as a choropleth map for a selected year.
Countries and Emissions data are based on the UN Emissions Dataset on Kaggle, available as a CSV file, and converted into a more computer friendly and human readable JSON file format with each country being it's own JSON file, stored on the React frontend as per specification.

# Feature Documentation

## Country Selection

- Select/Deselect various countries from the dataset
- Countries can be deselected by either again selecting the country from the dropdown, or clicking on the country's colored badge
- Upon selection/deselection, countries are added/removed from the URL query string.
- Atleast one country needs to be selected to make the Emissions type checkbox list appear
- A Maximum of 3 countries can be selected.

## Emission Selection

- Select/Deselect various Emission datasets( i.e CO2, Methane, NO2) provided by the selected country/countries
- Emission types are shown as checkboxes
- Checkboxes can be selected/deselected and upon doing so, the respective addition/removal of the emission type is done on the URL query string
- Emission types shown may not have data for all countries selected, for e.g only US and EU have the "Mixed" emission type available.
- All emission types can be selected for a single country, but only 3 emission types are available for more than one selected country.

## Time Period Selection

- Two dropdowns are provided to select the starting and ending years
- The defaults and earliest/latest years are 1990 and 2014 respectively.
- Upon selection, the selected year value is added as a parameter to the URL
- Years must have a difference of 6 years between them, else an error is thrown, this is to draw an accurate line graph
- The above also applies to year values in the URL parameters, if this happens in addition to the error, the values are reset to 1990 and 2014 respectively

## Emission Line Graph

- A graph to show visualization of the selected data
- The Y Axis( Vertical ) scale shows values in kilotons of CO2 Equivalent
- The X Axis( Horizontal ) shows the year range selected
- A paragraph showing the selected countries, emmissions and time period is above the graph.
- Graph datapoints can be hovered over upon which a tooltip appears showing the value of the current data point.
- For multiple countries, emission line visualizations are color coded, i.e a single country will have emission type lines of hues of a single color
- An example selection of Russia, EU and US and emissions of CO2, Greenhouse Gases and Methane would have 9 lines total being drawn with the emission lines of Russia being dark red, light red and lighter red.

## Choropleth CO2 Map Visualization

- Select a Year from the dropdown.
- The world map below will be colored according to the how high a country's emissions are, with darker shades being higher emissions, and lighter shades being lesser emissions.
- This map is an SVG, and each country path is dynamically generated from JSON data of the countries.

## General

- The selected countries, emissions and years are added to URL query parameters
- Upon a refresh of the page with the same values in the query parameters, the line graph is painted using said values without the need for manual selection.
- Selected Country badges and year values in the dropdown are populated, and emission type boxes pre-checked according to selection in URL Parameters.


# Quick Start

Clone the repository
```
    git clone https://github.com/shawn-dsilva/vizair-emission-visualizer
```

Install packages
```
    npm install
```

Start Local Server
```
    npm start
```

Running CSV to JSON parsing script 
```
    cd script
    node by-country-csv-to-json-script.js
```

# Tasks Completed :-

## Main Tasks :-

- [x] Clean and restructure the data using any script to a JSON file 
- [x] Decide the best frmat based on the feature mentioned below
- [x] Break the JSON into multiple files if it's too big
- [x] Create a react frontend based on the data 
- [x] Store the JSON files on the frontend
- [x] Select time period and country
- [x] Select/deselect different parameters like CO2, NO2, etc
- [x] Keep the state of the UI in the URL
- [x] Visualization is up to you - must have a line chart
- [x] Min libraries, no redux required - don't add bloatware
- [x] Don't add any new library or if you do please detail as to why so (testing core coding skills)
- [x] Include the converting script along with raw data
- [x] Proper error boundaries

## Bonus Features Done :-

- [x] Select multiple countries for the same time period (Max whatever the UI can handle)
- [x] Map visualization

## Screenshot(s)
 
 TODO