'use strict';
const inquirer = require('inquirer');

exports.fetchUserInput = async function () {
    console.log('Hi, Initializing..');
    var questions = [
        {
            type: 'input',
            name: 'pincode',
            message: "What's your pincode ?",
            validate: function (value) {
                var pass = value.match("^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$");
                if (pass) {
                    return true;
                }

                return 'Please enter a valid pincode 🧐';
            },
        },
        {
            type: 'input',
            name: 'age',
            message: "What's your age ?",
            validate: function (value) {
                var pass = value.match("^[1-9]{1,2}$");
                if (pass) {
                    return true;
                }

                return 'Please enter a valid age 🧐';
            },
        }
    ];

    let answers = await inquirer.prompt(questions);
    return answers;
}