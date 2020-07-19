const express = require("express");
const router = express.Router();
const locationController = require('../api/controllers/location.controller')
const stationController = require('../api/controllers/stations.controller')
router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

router.get("/location", locationController.getCurrentLocation)
router.post("/station/by-date", stationController.getStationsInfoByDate)

module.exports = router;