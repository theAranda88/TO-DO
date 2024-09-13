import React from 'react';
import './ContenedorDer.css';
import { H1Der } from './H1Der';
import { InputDer } from './InputDer';
import { TareaDer } from './TareaDer';
import { ListaTareas } from './ListaTareas';	



const tareasEjemplo=[

    {key:1, nombre:'Tarea 1', completado:false},
    {key:2, nombre:'Tarea 2', completado:false},
    {key:3, nombre:'Tarea 3', completado:false},
    {key:4, nombre:'Tarea 4', completado:false},
    {key:5, nombre:'Tarea 5', completado:false},
    ];

function ContenedorDer( { tareas, setTareas } ){
    const [tareasDerecho, setTareasDerecho] = React.useState(tareas);
    const [buscarTarea,setBuscarTarea]=React.useState('');
    const [tareasTotales,setTareasTotales]=React.useState(tareasEjemplo);
    const tareasCompletas = tareasTotales.filter(t=>t.completado).length;
    const tareasAll = tareasTotales.length;
    const arrayFiltrado = tareasTotales.filter(t=>t.nombre.toLowerCase().includes(buscarTarea.toLocaleLowerCase()));
    
    const completarTarea = (key) => {
        const nuevasTareas = tareasTotales.map(t =>{
            if(t.key===key){
                return {...t, completado:!t.completado}
            }
            return t;
        });
        console.log(key);
        setTareasTotales(nuevasTareas);

    };

        const eliminarT = (key)=>{
            console.log("desea borrar tarea")
            const nuevasTareas = [...tareasTotales];
            const index = nuevasTareas.findIndex(t=>t.key===key); 
            if(index!==-1){
                nuevasTareas.splice(index,1);
                setTareasTotales(nuevasTareas);
            }  
        };
        
      
    
    return(
        <div className="ContenedorDer">
            <H1Der completas={tareasCompletas} total={tareasAll}/>
            <InputDer buscarTarea={buscarTarea} setBuscarTarea={setBuscarTarea}/>
            <ListaTareas > 
                {arrayFiltrado.map((tarea)=>
                    <TareaDer key={tarea.key} 
                              nombre={tarea.nombre} 
                              completado={tarea.completado}
                              onCompletar= {()=>completarTarea(tarea.key)}
                              onDelete= {()=>eliminarT(tarea.key)}
                              tareas={tareasDerecho}
                              
                              />
                              
                )}
            </ListaTareas>
            
        </div>
    )

}

export {ContenedorDer};
