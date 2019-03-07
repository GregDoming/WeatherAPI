/* eslint-disable no-console */
/* eslint-disable quotes */
const rp = require('request-promise');
require('dotenv').config();

// const options = {
//   uri: 'https://www.metaweather.com/api/location/search/?query=',
//   headers: {
//     'User-Agent': 'Request-Promise',
//   },
//   json: true, // Automatically parses the JSON string in the response
// };


const getWeatherByLocation = (...args) => {

const getLatLongfromAddress = (...args) => {
  
  const mapQuestOptions = {
    uri: `https://www.mapquestapi.com/geocoding/v1/address?key=${process.env.MAPQUEST_KEY}&inFormat=kvp&outFormat=json&location=Denver%2C+CO&thumbMaps=false`,
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true, // Automatically parses the JSON string in the response
  };

  rp(mapQuestOptions)
    .then((data) => {
      const { latLng } = data.results[0].locations[0];
      return latLng;
    })
    .catch((err) => {
      console.error(err);
    });
};

getLatLongfromAddress();
