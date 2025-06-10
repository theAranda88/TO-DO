import React from 'react';
import { Boton } from './Boton';
import './ContenedorIzq.css';
import { H1 } from './H1';
import {Img} from './Imagen';
import {Input} from './Input';


function ContenedorIzq(props){
   
    const [nuevaTarea, setNuevaTarea] = React.useState('');

    const saveData = () => {
      localStorage.setItem('Tarea', nuevaTarea)
      alert('Almacenando datos');
    };

    const taskAddTarea = () => {
      console.log(nuevaTarea);
        if (nuevaTarea.trim() !== '') {
          props.addTarea(nuevaTarea);
          setNuevaTarea('');
          saveData();
        }
      };
    return(
        <div className="ContenedorIzq">
        <H1 />
        <Input 
          nuevaTarea={nuevaTarea} 
          setNuevaTarea={setNuevaTarea}
        />
        <Boton
          OnAdd={taskAddTarea}
        />
        <Img />
      </div>
    );
  }
export {ContenedorIzq};