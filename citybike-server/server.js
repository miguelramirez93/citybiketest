const express = require("express");
var cors = require('cors')
const http = require("http");
const socketIo = require("socket.io");
const cityBikesConstants = require('./constants/cityBikes.constants');
const ioEventsConstants = require('./constants/ioevents.constants');
const bikesInfoManagerClass = require('./managers/bikesInfo.manager');
const bikesInfoManager = new bikesInfoManagerClass()
const cityBikesClient = require('./clients/citybikes/client');
const moment = require('moment')

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json())
app.use(index);

const server = http.createServer(app);
const io = socketIo(server); // < Interesting!
const interval = 1000;

// Get bikes data each "interval" seconds.
setInterval(() => {
  cityBikesClient.getNetworkInfo(cityBikesConstants.MIAMI_NETWORK_NAME)
    .then((netData) => {
      const totalEmptySlots = netData.network.stations.map((station) => station.empty_slots).reduce((a, b) => a + b, 0)
      const totalFreeBikes = netData.network.stations.map((station) => station.free_bikes).reduce((a, b) => a + b, 0)
      if (bikesInfoManager.bikesData.length) {
        if (moment().diff(moment(bikesInfoManager.bikesData[bikesInfoManager.bikesData.length - 1].date), 'minute') >= 1) {
          bikesInfoManager.setBikesData(netData.network.stations, totalEmptySlots, totalFreeBikes);
        }
      } else {
        bikesInfoManager.setBikesData(netData.network.stations);
      }
      bikesInfoManager.setLocationInfo(netData.network.location);
      io.emit(ioEventsConstants.events.BIKES_UPDATE_DATA, { stations: netData.network.stations, currLocation: netData.network.location, storedDates: bikesInfoManager.getStoredDates(), totalEmptySlots, totalFreeBikes });
    }).catch(() => {
      io.emit(ioEventsConstants.events.BIKES_UPDATE_DATA_ERROR, {
        message: ioEventsConstants.errors.NETWORK_INFO_ERROR
      })
    })
}, interval);

io.emit('server:init', {})

io.on("connection", socket => {
  var socketId = socket.id;
  var clientIp = socket.request.connection.remoteAddress;
  console.log('New connection ' + socketId + ' from ' + clientIp);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});



server.listen(port, () => console.log(`Listening on port ${port}`));



