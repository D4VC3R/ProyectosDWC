import React from "react";
import "./Contenedor.css";
import Menu from "./Menu";
import Cabecera from "./Cabecera";
import Footer from "./Footer";
import Contenido from "./Contenido";

const Contenedor = () => {
	return (
		<div className="contenedor_contenedor">
			<div className="contenedor_cabecera">
				<Cabecera />
			</div>
			<div className="contenedor_principal">
				<div className="contenedor_menu">
					<Menu vertical />
				</div>
				<div className="contenedor_contenido">
					<Contenido />
				</div>
			</div>
			<div className="contenedor_footer">
				<Footer />
			</div>
		</div>
	)
}
export default Contenedor