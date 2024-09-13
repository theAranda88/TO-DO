import image from '../Imagenes/logoUno.png';
import './Imagen.css';
function Img (){
    return(
        <img 
        src= {image} 
        className="Img" 
        alt="imagen"/>
    )
}
export {Img};