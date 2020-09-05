import React, {useState,useContext} from 'react'
import TripContext from '../../contexts/trip'
import { MdAssignment, MdArrowDropDown } from "react-icons/md"
import './styles.css'

export default function TripDetails(){
    const {tripDetails} = useContext(TripContext);
    const [isOpen, setIsOpen] = useState(false)

    return(
        isOpen ?
        <div className={'trip_details_container'}>
            <MdArrowDropDown 
            className={'icon_minimize'}
            size={24} 
            onClick={() => setIsOpen(false)}/>
            {tripDetails.map(detail => 
                <p style={{margin: '10px 0', border: 'solid 1px #aaa', padding: '10px'}}>
                <b>Saindo de:</b> {detail.origin}
                <br/><b>Com destino a:</b> {detail.destination}
                <br/><b>Distância:</b> {detail.distance} 
                <br/><b>Tempo:</b> {detail.duration} 
                <br/> <b>Permanência:</b> {detail.stay_time && `${detail.stay_time} minutos`}
                <br/><b>Temperatura:</b> {detail.temp}ºC {`com ${detail.weather}`} </p>)}
        </div>
        : <MdAssignment 
        onClick={() => setIsOpen(true)}
        size={32} 
        className={'trip_details_closed'}/>
    )
}