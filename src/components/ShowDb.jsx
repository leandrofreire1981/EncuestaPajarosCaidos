import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './showDb.scss'



export const ShowDb = () => {
  const data = useSelector (state => state.data)
  const navigate = useNavigate()
  console.log('showdb ', data)
  function handleOnClick(e, data){
    navigate('/')
  }
    return (
      <div>
        <h1>Muchas gracias por responder</h1>
        <hr></hr>
{/*       {data.length>0 && data.map((r, i) => (
        <div key={i}>
          <div> </div>
          <div></div>
          <hr></hr>
        </div>
      ))} */}
     {/*  <button className='button' onClick={handleOnClick}>Volver</button>  */}
    
        
      </div>
    )

}
