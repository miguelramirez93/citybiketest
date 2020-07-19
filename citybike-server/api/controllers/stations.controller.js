const bikesInfoManager = require('../../managers/bikesInfo.manager')
const moment = require('moment')

const stationController = {
    getStationsInfoByDate: (req, res) => {
        const bikesInfoInstance = new bikesInfoManager();
        const infoDate = req.body.date
        const stationsInfo = bikesInfoInstance.bikesData.find((station) => moment(station.date).isSame(moment(infoDate)))
        const response = stationsInfo ? stationsInfo.data : null
        res.send(response).status(200);
    }
}

module.exports = stationController;