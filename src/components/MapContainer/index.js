import React from 'react';
import Map from '../Map';

const googleMapsApiKey = "AIzaSyBC-9Mp5zO3H8t2E9uBIbYfDS2OzHVxl_w";

const MapContainer = (props) => {
  const {places, loadingElement,containerElement,mapElement,defaultCenter,defaultZoom} = props;

  return (
    <Map
      googleMapURL={
        'https://maps.googleapis.com/maps/api/js?key=' +
        googleMapsApiKey +
        '&libraries=geometry,drawing,places'
      }
      markers={places}
      loadingElement={loadingElement || <div style={{height: `100vw`}}/>}
      containerElement={containerElement || <div style={{height: "100vh"}}/>}
      mapElement={mapElement || <div style={{height: `100%`}}/>}
      defaultCenter={defaultCenter || {lat: 25.798939, lng: -80.291409}}
      defaultZoom={defaultZoom || 11}
    />
  );
};

export default MapContainer;