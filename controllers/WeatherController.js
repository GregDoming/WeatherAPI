/* eslint-disable no-console */
/* eslint-disable quotes */
const rp = require('request-promise');
const inputHelper = require('../helpers/inputHelper.js');

require('dotenv').config();



const getWeatherByLatLng = (latLngObj) => {

  const metaWeatherOptions = {
    uri: `https://www.metaweather.com/api/location/search/?query=${latLngObj.lat},${latLngObj.lng}`,
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true, // Automatically parses the JSON string in the response
  };

  rp(metaWeatherOptions)
    .then((data) => {
    })
    .catch((err) => {
      console.error(err);
    });
}

const getLatLongfromAddress = (str) => {
  const location = inputHelper.parseLocationInput(str);

  const mapQuestOptions = {
    uri: `https://www.mapquestapi.com/geocoding/v1/address?key=${process.env.MAPQUEST_KEY}&inFormat=kvp&outFormat=json&location=${location}thumbMaps=false`,
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true, // Automatically parses the JSON string in the response
  };

  return rp(mapQuestOptions)
    .then((data) => {
      const { latLng } = data.results[0].locations[0];
      return latLng;
    })
    .catch((err) => {
      console.error(err);
    });
};

getLatLongfromAddress('chicago').then(data => console.log(data));
