import './Modal.css'
import React from 'react';
function Modal(props){
  

    if(!props.visible)
        return null;
    return(
        <div className="div1">
            <h1>
                
            </h1>
            <div className="div2">
                {props.children}
            </div>
            <span 
                className="Icon-delete-Modal"  
                onClick={props.onClose}    
            >
                x
            </span>
        </div>
    )
}
export {Modal};