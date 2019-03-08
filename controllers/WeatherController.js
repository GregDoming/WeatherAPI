/* eslint-disable no-console */
/* eslint-disable quotes */
const rp = require('request-promise');
const inputHelper = require('../helpers/inputHelper.js');

require('dotenv').config();

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
      console.log('weather obtained');
      return data;
    })
    .catch((err) => {
      console.log('error 2');
    });
    if (!weather) res.status(202).send({ message: 'Sorry I can only give the Weather to large cities.' });

    await res.send(weather);

};

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
  console.log(req.headers.authorization)

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

const checkAuthorization = (req, res, next) => {
  if (req.headers.authorization !== '12345') res.status(401).send({ message: 'Unauthorized User' })
  next();
}

module.exports = {
  checkAuthorization,
  getCityfromAddress,
  getWeatherByCity,
};
