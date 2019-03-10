/* eslint-disable no-console */
/* eslint-disable quotes */
const rp = require('request-promise');
const inputHelper = require('../helpers/inputHelper.js');

require('dotenv').config();
/**
 * Returns 401 if authorization header does not match password
 * @param {string} req.headers.authorization Checks the authorization header
 * to see if the super secret password '12345' was included
 */

const checkAuthorization = (req, res, next) => {
  if (req.headers.authorization !== '12345') res.status(401).send({ message: 'Unauthorized User' });
  next();
};

/**
 * Takes an address and returns the city nearest to the coordinates according to Mapquest
 * @param {string} req.query A query string sent with the user's input address
 */

const getCityfromAddress = async (req, res, next) => {
  const queryString = Object.keys(req.query);
  const location = inputHelper.parseLocationInput(queryString[0]);
  const mapQuestOptions = {
    uri: `https://www.mapquestapi.com/geocoding/v1/address?key=${process.env.MAPQUEST_KEY}&inFormat=kvp&outFormat=json&location=${location}&thumbMaps=false`,
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true,
  };
  console.log(req.headers.authorization);

  await rp(mapQuestOptions)
    .then((address) => {
      res.locals.city = address.results[0].locations[0].adminArea5;
      next();
    })
    .catch((err) => {
      console.log('error 3');
    });
  if (!res.locals.city) res.status(202).send({ message: 'Invalid Input' });
};


/**
 * Takes in the name of a city and returns a woeid for the city if it is in the Metaweather database
 * @param {string} res.locals.city A string representing the
 * city closest to the search results from getCityFroMAddress.
 */

const getWeatherByCity = async (req, res) => {
  const woeidUri = `https://www.metaweather.com/api/location/search/?query=${res.locals.city}`;
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
      console.error('error 1');
    });

  metaWeatherOptions.uri = `https://www.metaweather.com/api/location/${woeid}/`;

  const weather = await rp(metaWeatherOptions)
    .then((data) => {
      // weather[0].city = res.locals.city;
      console.log('weather obtained');
      return data;
    })
    .catch((err) => {
      console.log('error 2');
    });
  if (!weather) res.status(202).send({ message: 'Sorry I can only give the Weather to large cities.' });
  weather.city = res.locals.city;
  console.log(weather)
  await res.send(weather);
};

module.exports = {
  checkAuthorization,
  getCityfromAddress,
  getWeatherByCity,
};
