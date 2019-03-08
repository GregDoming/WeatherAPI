const express = require('express');
const bodyParser = require('body-parser');
const weatherController = require('./controllers/WeatherController');

const app = express();
const port = 4400;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(weatherController.allowCrossDomain);

app.get('/', (req, res) => {
  res.send('Get request to home route reached');
});

app.get('/api/forecast', weatherController.checkAuthorization, weatherController.getCityfromAddress, weatherController.getWeatherByCity);

// app.post('/api/forecast', weatherController.getCityfromAddress, weatherController.getWeatherByCity);

app.listen(port, () => console.log('Listening on port 4400'));
