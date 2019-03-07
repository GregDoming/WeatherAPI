/* eslint-disable no-console */
/* eslint-disable quotes */
const rp = require('request-promise');
const inputHelper = require('../helpers/inputHelper.js');

require('dotenv').config();

const getWeatherByCity = async (city) => {
  const woeidUri = `https://www.metaweather.com/api/location/search/?query=${city}`;
  const metaWeatherOptions = {
    uri: woeidUri,
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true,
  };

  const woeid = await rp(metaWeatherOptions)
    .then(data => data[0].woeid)
    .catch((err) => {
      console.error(err);
    });

  metaWeatherOptions.uri = `https://www.metaweather.com/api/location/${woeid}/`;

  const weather = rp(metaWeatherOptions)
    .then((data) => {
      console.log(JSON.stringify(data, null, 4));
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
    .then(data => data.results[0].locations[0].adminArea5)
    .catch((err) => {
      console.error(err);
    });
};

getWeatherByCity('chicago');

module.exports = {
  getCityfromAddress,
  getWeatherByCity,
};
