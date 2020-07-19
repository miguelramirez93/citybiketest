const bikesInfoManager = require('../../managers/bikesInfo.manager')

const locationController = {
    getCurrentLocation: (req, res) => {
        const bikesInfoInstance = new bikesInfoManager();
        res.send(bikesInfoInstance.locationData).status(200);
    }
}

module.exports = locationController;