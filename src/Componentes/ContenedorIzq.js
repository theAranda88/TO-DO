import React from 'react';
import { Boton } from './Boton';
import './ContenedorIzq.css';
import { H1 } from './H1';
import {Img} from './Imagen';
import {Input} from './Input';

const tareasEjemplo=[

    {key:1, nombre:'Tarea 1', completado:false},
    {key:2, nombre:'Tarea 2', completado:false},
    {key:3, nombre:'Tarea 3', completado:false},
    {key:4, nombre:'Tarea 4', completado:false},
    {key:5, nombre:'Tarea 5', completado:false},
    ];

function ContenedorIzq({ setTareas }){
    const [ingresarTarea,setIngresarTarea]=React.useState('');
    const [nuevaTarea,setNuevaTarea]=React.useState([]);
    const [tareasTotales,setTareasTotales]=React.useState(tareasEjemplo);
    const [tareasDerecho, setTareasDerecho] =React.useState([]);
    const tareasAll =  tareasTotales.length;

    const addTarea = () => {
        console.log(nuevaTarea)
        const newObj = {
            key : (tareasTotales.length + 1).toString(),
            nombre : nuevaTarea,
            completado : false
        };
        setTareasTotales([...tareasEjemplo,newObj]);
        setIngresarTarea(' ');
        setTareasDerecho([...tareasDerecho, newObj]);
        console.log(setTareasTotales)
    }
    return(
        <div className="ContenedorIzq">
            <H1/>
            <Input 
                nuevaTarea={nuevaTarea} 
                setNuevaTarea={setNuevaTarea}
            />
            <Boton
                OnAdd={addTarea}
            />
            <Img/>
            
        </div>
    )

}
export {ContenedorIzq};