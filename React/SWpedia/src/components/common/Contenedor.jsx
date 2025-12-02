import React from "react";
import "./Contenedor.css";
import Menu from "./Menu";
import Cabecera from "./Cabecera";
import Footer from "./Footer";

const Contenedor = (props) => {
	return (
		<div className="contenedor_contenedor">
			<header className="contenedor_cabecera">
				<Cabecera />
			</header>
			<div className="contenedor_body">
				<aside className="contenedor_menu">
					<Menu vertical />
				</aside>
				<main className="contenedor_contenido">
					{props.children}
				</main>
			</div>
			<footer>
				<Footer />
			</footer>
		</div>
	);
};

export default Contenedor;