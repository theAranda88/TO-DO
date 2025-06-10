// import './Actualizar.css';
// import React from 'react';

// function Actualizar ({todo, onUpdateTask, onClose, tareaActualizada, setTareaActualizada}){
   

//     return(
       
//         <div>
//             <textarea
//                  value={tareaActualizada}
//                  onChange={(e) => setTareaActualizada(e.target.value)}
//             >
//             </textarea>
//             <button 
//                 className='btnActualizar'
//                 onClick={onUpdateTask} 
//             >Actualizar

//         </button>
//         </div>


//     )
// }

// export {Actualizar};
import './Actualizar.css';
import React from 'react';

function Actualizar({ tarea, onUpdateTask }) {
  const [nuevoNombre, setNuevoNombre] = React.useState(tarea ? tarea.nombre : '');

  React.useEffect(() => {
    setNuevoNombre(tarea ? tarea.nombre : '');
  }, [tarea]); // Actualiza el estado cuando la tarea cambie

  const handleUpdate = () => {
    onUpdateTask(tarea.key, nuevoNombre);
  };

  return (
    <div>
      <textarea
        value={nuevoNombre}
        onChange={(e) => setNuevoNombre(e.target.value)}
      />
      <button 
        className='btnActualizar'
        onClick={handleUpdate}
      >
        Actualizar
      </button>
    </div>
  );
}

export { Actualizar };

// React.useEffect() esta función se encarga de actualizar 
//el estado nuevoNombre cada vez que el estado tarea cambie, 
//lo que asegura que el componente se actualice correctamente con los cambios en el estado.
