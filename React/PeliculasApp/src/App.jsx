import React from "react";
import './App.css'
import Contenedor from "./components/Ejercicio1/Contenedor.jsx";
import Interprete from "./components/Ejercicio2/Interprete.jsx";

function App() {
  

  return (
    <>
      <Contenedor>
        <Interprete nombre ="Al Pacino" foto = "https://th.bing.com/th/id/R.90f9f355ffabdc6141aa5418e0022100?rik=uotsHp%2fqjEnpDA&pid=ImgRaw&r=0">
        Al Pacino es un aclamado actor y director estadounidense, nacido el 25 de abril de 1940 en Manhattan, Nueva York. 
        Conocido por su intensidad y versatilidad, su carrera abarca más de 50 años en cine y teatro, ganando un Óscar, un Emmy y un Tony. 
        Después de una infancia difícil en el Bronx, encontró su pasión en la interpretación, estudiando con Lee Strasberg en el Actors Studio, 
        lo que lo llevó a éxitos teatrales y luego a la fama mundial con películas como El Padrino, Serpico y Tarde de perros.
        </Interprete>
      </Contenedor>
      
    </>
  )
}

export default App;
