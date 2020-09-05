import React, { useState, useContext } from 'react'
import TripContext from '../../contexts/trip'
import './index.css'

export default function Form(){
    const [inputList, setInputList] = useState([{ destination: "", stay_time: "" }]);
    const [origin, setOrigin] = useState('');
    const {traceRoute} = useContext(TripContext);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const handleTraceRoute = () =>{
        const list = inputList;
        var destinations = list.map(item => item.destination)
        traceRoute(origin, destinations)
    }

    return(
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
                        placeholder="Tempo de Permanência" 
                        name="stay_time" 
                        style={{gridArea: 'b'}}
                        value={x.stay_time}
                        onChange={e => handleInputChange(e, i)}/>

                        <span 
                        onClick={() => handleRemoveClick(i)} 
                        style={{gridArea: 'c'}}>Remover</span>
                    </div>
                )
            })}
            <span onClick={() => setInputList([...inputList, {destination: '', stay_time: ''}])}>Adicionar destino</span>
            <p onClick={() => handleTraceRoute()}>Calcular Rota</p>
        </form>
    )
}