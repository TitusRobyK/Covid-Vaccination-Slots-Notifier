const userinput = require("./src/fetchUserInput");
const vaccineslots = require("./src/checkAvailability");
const notify = require("./src/notifyUser");
const cron = require('node-schedule');

async function main() {

    console.log("Covid Vaccination Notifier - Would periodically Check Slot availability & based on the current availability, Notification would be sent.");
    let userInput = await userinput.fetchUserInput();
    console.log(" User Input :", JSON.stringify(userInput, null, 2));

    //const cronjob = cron.scheduleJob('*/3 * * * *', async function () {
        let response = await vaccineslots.checkVaccineAvailabilityFor(userInput);
        //console.log(" API Response :", JSON.stringify(response, null, 2));
        let messageResponse = vaccineslots.createNotificationMessage(response);
        console.log(messageResponse);
        if (messageResponse != '') {
            notify.send(messageResponse);
        }
    //});
}

main().then(() => { });