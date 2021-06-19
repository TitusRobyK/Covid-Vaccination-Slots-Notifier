const userinput = require("./lib/fetchUserInput");
const vaccineslots = require("./lib/checkAvailability");
const notify = require("./lib/notifyUser");
const cron = require('node-schedule');
const paintTerminal = require('./lib/paintTerminal');

async function main() {
    paintTerminal();
    let userInput = await userinput.fetchUserInput();
    const cronjob = cron.scheduleJob('*/3 * * * *', async function () {
        let response = await vaccineslots.checkVaccineAvailabilityFor(userInput);
        let notificationMessage = vaccineslots.createNotificationMessage(response);
        if (notificationMessage != '') {
            notify.send(notificationMessage);
            if (userInput.isEmailNotificationRequired) {
                await notify.sendEmail(userInput.emailDetails, notificationMessage);
            }
        }
    });
}

main().then(() => { });