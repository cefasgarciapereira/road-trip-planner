import React, {useState} from 'react'
import Form from '../Form'
import {MdApps, MdArrowDropDown} from "react-icons/md"
import './styles.css'

export default function Menu(){
    const [isOpen, setIsOpen] = useState(false)

    return(
        isOpen ?
        <div className={'menu'}>
            <MdArrowDropDown 
            className={'icon_minimize'}
            size={24} 
            onClick={() => setIsOpen(false)}/>
            <Form/>   
        </div>
        : <MdApps 
        size={32}
        className={'menu_closed'}
        onClick={() => setIsOpen(true)}/>
    )
}