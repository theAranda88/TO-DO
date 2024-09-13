import './InputDer.css';
import React from 'react';

function InputDer(props) {
    return (
        <div>
            <input type="text" 
                   className="InputDer" 
                   placeholder="Busca una tarea"
                   value={props.buscarTarea}
                   onChange={e => props.setBuscarTarea(e.target.value)}/>  
        </div>
    );
}

export { InputDer };