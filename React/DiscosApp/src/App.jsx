import React from 'react';
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import Contenedor from './components/common/Contenedor';


function App() {
  return (
    <>
      <BrowserRouter>
        <Contenedor />
      </BrowserRouter>
    </>
  )
}

export default App
