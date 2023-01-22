import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import saveDv from '../controllers/saveDb'
import db from '../db.json'
import { getData } from '../redux/actions'
import './form.scss'


export default function Form() {
    console.log('form', db.items[0].style)
   const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ input, setInput ] = useState()
    const errorRef = useRef(null);

    function handleOnSubmit(e){
        e.preventDefault()
        for (let i = 0; i < db.items.length - 1; i++) {
            if(db.items[i].type !== 'submit' && input && input[db.items[i].name]){
                console.log('cooorrecto', input[db.items[i].name])
                continue
            }
            if(db.items[i].type !== 'submit' && input && input[db.items[i].name] === 'on')
                console.log('cooorrecto', db.items[i].name)
            if(db.items[i].required && !input[db.items[i].name]){
                errorRef.current.innerHTML = `Faltan ingresar ${db.items[i].label}`
                return
            }
        }
        console.log('enviando a Database', input) 
        saveDv(input) 
        console.log('env ', process.env.REACT_APP_appId)

        dispatch(getData())
        navigate("/showdb")
 
    }

    function handleOnChange(e){
        let aux = []
         if(e.target.type === 'text'){
            if(!/[a-zA-ZñÑ´' ]+/gi.test(e.target.value.charAt(e.target.value.length - 1)))
                errorRef.current.innerHTML = 'Solo se permiten letras'
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
    <form onSubmit={handleOnSubmit} className="form" >
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
                            <option value={r.label}>{r.label}</option>
                            {
                                r.options.map((r2, i) => 
                                    <option key={i} value={r2.value} className='option'>{r2.label}</option>
                                )
                            }
                        </select>
                    </div>
                )
            if(r.type === 'checkbox')
                return(
                    <div key={i + 'b'}>
                        <label>{r.label} </label>
                        <br></br>
                        {
                            r.options?.map(o => (
                            <>
                                <label>{o.label}</label>
                                <input type={r.type} name={r.name} onChange={handleOnChange} value={input && input[r.name]}  style={r.bigText? {height: 100, width:400} : {}} className='checkbox' />
                            </>
                            )) 
                        }
                    </div>   
                )
            else
                return (
                    <div key={i + 'c'}>
                        <label>{r.label} </label>
                        <input type={r.type} name={r.name} onChange={handleOnChange} value={input && input[r.name]}  style={r.bigText? {height: 100, width:400} : {}} className='input' />
                        <div ref={errorRef} ></div>
                    </div>
                    )
        }
        )}
    </form>
  )
}
