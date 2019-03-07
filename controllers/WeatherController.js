/* eslint-disable no-console */
/* eslint-disable quotes */
const rp = require('request-promise');
const inputHelper = require('../helpers/inputHelper.js');

require('dotenv').config();

const getWeatherByCity = (city) => {
  const metaWeatherOptions = {
    uri: `https://www.metaweather.com/api/location/search/?lattlong=${city}`,
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true,
  };

  return rp(metaWeatherOptions)
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.error(err);
    });
};

const getCityfromAddress = (str) => {
  const location = inputHelper.parseLocationInput(str);

  const mapQuestOptions = {
    uri: `https://www.mapquestapi.com/geocoding/v1/address?key=${process.env.MAPQUEST_KEY}&inFormat=kvp&outFormat=json&location=${location}&thumbMaps=false`,
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true,
  };

  return rp(mapQuestOptions)
    .then((data) => { 
      const city = data.results[0].locations[0].adminArea5;
      return city;
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  getCityfromAddress,
  getWeatherByCity,
}

