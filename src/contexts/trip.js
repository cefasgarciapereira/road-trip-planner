import React, {createContext, useState, useEffect} from 'react';
import {default as GoogleMap} from '../components/MapContainer';
import axios from 'axios';
import { toast } from 'react-toastify';

const TripContext = createContext();

export const TripProvider = ({children}) => {
    const [places, setPlaces] = useState([])
    const [mapComponent, setMapComponent] = useState(null)

    const updateMapComponent = () =>{
        /*const test = [
            {latitude: 25.8103146,longitude: -80.1751609},
            {latitude: 27.9947147,longitude: -82.5943645},
            {latitude: 28.4813018,longitude: -81.4387899}
          ]*/
        setMapComponent(<GoogleMap defaultZoom={7} places={places} key={new Date().getTime()}/>)
    }

    useEffect(() => {
        if(places.length > 0)
            updateMapComponent();
    }, [places])

    const traceRoute = async (origin, destinations) =>{
        const places = validateTrip(origin, destinations);
        if(places){
            getCoordinates(places)
        }
    }

    const validateTrip = (origin, destinations) =>{
        var places = []
        if(origin){
            places.push(origin)
            destinations.map(dest => {
                if(dest){
                    places.push(dest)
                }else{
                    toast.warn("Preencha todos os campos", {position: toast.POSITION.TOP_RIGHT});
                    return false
                }
            })
        }else{
            toast.warn("Preencha todos os campos", {position: toast.POSITION.TOP_RIGHT});
            return false
        }
        return places
    }

    const getCoordinates = async (places) =>{
        let coordinates = []
        for(let place of places){
            try {
                let response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${place.replace(' ','+')}&key=AIzaSyBC-9Mp5zO3H8t2E9uBIbYfDS2OzHVxl_w`)
                coordinates.push({latitude: response.data.results[0].geometry.location.lat, longitude: response.data.results[0].geometry.location.lng});
            } catch(error) {
                alert('Erro inesperado: '+error)
            }
        }
        setPlaces(coordinates)
    }
    
    return(
        <TripContext.Provider
        value={{traceRoute, places, mapComponent}}
        >
            {children}
        </TripContext.Provider>
    );
}

export default TripContext;