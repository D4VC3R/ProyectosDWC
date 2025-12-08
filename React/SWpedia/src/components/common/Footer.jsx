import React from 'react'
import './Footer.css'

const Footer = () => {
	// He aprovechado para prácticar un poco las etiquetas de html.
	return (
		<div className="contenedor_footer">
			<footer className="footer_footer">
				<address>David Cerdán Valero</address>
				<p> 2º de <dfn><abbr title="Desarrollo de Aplicaciones Web">DAW</abbr></dfn> </p>
				<time dateTime="2025">2025</time>
			</footer>
		</div>
	)
}
export default Footer