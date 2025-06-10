import { ContenedorDer } from './Componentes/CompConteDer/ContenedorDer';
import './App.css';
import React from 'react';
import { ContenedorIzq } from './Componentes/ContenedorIzq';

const tareasEj = [
  { key: 1, nombre: 'Tarea 1', completado: false },
  { key: 2, nombre: 'Tarea 2', completado: false },
  { key: 3, nombre: 'Tarea 3', completado: false },
  { key: 4, nombre: 'Tarea 4', completado: false },
];

function App() {
  const [tareas, setTareas] = React.useState(tareasEj);

  // Función para agregar una nueva tarea
  const addTarea = (nombre) => {
    const nuevaTarea = {
      key: tareas.length + 1,
      nombre: nombre,
      completado: false,
    };
    setTareas([...tareas, nuevaTarea]);
    console.log(nombre)
    console.log(nuevaTarea)
  };

  // Función para completar una tarea
  const completarTarea = (key) => {
    const TareasCompletadas = tareas.map(t => {
      if (t.key === key) {
        return { ...t, completado: !t.completado };
      }
      return t;
    });
    setTareas(TareasCompletadas);
  };

  // Función para eliminar una tarea
  const eliminarT = (key) => {
    console.log('')
    alert('Esta seguro de eliminar esta tarea?')
    const eliminarTareas = tareas.filter(t => t.key !== key);
    setTareas(eliminarTareas);
  };

  return (
    <div className="App">
      <div className="container">
        
        <ContenedorIzq
          addTarea={addTarea}
        />
        <ContenedorDer
          tareas={tareas} 
          setTareas={setTareas}
          completarTarea={completarTarea}
          eliminarT={eliminarT}
        />
      </div>
     
    </div>
  );
}

export default App;
