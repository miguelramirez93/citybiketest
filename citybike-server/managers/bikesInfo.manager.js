class bikesInfoManager {

    constructor() {

        if (!!bikesInfoManager.instance) {
            return bikesInfoManager.instance;
        }

        bikesInfoManager.instance = this;
    }
    
    bikesData = [];
    locationData = {};

    setBikesData = (newData, totalEmptySlots, totalFreeBikes) => {
        const dateStored = new Date();
        this.bikesData.push({
            date: dateStored,
            data: newData,
            totalEmptySlots,
            totalFreeBikes
        })
    }

    setLocationInfo = (locationData) => {
        this.locationData = locationData;
    }

    getStoredDates = () => this.bikesData.map((item) => item.date)

}

module.exports = bikesInfoManager;