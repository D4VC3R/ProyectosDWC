import React from "react";
import './App.css'
import Contenedor from "./components/Ejercicio1/Contenedor.jsx";
import Interprete from "./components/Ejercicio2/Interprete.jsx";
import Pelicula from "./components/Ejercicio3/Pelicula.jsx";

function App() {
  
  // Array de Interprete que luego le pasaremos a Pelicula para rellenar el parametro elenco
  // Que FilmAffinity me perdona por robarle las imágenes
  const elencoEsenciaDeMujer = [
    <Interprete 
    nombre ="Al Pacino" 
    foto = "https://pics.filmaffinity.com/al_pacino-271435010451688-nm_200.jpg">
    </Interprete>,

    <Interprete 
    nombre ="Gabrielle Anwar" 
    foto = "https://pics.filmaffinity.com/gabrielle_anwar-265739487630598-nm_200.jpg">
    </Interprete>,

    <Interprete 
    nombre ="Phillipe Seymour Hoffman" 
    foto = "https://pics.filmaffinity.com/philip_seymour_hoffman-104287484353645-nm_200.jpg">
    </Interprete>
  ];
  

  return (
    <>
      <Contenedor>
        <b>Ejercicio 1 y 2</b>
        <Interprete nombre ="Al Pacino" foto = "https://pics.filmaffinity.com/al_pacino-271435010451688-nm_200.jpg">
        Al Pacino es un aclamado actor y director estadounidense, nacido el 25 de abril de 1940 en Manhattan, Nueva York. 
        Conocido por su intensidad y versatilidad, su carrera abarca más de 50 años en cine y teatro, ganando un Óscar, un Emmy y un Tony. 
        Después de una infancia difícil en el Bronx, encontró su pasión en la interpretación, estudiando con Lee Strasberg en el Actors Studio, 
        lo que lo llevó a éxitos teatrales y luego a la fama mundial con películas como El Padrino, Serpico y Tarde de perros.
        </Interprete>
      </Contenedor>

      <Contenedor>
        <b>Ejercicio 3</b>
        <Pelicula titulo = "Esencia de mujer" director = "Martin Brest" cartel = "https://pics.filmaffinity.com/scent_of_a_woman-162635554-mmed.jpg"
        elenco = {elencoEsenciaDeMujer}>
          Frank Slade (Al Pacino) es un malhumorado Coronel en la reserva del ejército norteamericano, retirado pues sufre de ceguera. 
          Durante el fin de semana de Acción de Gracias el joven estudiante Charlie Simms (Chris O'Donnell), contratado por la familia de Slade, 
          se queda en su casa para servirle de lazarillo y procurar que no beba mucho. 
          Pero Frank tiene otros planes: irse a la gran ciudad de Nueva York...
        </Pelicula>
      </Contenedor>
      
    </>
  );
};

export default App;
