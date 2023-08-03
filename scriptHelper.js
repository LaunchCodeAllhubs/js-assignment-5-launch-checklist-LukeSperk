// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    const mission = document.getElementById("missionTarget");
    mission.innerHTML = `<h2>Mission Destination</h2>
    <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance} </li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}">`;

}

function validateInput(testInput) {
   if (typeof testInput === 'number') {
    return "Is a Number";
   } else if (testInput === "") {
    return "Empty";
   } else if (isNaN(testInput)) {
    return "Not a Number";
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty"
        || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
            alert("Please fill in all fields.");
    } else if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
            alert("Please enter a valid number for both Fuel Level and Cargo Level")
    } else {
        document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch`;
        document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot} is ready for launch`;
        list.style.visibility = "visible";
        if (fuelLevel < 10000) {
            
            document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
            document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
            document.getElementById("launchStatus").style.color = rgb(199, 37, 78);
        }
        if (cargoLevel > 10000) {
            
            document.getElementById("cargoStatus").innerHTML = "Cargo mass too heavy for launch";
            document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
            document.getElementById("launchStatus").style.color = rgb(199, 37, 78);
        }
        if (fuelLevel >= 10000 && cargoLevel <= 10000) {
            document.getElementById("launchStatus").innerHTML = "Shuttle is Ready for Launch";
            document.getElementById("launchStatus").style.color = rgb(65, 159, 106);
            document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
            document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
        }
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let planet = Math.floor(Math.random()*planets.length);
    return planets[planet];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
