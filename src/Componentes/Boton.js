import './Boton.css';
import img from '../Imagenes/mas.png'
function Boton (props){
    return(
        <button 
            className='Boton'
            onClick ={props.OnAdd} >
                <img className="App-logo" src={img} alt="logo"></img>
        </button>
    )
}

export {Boton};