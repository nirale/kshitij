const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=fb293e2a701962b8e44633a857b624d4&units=metric';
    //18.5204,73.8567
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to Weather Service.', undefined);
        } else if (response.body.error) {
            console.log('Unable to find Location.');
            callback('Unable to find Location.', undefined);
        }
        //  else {
        //     callback(undefined, response.body.weather[0].description.charAt(0).toUpperCase() + response.body.weather[0].description.slice(1) + '.There is ' + response.body.main.humidity + '% humidity.Current Temperature is ' + response.body.main.temp + ' Celsius');
        // }

         else {
            callback(undefined,{
                description:response.body.weather[0].description.charAt(0).toUpperCase() + response.body.weather[0].description.slice(1),
                humidity:response.body.main.humidity,
                temperature:response.body.main.temp,
                windSpeed:response.body.wind.speed,
                pressure:response.body.main.pressure,
                icon:response.body.weather[0].icon,
                weatherMain:response.body.weather[0].main,

            });
        }
    });
}

module.exports = forecast;
// const forecast = (longitude, latitude, callback) => {
//     const url = 'https://api.darksky.net/forecast/0c6f8b196cf16c5e0ea25cf4ec71833c/' + longitude + ',' + latitude + '?units=si';
//     //18.5204,73.8567
//     request({
//         url: url,
//         json: true
//     }, (error, response) => {
//         if (error) {
//             callback('Unable to connect to Weather Service.', undefined);
//         } else if (response.body.error) {
//             console.log('Unable to find Location.');
//             callback('Unable to find Location.', undefined);
//         } else {
//             callback(undefined, response.body.currently.summary + '.There is a ' + response.body.currently.precipProbability + '% chance of rain.Current Temperature is ' + response.body.currently.temperature + ' Celsius');
//         }
//     });
// }

// module.exports = forecast;