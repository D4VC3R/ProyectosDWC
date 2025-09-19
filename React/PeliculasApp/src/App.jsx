import React from "react";
import './App.css'
import Contenedor from "./components/Ejercicio1/Contenedor.jsx";
import Interprete from "./components/Ejercicio2/Interprete.jsx";

function App() {
  

  return (
    <>
      <Contenedor>
        <Interprete nombre ="Al Pacino" foto = "https://th.bing.com/th/id/R.90f9f355ffabdc6141aa5418e0022100?rik=uotsHp%2fqjEnpDA&pid=ImgRaw&r=0">
        Lo que escriba aqui deberia aparecer como biografia.
        </Interprete>
      </Contenedor>
      
    </>
  )
}

export default App
