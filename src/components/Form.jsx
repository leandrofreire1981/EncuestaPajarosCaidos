import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import db from '../db1.json'
import { getData } from '../redux/action'
import './form.scss'
import { SaveDb } from './SaveDb'



export default function Form() {
   const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ input, setInput ] = useState()
    const errorRef = useRef(null);

    function handleOnSubmit(e){
        e.preventDefault()
        for (let i = 0; i < db.items.length - 1; i++) {
            if(db.items[i].type !== 'submit' && db.items[i].required && input && input[db.items[i].name]){
                console.log('cooorrecto', input[db.items[i].name])
                continue
            }
            if(db.items[i].type !== 'submit' && db.items[i].required && input && input[db.items[i].name] === 'on')
                console.log('cooorrecto', db.items[i].name)
            else {
                errorRef.current.innerHTML = `Faltan ingresar ${db.items[i].label}`
                return
            }
        }
        console.log('enviando a Database', input) 
        SaveDb({
            full_name: input.full_name,
            email: input.email,
            birth_date: input.birth_date,
            country_of_origin: input.country_of_origin
        }) 
        dispatch(getData())
        navigate("/showdb")
 
    }

    function handleOnChange(e){
        let aux = []
         if(e.target.type === 'text'){
            if(!/[a-zA-ZñÑ´' ]+/gi.test(e.target.value.charAt(e.target.value.length - 1)))
                errorRef.current.innerHTML = 'Solo se permiten letras y numeros'
            else    
                errorRef.current.innerHTML = ''
            e.target.value = e.target.value.match(/[a-zA-ZñÑ´' ]+/gi)
            aux = []
            aux.push(e.target.value)
            aux.flat()
            e.target.value=aux[0].slice(0,50)
        } 
        if( e.target.type === 'checkbox')
            setInput({...input, [e.target.name]: e.target.checked})
        else
            setInput({...input, [e.target.name]: e.target.value})
    }

    function handleOnSelect(e){
        setInput({...input, [e.target.name]: e.target.value})
    }

    function handleOnButton(){
        dispatch(getData())
        navigate("/showdb")
    }

  return (
    <form onSubmit={handleOnSubmit} className="form">
        <h2>Encuesta</h2>
        {db.items.map((r, i) => {
            if(r.type === 'submit')
                return (
                    <div key={i}>
                        <input type={r.type} name={r.name} onChange={handleOnChange} value={input && input[r.name]} className='submit' />
                        <input className='submit' type='button' value='Datos' onClick={handleOnButton} />
                        <div ref={errorRef} ></div>
                    </div>
                )
            else
            if(r.type === 'select')
                return(
                    <div key = {i + 'a'}>
                        <label>{r.label}</label>
                        <select onChange={handleOnSelect} name={r.name} className='select' >
                            <option value='Seleccione un pais'>Seleccione un pais</option>
                            {
                                r.options.map((r2, i) => 
                                    <option key={i} value={r2.value} className='option'>{r2.label}</option>
                                )
                            }
                        </select>
                    </div>
                )
            else
                return (
                    <div key={i}>
                        <label>{r.label} </label>
                        <input type={r.type} name={r.name} onChange={handleOnChange} value={input && input[r.name]} className='input' />
                        <div ref={errorRef} ></div>
                    </div>
                    )
        }
        )}
    </form>
  )
}
