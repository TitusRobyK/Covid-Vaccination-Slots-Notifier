const figlet = require('figlet');
const chalk = require('chalk');
const clear = require('clear');
const centerAlign = require('center-align');

clear();

const display = {
  options: ['greenBright', 'yellowBright', 'cyanBright'],
  strings: [
    `${figlet.textSync('Covid Vaccine Slots Notifier')}`,
    '\nThis package is developed by Titus Roby K.',
    '\nThis Utility would periodically Check Slot availability & based on the current availability, Notification would be sent based on Users choice\n',
  ],
};

module.exports = function paintTerminal(
  options = display.options,
  string = display.strings
) {
  const terminalWidth = process.stdout.columns;
  for (let i = 0; i < 3; i++) {
    console.log(chalk`{${options[i]}${centerAlign(string[i], terminalWidth)}}`);
  }
};