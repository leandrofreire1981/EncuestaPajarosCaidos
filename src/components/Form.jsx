import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import saveDv from '../controllers/saveDb'
import db from '../db.json'
import { getData } from '../redux/actions'
import './form.scss'
import img from '../img/img1.jpg'



export default function Form() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ input, setInput ] = useState({

    })
    const errorRef = useRef(null);
    const checkRef = useRef()

    function handleOnSubmit(e){
        e.preventDefault()
        for (let i = 0; i < db.items.length - 1; i++) {
            console.log('form: ', db.items[i].label, input[db.items[i].name], db.items[i].name)
            if(db.items[i].required && !input[db.items[i].name]){
                errorRef.current.innerHTML = `Faltan ingresar ${db.items[i].label}`
                return
            }
            if (db.items[i].type === 'checkbox' && input[db.items[i].name] === 'si' && db.items[i + 1].name === `${db.items[i].name}Res`){
                db.items[i + 1].required = true;
                db.items[i + 1].label = db.items[i + 1].label + ' (requerido)'
            }
        }  
        console.log('enviando a Database', input) 
        saveDv(input) 

       //dispatch(getData())
        navigate("/showdb")  
 
    }

    function handleOnChange(e){
/*         let aux = []
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
        }  */
        if( e.target.type === 'checkbox'){
            console.log('hChange: ', e.target.checked, e.target.name, e.target.value)
            if(e.target.value===input[e.target.name])
                setInput({...input, [e.target.name]: ""})
            else
                setInput({...input, [e.target.name]: e.target.value})
            for (let i = 0; i < e.target.form.length; i++) {
                if(e.target.name===e.target.form[i].name && e.target.id!==e.target.form[i].id)
                    if(e.target.form[i].checked){
                        e.target.form[i].checked = false
                    }
            }
        }
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
        <h2 className='title'>Encuesta</h2>
        <h2 className='title'>Pajaroscaidos.org</h2>
        {/* <img src={img} alt='not found' className='img'/> */}
        {db.items.map((r, i) => {
            if(r.type === 'submit')
                return (
                    <div key={i}>
                        <input type={r.type} name={r.name} onChange={handleOnChange} value={input && input[r.name]} className='submit' />
                        {/* <input className='submit' type='button' value='Datos' onClick={handleOnButton} /> */}
                        <div ref={errorRef} ></div>
                    </div>
                )
            else
            if(r.type === 'select')
                return(
                    <div key = {i}>
                        <label className='label'>{r.label}</label>
                        <select onChange={handleOnSelect} name={r.name} className='select' >
                            <option value={r.label}>{r.label}</option>
                            {
                                r.options.map((r2, i) => 
                                    <option key={i + 'zx'} value={r2.value} className='option'>{r2.label}</option>
                                )
                            }
                        </select>
                    </div>
                )
            if(r.type === 'checkbox')
                return(
                    <div key={i}>
                        <label className='label'>{r.label} </label>
                        <br></br>
                        {
                            r.options?.map((o, i) => (
                            <span key={i}>
                                <label  ref={checkRef} className='labelCheckbox'>{o.label}</label>
                                <input type={r.type} id={i} name={o.name} onChange={handleOnChange} value={o.label}  style={r.bigText? {height: 100, width:400} : {}} className='checkbox' />
                            </span>
                            )) 
                        }
                    </div>   
                )
            else
                if(r.bigText)
                        return (
                            <div key={i}>
                        <label className='label'>{r.label} </label>
                        <br></br>
                        <textarea name={r.name} onChange={handleOnChange} value={input && input[r.name]} className='textArea' />
                        <div ref={errorRef} ></div>
                    </div>
                        )
            return (
                <div key={i}>
                    <label className='label'>{r.label} </label>
                    <br></br>
                    <input type={r.type} name={r.name} onChange={handleOnChange} value={input && input[r.name]}  style={r.bigText? {height: 100} : {}} className='input' />
                    <div ref={errorRef} className='errorRef'></div>
                </div>
                )
        }
        )}
    </form>
  )
}
