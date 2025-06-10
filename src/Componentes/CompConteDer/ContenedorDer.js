import React from 'react';
import './ContenedorDer.css';
import { H1Der } from './H1Der';
import { InputDer } from './InputDer';
import { TareaDer } from './TareaDer';
import { ListaTareas } from './ListaTareas';	
import { Modal } from './Modal';
import { Actualizar } from './Actualizar';

// const tareasEj = [
//   { key: 1, nombre: 'Tarea 1', completado: false },
//   { key: 2, nombre: 'Tarea 2', completado: false },
//   { key: 3, nombre: 'Tarea 3', completado: false },
// ];

    function ContenedorDer({ tareas, completarTarea, eliminarT,setTareas}) {
        const [tareaSeleccionada, setTareaSeleccionada] = React.useState(null);
        const [buscarTarea, setBuscarTarea] = React.useState('');
        const [visible,setVisible] = React.useState(false);

        const tareasCompletas = tareas.filter(t => t.completado).length;
        const tareasAll = tareas.length;
        const arrayFiltrado = tareas.filter(t => t.nombre.toLowerCase().includes(buscarTarea.toLowerCase()));
        


        const updateTask = (key, nuevoNombre)  => {
          console.log(key, nuevoNombre);
          alert('Esta seguro de actualizar esta tarea?')
          const tareaActualizada = tareas.map( t =>{
            if(t.key === key){
              return { ...t, nombre: nuevoNombre}
            }
            return t;
          })
          setTareas(tareaActualizada);
          setVisible(false);
        }

        return(

        
          <div className="ContenedorDer">
            <Modal 
              visible={visible} 
              onClose={() => setVisible(false)}
              // tareas = {tareas}
            >             
                <Actualizar
                tarea={tareaSeleccionada}  // Pasamos la tarea seleccionada
                onUpdateTask={updateTask}
                  // updateTask={updateTask}
                  // todo = {todo}
                  // onClose={() => setVisible(false)}
                  // tareaActualizada={tareaActualizada}
                  // setTareaActualizada={setTareaActualizada }
                />

            </Modal>
            <H1Der completas={tareasCompletas} total={tareasAll} />
            <InputDer buscarTarea={buscarTarea} setBuscarTarea={setBuscarTarea} />
            <ListaTareas> 
              {arrayFiltrado.map((tarea) => (
                <TareaDer 
                  key={tarea.key} 
                  nombre={tarea.nombre} 
                  completado={tarea.completado}
                  onCompletar={() => completarTarea(tarea.key)}
                  onDelete={() => eliminarT(tarea.key)}
                  onOpenModal={()=>{
                    setTareaSeleccionada(tarea)
                    setVisible(true)}}
                />
              ))}
            </ListaTareas>
          </div>
        );
      }
export {ContenedorDer};
