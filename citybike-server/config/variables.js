const dotenv = require('dotenv');
dotenv.config();
const config =  {
    cityBikesURI: process.env.CITY_BIKES_API_URI || 'http://api.citybik.es'
}

module.exports = config;
