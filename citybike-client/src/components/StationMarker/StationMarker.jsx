import React from 'react';
import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
export const suitcasePoint = new L.Icon({
    iconUrl: require('../../assets/location.png'),
    iconRetinaUrl: require('../../assets/location.png'),
    iconAnchor: [20, 40],
    popupAnchor: [0, -35],
    iconSize: [40, 40],
  })

const StationMarker = (props) => {
    const { content, position } = props;
    return (
        <Marker position={position} icon={suitcasePoint}>
            <Popup>{content}</Popup>
        </Marker>
    )
}

export default StationMarker;