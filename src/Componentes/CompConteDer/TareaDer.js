import React, { useEffect } from 'react';
import './TareaDer.css';
import image from '../../Imagenes/comprobado.png';
import image1 from '../../Imagenes/documento.png';
import imageDlt from '../../Imagenes/borrar.png';




  const TareaDer = (props, {tareas, updateTask}) => {
  const completedStyle = props.completado ? 'completed' : '';//   Se define una variable completedStyle que comprueba si props.completado es true y asigna la clase completed al componente Tarea si es así.
  const completedStyleIcon = props.completado ? 'completed-icon' :'ocultar';
  
  const getData = () => {
    return localStorage.getItem('tarea')
  }

 

  return (
    <div className={`Tarea ${completedStyle}`}>
      <li className="Ntarea">
        <span>
          <img 
            className={`imgCheck ${completedStyleIcon}`} 
            src={image} alt="imagenCheck" 
          />
        </span>
        <p 
          className={`tarea-name ${completedStyle}`} 
          onClick={props.onCompletar}
        >
        {props.nombre}
        </p>
        <span >
          <img 
               className="imgDelete" 
               onClick={props.onDelete} 
               src={imageDlt} alt="imagenDel"
          />
        </span>
        <span >
          <img 
               className="imgDelete" 
               onClick={props.onOpenModal}  
               src={image1} alt="imagenAct"
          />
        </span>
      </li>
    </div>
  );
};

export { TareaDer };

