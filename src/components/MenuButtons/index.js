import React from 'react'
import { MdExplore, MdAdd} from "react-icons/md"
import './styles.css'

export default function MenuButtons(props){
    console.log(props)
    return(
        <div className={'button_container'}>
            <MdAdd 
            size={24} 
            color="#4185F4" 
            className={'explore_icon'}
            onClick={() => props.addInput()}/>

            <MdExplore 
            size={32} 
            color="#4185F4" 
            className={'explore_icon'}
            onClick={() => props.handleTraceRoute()}/>
        </div>
    )
}