import React from 'react';
import './Input.css';
function Input({onChangeTextArea, setNuevaTarea, nuevaTarea}){

    const inputChange = (e) => {
        const text = e.target.value;
        setNuevaTarea(text);
        if (onChangeTextArea) {
            onChangeTextArea(e); 
        }
    }
            
    return (
        <>
            <label className="InputLabel" name="Input">Nombre de Tarea</label>
            <textarea
                className="Input" 
                type="text" 
                placeholder="Ingrese su Tarea" 
                name="Input"
                value={nuevaTarea}
                onChange={inputChange}
            />
        </>
    )
}

export {Input};