// const request = require('request');

// const geoCode = (address, callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoia3NoaXRpam5pcmFsZSIsImEiOiJjazg2MmhueWkwY2t1M2twZXdybndlc2pqIn0.HyImMGcaHmHCmszKqvtj5g&limit=1'

//     request({
//         url: url,
//         json: true
//     }, (error, response) => {
//         if (error) {
//             callback('Please check your Internet Connection.', undefined)
//         } else if (response.body.features.length === 0) {
//             callback('Unable to find Location.Try another search.', undefined)
//         } else {
//             callback(undefined, {
//                 longitude: response.body.features[0].center[0],
//                 latitude: response.body.features[0].center[1],
//                 place_name: response.body.features[0].place_name
//             })
//         }
//     })
// }

// module.exports = geoCode;
const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoia3NoaXRpam5pcmFsZSIsImEiOiJjazg2MmhueWkwY2t1M2twZXdybndlc2pqIn0.HyImMGcaHmHCmszKqvtj5g&limit=1'

    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Please check your Internet Connection.', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find Location.Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                place_name: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode;