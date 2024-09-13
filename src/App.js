import { ContenedorDer } from './Componentes/CompConteDer/ContenedorDer';
import './App.css';
import React from 'react';
import { ContenedorIzq } from './Componentes/ContenedorIzq';


function App() {

  return (
    <div className="App">
      <div className="container">
        <ContenedorIzq

        />
        <ContenedorDer
        
        />
      </div>
     
    </div>
  );
}

export default App;
