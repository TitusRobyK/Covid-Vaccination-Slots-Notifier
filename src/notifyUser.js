const notifier = require('node-notifier');

exports.send = function () {
    notifier.notify(
        {
            title: 'My awesome title',
            message: 'Hello from node, Mr. User!',
            icon: './assets/vaccine-icon.png',
            sound: true, // Only Notification Center or Windows Toasters
            wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
        },
        function (err, response, metadata) {
            // Response is response from notification
            // Metadata contains activationType, activationAt, deliveredAt
        }
    );
};