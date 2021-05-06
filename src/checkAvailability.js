'use strict';

const fetch = require("node-fetch");
const monthList = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const API_ENDPOINT = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin";
let HEADERS = {
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
    'accept': 'application/json',
    'Accept-Language': 'hi_IN'
}

exports.checkVaccineAvailabilityFor = async function (userInput) {
    var apiResponse = {};
    let dateList = getNext20Days();
    for (let date of dateList) {
        let key = date.split('-')[0] + " " + monthList[date.split('-')[1] - 1] + " " + date.split('-')[2];
        let response = await invokeAppointmentApiFor(userInput.pincode, date);
        if (response['centers'] && response['centers'].length > 0) {
            let availableCenters = [];
            for (let center of response['centers']) {
                if (center.sessions[0].min_age_limit <= userInput.age && center.sessions[0].available_capacity != 0) {
                    availableCenters.push(center);
                }
            }
            if (availableCenters.length != 0) {
                apiResponse[key] = availableCenters;
            } else {
                apiResponse[key] = "No Slots Available";
            }
        } else {
            apiResponse[key] = "No Slots Available";
        }
    }
    return apiResponse;
};

function getNext20Days() {
    let dateArr = [];
    for (let i = 0; i <= 25; i++) {
        let d = new Date(Date.now() + i * 24 * 60 * 60 * 1000),
            month = d.getMonth() + 1,
            day = d.getDate(),
            year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        dateArr.push([day, month, year].join('-'));
    }
    return dateArr;
}

async function invokeAppointmentApiFor(pincode, date) {
    let APPOINTMENT = API_ENDPOINT + "?pincode=" + pincode + "&date=" + date + "&q=" + generateUniqueId();
    //console.log("Final URL : ", APPOINTMENT);
    let apiResponse = await fetch(APPOINTMENT, {
        headers: HEADERS
    });
    let jsonResponse = await apiResponse.json();
    return jsonResponse;
}

function generateUniqueId() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}