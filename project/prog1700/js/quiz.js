"use strict";

// clear some data in localStorage when refresh
//localStorage.clear();
localStorage.removeItem('correctCountArray');

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

// function for reset state when user click reset button
// but, keep score table data
function makeReset()
{
    // remove corret count array data
    localStorage.removeItem('correctCountArray');
    // reset result area in HTML
    document.getElementById('quizResultArea').innerHTML = "<p id='targetResult'>0 out of 0 (0.0 %)</p>";
    // reset result table area in HTML
    document.getElementById('targetScore').innerHTML = "";
    // restart quiz
    getQuizArea();
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

// function for display score table
function showScoreTable()
{
    // make localstorage data to JavaScript object.
    var scoreJsonData = JSON.parse(localStorage.score);
    // set the target to change element
    var targetElementScore = document.getElementById('targetScore');

    // reads score data from localStorage
    // and writes each one as a new row in an HTML element
    // and displays on the web page
    var newElementScore = "";

    // add on HTML
    newElementScore += "<h2>HIGH SCORES</h2>";
    newElementScore += "<table>";
    newElementScore += "<thead>";
    newElementScore += "<tr>";
    newElementScore += "<th>Score</th>";
    newElementScore += "<th>Username</th>";
    newElementScore += "<th>Date</th>";
    newElementScore += "</tr>";
    newElementScore += "</thead>";
    newElementScore += "<tbody>";

    // going through all score and writing a row in the table for them
    for(var i = 0; i < scoreJsonData.length; i++)
    {
        var scoreJsonDataRow = scoreJsonData[i];

        newElementScore += "<tr>";
        newElementScore += `<td>${scoreJsonDataRow["Score"]}</td>`;
        newElementScore += `<td>${scoreJsonDataRow["User"]}</td>`;
        newElementScore += `<td>${scoreJsonDataRow["Timestamp"]}</td>`;
        newElementScore += "</tr>";
    }
    newElementScore += "</tbody>";
    newElementScore += "</table>";
    
    // replace HTML element
    targetElementScore.innerHTML = newElementScore;
}

// function for making new score table
// it must has only top5 score
function makeNewScoreTable(inNameInput, inCorrectNumberInput)
{
    // make localstorage data to JavaScript object.
    var newScoreTable = JSON.parse(localStorage.score);

    // get current date
    var currentDate = new Date();
    var dateFormatted = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`
    
    // make latest score data
    var newElement = {
        "Score": inCorrectNumberInput,
        "User": inNameInput,
        "Timestamp": dateFormatted
    };

    // add latest score data in score array
    newScoreTable.push(newElement);

    // sort array data from high score to low score
    newScoreTable.sort(function(a,b){return a.Score < b.Score});

    // bump out lowest score data
    var finalScoreTable = [];
    for(var i = 0; i < newScoreTable.length - 1; i++)
    {
        var tempElement = newScoreTable[i];
        finalScoreTable.push(tempElement);
    }
 
    // convert a JavaScript object into a string
    localStorage.score = JSON.stringify(finalScoreTable);

    // run sunction
    showScoreTable()
}

// function for making score data arraa from original json file
function processScoreTable(inUserInputName, inUserCorrectNumber)
{
    var nameInput = inUserInputName;
    var correctNumberInput = inUserCorrectNumber;

    if(localStorage.score == null)
    {
        // for using to request data from a web serve.
        // loading country data from JSON file into localStorage using AJAX
        // AJAX (Asynchronous JavaScript and XML)
        var quizScoreData = new XMLHttpRequest();

        quizScoreData.onreadystatechange = function() {
            // this happens second!!!!!!
            // readyState 4 means the JSON has loaded
            if (this.readyState == 4 && this.status == 200) {
                // we will store the JSON data in localStorage
                localStorage.score = this.responseText;
                // we will call the function to make new score table
                makeNewScoreTable(nameInput, correctNumberInput);
            }
        };

        // this happens first!!!!!!
        // sends an AJAX request to load out JSON file
        quizScoreData.open("GET", "original_high_scores.json", true);
        quizScoreData.send();
    }
    else
    {
        // if the country data is already saved in local storage go th the start function
        makeNewScoreTable(nameInput, correctNumberInput);
    }
}

// function for getting user name by user input
function enterUserName(inCorrectNumber)
{
    // for validate
    // input must be only 3 alphabet character
    var regEx = /[a-z]/gi;
    var userCorrectNumber = inCorrectNumber;
    var userInputName = prompt("Please enter your 3-letter username");
    var verificationResult = userInputName.match(regEx);

    // validating
    if(isNaN(parseInt(userInputName)) == false || verificationResult.length != 3 || userInputName.length != 3)
    {
        do{
            userInputName = prompt("Please enter your 3-letter username properly");
            verificationResult = userInputName.match(regEx);
        }while(isNaN(parseInt(userInputName)) == false || verificationResult.length != 3 || userInputName.length != 3);
        // if input satisfy condition, then run function
        processScoreTable(userInputName, userCorrectNumber);
    }
    else
    {
        // if input satisfy condition, then run function
        processScoreTable(userInputName, userCorrectNumber);
    }
}

// function for getting quiz result of each step
// if user select correctly, plus 1 in variable
function processResultOutput(inQuizCorrectCount)
{
    // if localstorage data is empty, make new array and put latest result
    if(localStorage.getItem("correctCountArray") == null)
    {
        // make new array
        var correctCountArray = [];
        // put latest result
        correctCountArray.push(inQuizCorrectCount);
        // update value
        localStorage.setItem("correctCountArray", JSON.stringify(correctCountArray));
    }
    // if localstorage data is not empty, update value
    else
    {
        // make localstorage data to JavaScript object.
        correctCountArray = JSON.parse(localStorage.getItem("correctCountArray"));
        // put latest result
        correctCountArray.push(inQuizCorrectCount);
        // update value
        localStorage.setItem("correctCountArray", JSON.stringify(correctCountArray));
    }

    // if quiz trying number is less then 10, keep going quiz
    if(correctCountArray.length <= 10)
    {
        var targetElementQuizResult = document.getElementById('targetResult');
        var newElementQuizResult = "";
        var correctNumber = 0;
        var correctPercentage = 0;
        
        // counting if user select is correct
        for(var i = 0; i < correctCountArray.length; i++)
        {
            if(correctCountArray[i] == 1)
            {
                correctNumber += 1;
            }
        }
        // get correct percentage
        correctPercentage = ((correctNumber / correctCountArray.length) * 100).toFixed(2);

        // add result output on HTML
        newElementQuizResult += `<P>${correctNumber} out of ${correctCountArray.length} (${correctPercentage}%)</p>`;
        targetElementQuizResult.innerHTML = newElementQuizResult;

        // if quiz trying number is less then 10, keep going quiz
        if(correctCountArray.length != 10)
        {
            getQuizArea();
        }

        // if quiz trying number is 10, go to function to result
        if(correctCountArray.length == 10)
        {
            enterUserName(correctNumber);
        }
    }
}

// function for displaying quiz area
function getQuizArea() 
{
    // make localstorage data to JavaScript object.
    var countriesList = JSON.parse(localStorage.ns);
    // set the target to change element
    var targetElementQuizArea = document.getElementById('targetFlags');

    // get random number and display flag by random number
    var newElementQuizFlag = "";
    var randomRange = countriesList.length;
    var randomSelectedCountry = "";
    var quizCountryName = "";
    // get random number
    var randomNumberForFlag = Math.floor(Math.random() * ((randomRange-1) - 0 + 1)) + 0;

    // Country Flag
    randomSelectedCountry = countriesList[randomNumberForFlag];
    quizCountryName = randomSelectedCountry["Name"];
    // convert country name with underbar
    var underCountryName = makeUnderName(quizCountryName);

    // add result on HTML
    newElementQuizFlag += `<img id="quizRandomCountry" src="./img/flags/${underCountryName}.png" alt="${quizCountryName}" />`;
    targetElementQuizArea.innerHTML = newElementQuizFlag;


    // Select List
    var targetElementSelect = document.getElementById('targetSelect');

    // make random number for selecting random country
    var randomNumberForFlagOne = 0;
    var randomNumberForFlagTwo = 0;
    var randomNumberForFlagThree = 0;

    // make random number for selecting random country
    // number is not same generated number before
    do
    {
        randomNumberForFlagOne = Math.floor(Math.random() * ((randomRange-1) - 0 + 1)) + 0;
    }while(randomNumberForFlag == randomNumberForFlagOne);

    // make random number for selecting random country
    // number is not same generated number before
    do
    {
        randomNumberForFlagTwo = Math.floor(Math.random() * ((randomRange-1) - 0 + 1)) + 0;
    }while(randomNumberForFlag == randomNumberForFlagTwo || randomNumberForFlagOne == randomNumberForFlagTwo);

    // make random number for selecting random country
    // number is not same generated number before
    do
    {
        randomNumberForFlagThree = Math.floor(Math.random() * ((randomRange-1) - 0 + 1)) + 0;
    }while(randomNumberForFlag == randomNumberForFlagThree || randomNumberForFlagOne == randomNumberForFlagThree || randomNumberForFlagTwo == randomNumberForFlagThree);
    
    // make flag array selected randomly
    var randomNumberForFlagArray = [randomNumberForFlag, randomNumberForFlagOne, randomNumberForFlagTwo, randomNumberForFlagThree];

    // make random number for order of select element
    var randomNumberForSelectOne = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
    var randomNumberForSelectTwo = 0;
    var randomNumberForSelectThree = 0;
    var randomNumberForSelectFour = 0;

    // make random number for determinding order of select
    // number is not same generated number before
    do
    {
        var randomNumberForSelectTwo = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
    }while(randomNumberForSelectOne == randomNumberForSelectTwo);
    
    // make random number for determinding order of select
    // number is not same generated number before
    do
    {
        var randomNumberForSelectThree = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
    }while(randomNumberForSelectOne == randomNumberForSelectThree || randomNumberForSelectTwo == randomNumberForSelectThree);
    
    // make random number for determinding order of select
    // number is not same generated number before
    do
    {
        var randomNumberForSelectFour = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
    }while(randomNumberForSelectOne == randomNumberForSelectFour || randomNumberForSelectTwo == randomNumberForSelectFour || randomNumberForSelectThree == randomNumberForSelectFour);

    // make select order array selected randomly
    var randomNumberForSelectArray = [randomNumberForSelectOne, randomNumberForSelectTwo, randomNumberForSelectThree, randomNumberForSelectFour];

    var newElementQuizSelect = "";

    // process for displaying on the screen
    var countrySelectArray = [];
    var countrySelectElement = 0;

    // store in array
    for(var i = 0; i < randomNumberForFlagArray.length; i++)
    {
        countrySelectArray[i] = countriesList[randomNumberForFlagArray[i]];
    }

    // display on the screen
    for(var i = 0; i < randomNumberForSelectArray.length; i++)
    {
        countrySelectElement = countrySelectArray[randomNumberForSelectArray[i]];

        newElementQuizSelect += `<option value="${countrySelectElement["Name"]}">${countrySelectElement["Name"]}</option>`;
    }

    targetElementSelect.innerHTML = newElementQuizSelect;
}

// function for checking quiz result of each step
function checkQuizResult()
{
    var quizCorrectCount = 0;

    // get alt value of random selected country
    var randomSelectedCountryName = document.getElementById('quizRandomCountry').alt;
    // get index value of selected country
    var selectedCountryIndex = document.getElementById('targetSelect').selectedIndex;
    // get aname of random selected country
    var selectedCountryIndexName = document.getElementById('targetSelect').options[selectedCountryIndex].value;

    // if random selected country same with user select country, variable is 1
    if(randomSelectedCountryName == selectedCountryIndexName)
    {
        quizCorrectCount = 1;
    }
    // if random selected country not same with user select country, variable is 0
    else if(randomSelectedCountryName != selectedCountryIndexName)
    {
        quizCorrectCount = 0;
    }

    // call function to process
    processResultOutput(quizCorrectCount);
}

// trigger function
function start()
{
    window.addEventListener("load", getQuizArea);
    document.getElementById("quizNext").addEventListener("click", checkQuizResult);
    document.getElementById("resetButton").addEventListener("click", makeReset);
    document.getElementById("cancelButton").addEventListener("click", function() {localStorage.removeItem('result');window.open(`./countries.html`, '_self');});
}