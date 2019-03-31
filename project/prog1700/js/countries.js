"use strict";

// checking if the country data is already saved in local storage
// if not, load them from the JSON file
// if so, go to start function
if(localStorage.ns == null)
{
    // for using to request data from a web serve.
    // loading country data from JSON file into localStorage using AJAX
    // AJAX (Asynchronous JavaScript and XML)
    var countriesData = new XMLHttpRequest();

    countriesData.onreadystatechange = function() {
        // this happens second!!!!!!
        // readyState 4 means the JSON has loaded
        if (this.readyState == 4 && this.status == 200) {
            // we will store the JSON data in localStorage
            localStorage.ns = this.responseText;
            // we will call the function to display the localStorage in the screen
            start();
        }
    };

    // this happens first!!!!!!
    // sends an AJAX request to load out JSON file
    countriesData.open("GET", "countries.json", true);
    countriesData.send();
}

else
{
    // if the country data is already saved in local storage go th the start function
    start();
}

// function for making number with comma separated.
function makeCommaNumber(inNumber)
{
    // add comma every 3units of number by starting from right
    while (/(\d+)(\d{3})/.test(inNumber.toString()))
    {
        inNumber = inNumber.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    // return final result
    return inNumber;
}

// function for making country name with underbar when it has space.
function makeUnderName(inName)
{
    var inNameArray = [];
    var redactedName = "";
    
    // make array containing country name's character
    for(var i = 0; i < inName.length; i++)
    {
        inNameArray.push(inName[i]);
    }

    // if it has blank, then replace with underbar
    for (var i = 0; i < inNameArray.length; i++)
    {   
        if (inNameArray[i] == " ")
        {
            inNameArray[i] = "_";
        }
    }

    // join all element of array
    redactedName = inNameArray.join("");

    // return final result
    return redactedName;
}

// function for calculating area in Km unit
function calculateAreaInKm(inAreaInMiles)
{   
    // 1 mile = 2.58999 km
    var ratioMilesKm = 2.58999;
    var areaInKm = inAreaInMiles * ratioMilesKm;

    // return final result
    return areaInKm;
}

// function for getting country name on dropbox
function getCountriesNameList() 
{
    // make localstorage data to JavaScript object.
    var countriesList = JSON.parse(localStorage.ns);
    // set the target to change element
    var targetElement = document.getElementById('countryList');

    // reads every country name from localStorage
    // and writes each one as a new row in an HTML element
    // and displays on the web page
    var newOption = "";

    //newOption += `<option hidden selected>Select One</option>`;
    newOption += `<option selected>Select One</option>`;

    for(var i = 0; i < countriesList.length; i++)
    {
        var countryElement = countriesList[i];

        newOption += `<option value="${countryElement["Name"]}">${countryElement["Name"]}</option>`;
    }

    // replace HTML element
    targetElement.innerHTML = newOption;
}

// function for displaying country data on the screen when user select one country.
function displayCountryData()
{
    // set the target to change element
    var selectedConutryName = document.getElementById('countryList').value;

    // validation
    if(selectedConutryName == "Select One")
    {
        alert("Please select a country correctly.");
    }
    else
    {
        // set the target to change element
        var targetElementInfo = document.getElementById('targetInfo');

        // find selected country name from localStorage
        // and writes each one as a new row in an HTML element
        // and displays on the web page
        var newInputInfo = "";

        // make country name with underbar using function
        var underCountryName = makeUnderName(selectedConutryName);

        // display selected country name and flag //
        //newInputInfo += `<label>Country Info:</label> <br>`;
        newInputInfo += `<h1>${selectedConutryName}</h1>`;
        // newInputInfo += `<div id="countryFlagArea">`;
        newInputInfo += `<img src="./img/flags/${underCountryName}.png">`;

        // replace HTML element
        targetElementInfo.innerHTML = newInputInfo;
    }
}

// function for displaying population data on the screen when user select one country.
function displayPopulationData()
{
    // make localstorage data to JavaScript object.
    var countriesList = JSON.parse(localStorage.ns);
    // get the target's value
    var selectedConutryName = document.getElementById('countryList').value;
    var targetElementPopulation = document.getElementById('targetPopulation');
    var newInputPopulation = "";

    // validation
    if(selectedConutryName == "Select One")
    {
        newInputPopulation = `<input id="populationFieldInput" value="0" disabled />`;
    }
    else
    {
        var selectedCountryPopulation = 0;

        // find selected country's population
        for(var i = 0; i < countriesList.length; i++)
        {
            var countryElement = countriesList[i];
            if(selectedConutryName == countryElement["Name"])
            {
                selectedCountryPopulation = countryElement["Population"];
            }
        }

        // make comma separated number
        var commaPopulation = makeCommaNumber(selectedCountryPopulation);

        // newInputPopulation += `<label>Population:</label> <br>`;
        newInputPopulation += `<input id="populationFieldInput" value="${commaPopulation}" disabled />`;
    }
    // replace HTML element
    targetElementPopulation.innerHTML = newInputPopulation;
}

// function for displaying area data on the screen when user select one country.
function displayAreaData()
{
    // make localstorage data to JavaScript object.
    var countriesList = JSON.parse(localStorage.ns);
    // get the target's value in html
    var selectedConutryName = document.getElementById('countryList').value;
    // set the target to change element
    var targetElementAreaMiles = document.getElementById('targetArea');
    
    var newInputAreaMiles = "";

    // validation
    if(selectedConutryName == "Select One")
    {
        newInputAreaMiles = "<input id='areaFieldInput' value='0' disabled />";
    }
    else
    {
        // get the area type value by user selected
        var selectedAreaType = document.getElementById('areaType').value;

        var selectedCountryAreaMiles = 0;
        var selectedConutryAreaKm = 0;
        //var commaAreaMiles = 0;
        var outputArea = 0;

        //find selected country's area
        for(var i = 0; i < countriesList.length; i++)
        {
            var countryElement = countriesList[i];
            if(selectedConutryName == countryElement["Name"])
            {
                selectedCountryAreaMiles = countryElement["Area"];
            }
        }

        // if selected area type is miles, then make float number
        if(selectedAreaType == "areaTypeMiles")
        {
            outputArea = parseFloat(selectedCountryAreaMiles).toFixed(1);
        }
        // if selected area type is km, then make km unit using function
        else if(selectedAreaType == "areaTypeKm")
        {
            selectedConutryAreaKm = calculateAreaInKm(selectedCountryAreaMiles);
            outputArea = parseFloat(selectedConutryAreaKm).toFixed(1);
            // commaAreaMiles = makeCommaNumber(selectedConutryAreaKm);
        }

        newInputAreaMiles += `<input id="areaFieldInput" value="${outputArea}" disabled />`;
    }

    // replace HTML element
    targetElementAreaMiles.innerHTML = newInputAreaMiles;
}

// function for displaying density data on the screen when user select one country.
function displayDensityData()
{
    // make localstorage data to JavaScript object.
    var countriesList = JSON.parse(localStorage.ns);
    // get the target's value in html
    var selectedConutryName = document.getElementById('countryList').value;
    // set the target to change element
    var targetElementDensity = document.getElementById('targetDensity');

    var newInputDensity = "";

    // validation
    if(selectedConutryName == "Select One")
    {
        newInputDensity = "<input id='populationDensityInput' value='0' disabled />";
    }
    else
    {
        var ratioMilesKm = 2.58999;
        var selectedCountryDensity = 0;
        var selectedCountryPopulation = 0;
        var selectedCountryAreaMiles = 0;
        

        // find selected country's population
        for(var i = 0; i < countriesList.length; i++)
        {
            var countryElement = countriesList[i];
            if(selectedConutryName == countryElement["Name"])
            {
                selectedCountryPopulation = countryElement["Population"];
            }
        }

        //find selected country's area
        for(var i = 0; i < countriesList.length; i++)
        {
            var countryElement = countriesList[i];
            if(selectedConutryName == countryElement["Name"])
            {
                selectedCountryAreaMiles = countryElement["Area"];
            }
        }

        // if selected density type is miles, then make float number
        if(document.getElementById('mile').checked)
        {
            selectedCountryDensity = (selectedCountryPopulation / selectedCountryAreaMiles).toFixed(2);
        }
        // if selected density type is km, then make km unit using function
        if(document.getElementById('km').checked)
        {
            selectedCountryDensity = (selectedCountryPopulation / (selectedCountryAreaMiles * ratioMilesKm)).toFixed(2);
        }

        newInputDensity += `<input id="populationDensityInput" value="${selectedCountryDensity}" disabled />`;
    }
    // replace HTML element
    targetElementDensity.innerHTML = newInputDensity;
}

// function for displaying percentage data on the screen when user select one country.
function displayPercentageData()
{
    // make localstorage data to JavaScript object.
    var countriesList = JSON.parse(localStorage.ns);
    // get the target's value in html
    var selectedConutryName = document.getElementById('countryList').value;
    // set the target to change element
    var targetElementPercentage = document.getElementById('targetPercentage');

    var totalCountriesPopulation = 0;
    var selectedCountryPopulation = 0;
    var selectedCountryPercentage = 0;

    var newInputPercentage = "";

    // get sum of total population of the world
    for(var i = 0; i < countriesList.length; i++)
    {
        var countryElement = countriesList[i];

        if(selectedConutryName == countryElement["Name"])
        {
            selectedCountryPopulation = countryElement["Population"];
        }

        totalCountriesPopulation += countryElement["Population"];
    }

    // calculate selected country's percentage
    selectedCountryPercentage = ((selectedCountryPopulation / totalCountriesPopulation) * 100).toFixed(3);

    newInputPercentage += `<input id="percentageWorldPopulationInput" value="${selectedCountryPercentage} %" disabled />`;

    // replace HTML element
    targetElementPercentage.innerHTML = newInputPercentage;
}

// function to open wiki page when user click the button
function runButtonWiki()
{
    // get the target's value
    var selectedConutryName = document.getElementById('countryList').value;
    // make selected country name with underbar
    var underCountryName = makeUnderName(selectedConutryName);

    // validation
    if(selectedConutryName == "Select One")
    {
        alert("Please select a country correctly.");
    }
    // open wikipedia window about selected country
    else
    {
        window.open(`https://en.wikipedia.org/wiki/${underCountryName}`, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
    }
}

// trigger function
function start()
{
    // when window is loaded, get countries name list
    window.addEventListener("load", getCountriesNameList);
    // when user select one country, display country data
    document.getElementById("countryList").addEventListener("change", displayCountryData);
    // when user select one country, display population data
    document.getElementById("countryList").addEventListener("change", displayPopulationData);
    // when user select one country, display area data
    document.getElementById("countryList").addEventListener("change", displayAreaData);
    // when user select area type, display area data
    document.getElementById("areaType").addEventListener("change", displayAreaData);
    // when user select one country, display country data
    document.getElementById("countryList").addEventListener("change", displayDensityData);
    // when user select population density type, display country data
    document.getElementById("populationDensity").addEventListener("change", displayDensityData);
    // when user select one country, display percentage data
    document.getElementById("countryList").addEventListener("change", displayPercentageData);
    // when user click wiki button, open wiki page
    document.getElementById("wikiButton").addEventListener("click", runButtonWiki);
    // when user click quiz button, open quiz page
    document.getElementById("quizButton").addEventListener("click", function() {window.open("./quiz.html", "_self");});
}