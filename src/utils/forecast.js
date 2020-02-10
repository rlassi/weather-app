const request = require('request');
const dotenv = require('dotenv');

dotenv.config();

const forecast = (latitude, longitude, callback) => {
    const darkSkySecret = process.env.DARKSKY_SECRET;
    const url = `https://api.darksky.net/forecast/${darkSkySecret}/` + latitude + ',' + longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        };
    });
};

module.exports = forecast;