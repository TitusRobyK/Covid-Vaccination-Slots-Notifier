const notifier = require('node-notifier');

exports.send = function (customMessage) {
    notifier.notify(
        {
            title: 'Vaccination Slot Alert',
            message: 'Vaccination Slots Available ! \n'+customMessage,
            icon: './assets/vaccine-icon.png',
            sound: 'Submarine', 
            wait: true 
        });
};