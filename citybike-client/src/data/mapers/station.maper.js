import { Fragment } from "react"

import React from 'react'
export default {
    stationListToStationMarkerList: (stations) => {

        return stations.map((station) => ({
            key: station.extra.uid,
            position: [station.latitude, station.longitude],
            content: (
                <Fragment>
                    <h3>{station.extra.address}</h3>
                    <b> Slots: </b> { station.empty_slots}
                    <br/> 
                    <b> Bikes </b> {station.free_bikes} 
                </Fragment>
            )
        }))
    },
    stationUpdateDateToSelectField: (updateDates) => {
        return updateDates.map((updateDate) => ({
            value: updateDate,
            key: updateDate
        }))
    }
}