import React, {createContext, useState, useEffect} from 'react';
import {default as GoogleMap} from '../components/MapContainer';
import axios from 'axios';
import { toast } from 'react-toastify';

const TripContext = createContext();

export const TripProvider = ({children}) => {
    const [places, setPlaces] = useState([])
    const [coordinates, setCoordinates] = useState([])
    const [mapComponent, setMapComponent] = useState(<GoogleMap defaultZoom={7} places={[]} key={new Date().getTime()}/>)
    const [tripDetails, setTripDetails] = useState([])

    useEffect(() => {
        if(places.length > 0){
            updateMapComponent();
            getTripDetails();
        }
    }, [coordinates])

    const traceRoute = async (origin, destinations) =>{
        const places = validateTrip(origin, destinations);
        if(places){
            getCoordinates(places)
        }
    }

    const validateTrip = (origin, destinations) =>{
        var placesTemp = []

        if(origin){
            placesTemp.push({destination: origin})
            destinations.map(dest => {
                if(dest){
                    placesTemp.push(dest)
                }else{
                    toast.warn("Preencha todos os campos", {position: toast.POSITION.TOP_RIGHT});
                    return false
                }
            })
        }else{
            toast.warn("Preencha todos os campos", {position: toast.POSITION.TOP_RIGHT});
            return false
        }
        setPlaces(placesTemp)
        return placesTemp
    }

    const getCoordinates = async (places) =>{
        let coordinates = []
        for(let place of places){
            try {
                let response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${place.destination.replace(' ','+')}&key=AIzaSyBC-9Mp5zO3H8t2E9uBIbYfDS2OzHVxl_w`)
                coordinates.push({latitude: response.data.results[0].geometry.location.lat, longitude: response.data.results[0].geometry.location.lng});
            } catch(error) {
                toast.warn('Erro inesperado: '+error, {position: toast.POSITION.TOP_RIGHT});
            }
        }
        setCoordinates(coordinates)
    }

    const updateMapComponent = () =>{
        /*const test = [
            {latitude: 25.8103146,longitude: -80.1751609},
            {latitude: 27.9947147,longitude: -82.5943645},
            {latitude: 28.4813018,longitude: -81.4387899}
          ]*/
        setMapComponent(<GoogleMap defaultZoom={7} places={coordinates} key={new Date().getTime()}/>)
    }

    const getTripDetails = async () => {
        //{duration: '3 horas e 4 minutos', distance: '200km', stay_time: '30 minutos' }
        var tripDetailsTemp = []
        for(var i = 0; i < coordinates.length-1; i++){
            try {
                let origin = `${coordinates[i].latitude},${coordinates[i].longitude}`
                let destination = `${coordinates[i+1].latitude},${coordinates[i+1].longitude}`

                const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?&origins=${origin}&destinations=${destination}&key=AIzaSyBC-9Mp5zO3H8t2E9uBIbYfDS2OzHVxl_w`)
                const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${coordinates[i+1].latitude}&lon=${coordinates[i+1].longitude}&units=metric&lang=pt_br&appid=a5092ff0f96f0c4faff8e05cb7503356`)
                tripDetailsTemp.push({
                    origin: response.data.origin_addresses[0],
                    destination: response.data.destination_addresses[0],
                    duration: response.data.rows[0].elements[0].duration.text,
                    distance: response.data.rows[0].elements[0].distance.text,
                    temp: weatherResponse.data.main.temp,
                    weather: weatherResponse.data.weather[0].description,
                    stay_time: places[i+1].stay_time
                })
            } catch(error) {
                //toast.warn('Erro inesperado: '+error, {position: toast.POSITION.TOP_RIGHT});
                console.log(error);
            }
        }
        setTripDetails(tripDetailsTemp)
    }
    
    return(
        <TripContext.Provider
        value={{
            traceRoute, 
            places, 
            mapComponent,
            tripDetails}}
        >
            {children}
        </TripContext.Provider>
    );
}

export default TripContext;