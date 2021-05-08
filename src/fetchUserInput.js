'use strict';
const inquirer = require('inquirer');
const emailValidator = require("email-validator");

exports.fetchUserInput = async function () {
    console.log('Hi, Initializing..');
    let questions = [
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
            }
        },
        {
            type: 'input',
            name: 'age',
            message: "What's your age ?",
            validate: function (value) {
                var pass = value.match("^[0-9]{1,2}$");
                if (pass) {
                    return true;
                }
                return 'Please enter a valid age 🧐';
            }
        },
        {
            type: 'confirm',
            name: 'isEmailNotificationRequired',
            message: "Do you require Email Notification ? ",
        }
    ];

    let answers = await inquirer.prompt(questions);
    if (answers.isEmailNotificationRequired) {
        answers["emailDetails"] = await fetchEmailSetupDetails();
    }
    console.log(' Thank you for your response , The App will run in background..');
    return answers;
}

async function fetchEmailSetupDetails() {
    let questions = [
        {
            type: 'list',
            name: 'mailservice',
            message: "Input the Mail Service ",
            choices: ['Gmail'],
            filter: function (val) {
                return val.toLowerCase();
            },
        },
        {
            type: 'input',
            name: 'smtpHost',
            message: "Enter the SMTP Host ?",
        },
        {
            type: 'input',
            name: 'authUserName',
            message: "Input Email Service Auth User ",
            validate: function (value) {
                var pass = emailValidator.validate(value);
                if (pass) {
                    return true;
                }
                return 'Please input a valid Email Service Auth User  🧐🧐';
            },
        },
        {
            type: 'password',
            name: 'authPassword',
            message: "Input Email Service Auth Password ",
            mask: '*'
        },
        {
            type: 'input',
            name: 'recieverMailId',
            message: "Input Email to which Vaccine Notification Needs to be sent..",
            validate: function (value) {
                var pass = emailValidator.validate(value);
                if (pass) {
                    return true;
                }
                return 'Please input a valid Email Id 🧐🧐';
            }
        }
    ];
    let answers = await inquirer.prompt(questions);
    return answers;
}