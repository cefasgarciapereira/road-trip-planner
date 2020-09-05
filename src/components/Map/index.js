/* global google */
import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  DirectionsRenderer
} from "react-google-maps";
import { toast } from 'react-toastify';

class MapDirectionsRenderer extends React.Component {
  state = {
    directions: null,
    error: null
  };

  componentDidMount() {
    const { places, travelMode } = this.props;
    if(places.length >= 2){
        const waypoints = places.map(p =>({
          location: {lat: p.latitude, lng:p.longitude},
          stopover: true
      }))
      const origin = waypoints.shift().location;
      const destination = waypoints.pop().location;
      
      

      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: travelMode,
          waypoints: waypoints
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          } else {
            toast.error("Um erro inesperado ocorreu. Reformule os parâmetros de busca.", {position: toast.POSITION.TOP_RIGHT});
            this.setState({ error: 'Erro inesperado' });
          }
        }
      );
    }
  }

  render() {
    if (this.state.error) {
      return null;
    }
    return (this.state.directions && <DirectionsRenderer directions={this.state.directions} />)
  }
}

const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultCenter={props.defaultCenter}
      defaultZoom={props.defaultZoom}
    >
      {props.markers.map((marker, index) => {
        const position = { lat: marker.latitude, lng: marker.longitude };
        return <Marker key={index} position={position} />;
      })}
      <MapDirectionsRenderer
        places={props.markers}
        travelMode={google.maps.TravelMode.DRIVING}
      />
    </GoogleMap>
  ))
);

export default Map;
