const request = require('request');
const dotenv = require('dotenv');

dotenv.config();

const geocode = (address, callback) => {
    const geocodeSecret = process.env.GEOCODE_SECRET;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${geocodeSecret}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng,
                location: body.results[0].formatted_address
            });
        };
    });
};

module.exports = geocode;