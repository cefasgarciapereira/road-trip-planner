import React, { useState, useContext, useEffect} from 'react'
import TripContext from '../../contexts/trip'
import {MdDeleteForever} from "react-icons/md"
import { toast } from 'react-toastify'
import MenuButtons from '../MenuButtons'
import './index.css'

export default function Form(){
    const [inputList, setInputList] = useState([{ destination: "", stay_time: "" }]);
    const [origin, setOrigin] = useState('');
    const {traceRoute, places} = useContext(TripContext);

    const addInput = () =>{
        setInputList([...inputList, {destination: '', stay_time: ''}])
    }

    useEffect(() => {
        if(places.length > 0){
            var list = []
            setOrigin(places[0].destination)
            places.map((place,i) => {
                if(i > 0){
                    list.push({destination: place.destination, stay_time: place.stay_time})
                }
            })
            console.log(list)
            setInputList(list)
        }
    }, [])

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const handleRemoveClick = index => {
        if(inputList.length > 1){
            const list = [...inputList];
            list.splice(index, 1);
            setInputList(list);
        }else{
            toast.warn("É necessário pelo menos um destino.", {position: toast.POSITION.TOP_RIGHT});
        }
    };

    const handleTraceRoute = () =>{
        traceRoute(origin, inputList)
    }

    return(
        <div className={'form_container'}>
                <form className={'trip_form'} action={""}>
                <input 
                id="pac-input" 
                placeholder="Origem" 
                name="origin" 
                style={{gridArea: 'a'}}
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}/>
                {inputList.map((x,i) => {
                    return (
                        <div className={'destination_container'}>
                            <input 
                            placeholder="Destino" 
                            name="destination" 
                            style={{gridArea: 'a'}}
                            value={x.destination}
                            onChange={e => handleInputChange(e, i)}/>

                            <input 
                            placeholder="Tempo de Permanência (min)" 
                            name="stay_time" 
                            style={{gridArea: 'b'}}
                            value={x.stay_time}
                            onChange={e => handleInputChange(e, i)}/>

                            <MdDeleteForever
                            className={'delete_icon'}
                            onClick={() => handleRemoveClick(i)} 
                            style={{gridArea: 'c'}}
                            size={24}
                            color="#DB4437"/>
                        </div>
                    )
                })}
            </form>
            <MenuButtons
            addInput={() => addInput()}
            handleTraceRoute={() => handleTraceRoute()}
            inputList={inputList}
            />
        </div>
    )
}