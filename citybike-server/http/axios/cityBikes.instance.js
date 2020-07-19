//External
const axios = require('axios')

// Local
const config = require('../../config/variables')

const axiosINstance = axios.create({
    baseURL: config.cityBikesURI
  });

module.exports = axiosINstance;