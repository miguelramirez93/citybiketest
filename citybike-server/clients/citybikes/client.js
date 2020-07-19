// External
const axios = require('../../http/axios/cityBikes.instance')

const client = {
    getNetworkInfo: (netName) => {
        return axios.get(`/v2/networks/${netName}`)
        .then( response => response.data)
        
    } 
}

module.exports = client
