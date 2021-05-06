const userinput = require("./src/fetchUserInput");
const vaccineslots = require("./src/checkAvailability");

async function main() {
    console.log("Covid Vaccination Notifier - Would periodically check vaccine availability & based on the availability, desktop notification would be sent.");
    let userInput = await userinput.fetchUserInput();
    console.log(" User Input :", JSON.stringify(userInput, null, 2));
    let response = await vaccineslots.checkVaccineAvailabilityFor(userInput);
    console.log(" API Response :", JSON.stringify(response, null, 2));
}

main().then(() => { });