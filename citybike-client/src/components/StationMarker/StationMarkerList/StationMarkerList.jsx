import React, { Fragment } from 'react';
import StationMarker from '../StationMarker';
const StationMarkerList = (props) => {
    const { markers } = props;
    const markesList = markers.map(({ key, ...props}) => (
        <StationMarker key={key} {...props} />
    ))
    return <Fragment>{markesList}</Fragment>
}

export default StationMarkerList;