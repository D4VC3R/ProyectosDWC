"use strict";

window.onload = () => {

	const producto = {id:1, desc:"monitor", precio: 200, stock: 5};
	let {desc: nombreProducto, precio} = producto;
	console.log(nombreProducto, precio);

	const colores = ['rojo', 'verde', 'azul', 'amarillo'];
	let [primero, ...resto] = colores;
	console.log(primero);
	console.log(resto);

	let a = 5;
	let b = 10;

	[a,b] = [b,a];

	console.log(a);

	const notas = [4, 8, 3, 10, 5];

	let notasAprobadas = notas.map((nota)=>{
		if (nota >= 5) {
			return nota * 1.1;
		}
	});

	notasAprobadas = notasAprobadas.filter((nota) => nota !== undefined);
	console.log(notasAprobadas)





}