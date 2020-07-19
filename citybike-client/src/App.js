import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { Map, TileLayer } from "react-leaflet";

// Local
import configVars from './config/variables';
import locationManager from './data/managers/location.data.manager';
import stationManager from './data/managers/station.data.manager';
import StationMarkerList from "./components/StationMarker/StationMarkerList/StationMarkerList";
import stationMaper from './data/mapers/station.maper';
import Select from "./components/UI/Select/Select";
import appConstatnts from './constants/app.constants';
import './App.css'

class App extends Component {
  constructor() {
    super();

    this.state = {
      markers: [],
      updateDates: [],
      totalEmptySlots: 0,
      totalFreeBikes: 0,
      response: false,
      endpoint: configVars.MAIN_SERVER_URI,
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
      city: '',
      live: true,
      errorMessage: '',
    };

  }

  async initInterface(location) {
    const updatedState = { ...this.state }
    try {
      let currentServerLoc = location;

      if (location) {
        currentServerLoc = await locationManager.getLocationInfo()
      }

      updatedState.lat = currentServerLoc.latitude;
      updatedState.lng = currentServerLoc.longitude;
      updatedState.city = currentServerLoc.city;
      updatedState.errorMessage = '';

    } catch (error) {
      updatedState.errorMessage = appConstatnts.errors.GET_DATA_ERROR;
    }
    this.setState(updatedState);
  }

  async componentDidMount() {

    this.initInterface();

    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on(appConstatnts.events.BIKES_UPDATE_DATA, (data) => {

      if (data.currLocation && this.state.city !== data.currLocation.city) {
        this.initInterface(data.currLocation);
      }

      if (this.state.live) {
        const updatedState = { ...this.state }
        updatedState.markers = stationMaper.stationListToStationMarkerList(data.stations)
        updatedState.totalEmptySlots = data.totalEmptySlots
        updatedState.totalFreeBikes = data.totalFreeBikes
        updatedState.updateDates = stationMaper.stationUpdateDateToSelectField(data.storedDates)
        updatedState.updateDates.push({ key: appConstatnts.values.LIVE, value: appConstatnts.values.LIVE })
        updatedState.updateDates = updatedState.updateDates.reverse()
        updatedState.errorMessage = '';
        this.setState(updatedState);
        console.log('live updt');
      }
    })

    socket.on(appConstatnts.events.BIKES_UPDATE_DATA_ERROR, (data) => {
      const updatedState = { ...this.state }
      updatedState.errorMessage = data.message;
      this.setState(updatedState);
    })

  }

  onSelectHistoryChangeHandler = async ({ target: { value } }) => {
    const updatedState = { ...this.state }
    try {
      if (value === appConstatnts.values.LIVE) {
        updatedState.live = true
      } else {
        const stationsData = await stationManager.getStationsInfoByDate(value)
        updatedState.live = false
        updatedState.errorMessage = ''
        updatedState.markers = stationMaper.stationListToStationMarkerList(stationsData)
      }
    } catch (error) {
      updatedState.errorMessage = appConstatnts.errors.HISTORCAL_DATA_ERROR
    }
    this.setState(updatedState)

  }

  render() {
    const position = [this.state.lat, this.state.lng]




    return (

      <div className="main-container" >
        <div>
          <h3>Total Empty Slots: </h3>
          <p>{this.state.totalEmptySlots}</p>
          <h3>Total Free Bikes: </h3>
          <p>{this.state.totalFreeBikes}</p>
          <h3>Mode:</h3>
          <Select options={this.state.updateDates} onChange={this.onSelectHistoryChangeHandler} />
          {this.state.errorMessage ? <p className="error-message">{this.state.errorMessage}</p> : null}
        </div>
        <div className="map-container">
          <div className="map">
            <h1> City Bikes in {this.state.city} </h1>
            <Map center={position} zoom={this.state.zoom}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <StationMarkerList markers={this.state.markers} />
            </Map>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
