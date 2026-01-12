"use strict";

import { eventosData } from "./eventos.js";

const traerDatos = async () => {
    try {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (eventosData && eventosData.eventos) {
            resolve(eventosData.eventos);
          } else {
            reject(new Error("No se encontraron datos"));
          }
        }, 100);
      });
    } catch (error) {
      throw error;
    }
  };

	export const cargarTabla = async () => {
		try {
			const datos = await cargarDatos();
			await crearCabecera(datos);
			await rellenarTabla(datos);

		} catch (error) {
			mostrarErrores("Error al cargar la tabla: " + error.message);
		}
	}

	const cargarDatos = async () => {
		try {
			const promesas = [traerDatos("./eventos.js"), cargarEventos()];
			const datos = await Promise.all(promesas);
			return datos.flat();
		} catch (error) {
			throw error;
		}
	}

  const crearCabecera = async (datos) => {
    try {
			const tabla = document.getElementsByTagName("table")[0];
      for (const campo in datos[0]) {
        if (campo === "id") {
          continue;
        }
        const cabecera = document.createElement("TH");
        cabecera.textContent = campo.toUpperCase();
        tabla.appendChild(cabecera);
      }
    } catch (error) {
			throw error;
    }
  };

  const rellenarTabla = async (datos) => {
    try {
			const tabla = document.getElementsByTagName("table")[0];
      datos.forEach((elemento) => {
        const fila = document.createElement("TR");
        for (const campo in elemento) {
          const celda = document.createElement("TD");
          if (campo === "id") {
            continue;
          }
          if (campo === "fecha") {
            const fecha = new Date(elemento[campo]);
            celda.textContent = fecha.toLocaleDateString();
          } else {
            celda.textContent = elemento[campo];
          }
          fila.appendChild(celda);
        }
        tabla.appendChild(fila);
      });
    } catch (error) {
			throw error;
		}
  };

	const actualizarTabla = async () => {
		const tabla = document.getElementsByTagName("table")[0];
		tabla.innerHTML = "";
		await cargarTabla();
	}

	const addError = (error) => {
		const ul = document.getElementsByTagName("ul")[0];
		const li = document.createElement("li");
    li.classList.add("error");
    li.innerHTML = error;
    ul.appendChild(li);
	}

  const mostrarErrores = (errores) => {
      const ul = document.getElementsByTagName("ul")[0];
      ul.classList.remove("oculto", !errores);
      if (Array.isArray(errores)) {
        errores.forEach((error) => {
          addError(error)
        });
      } else {
        addError(errores);
      }
  }

	const validarNombre = (nombre) => {
		const expresion = /\w{3,}/
		let valido = expresion.test(nombre.value) && nombre.value !== "";
		marcarCampo(nombre, valido);
		return valido;
	}
	const validarFecha = (fecha) => {
		const expresion = /^\d{4}\-\d{2}\-\d{2}/
		let valido = expresion.test(fecha.value) && fecha.value !== "";
		marcarCampo(fecha, valido);
		return valido;
	}
	const validarUbicacion = (ubicacion) => {
		let valido = ubicacion.value !== "";
		marcarCampo(ubicacion, valido);
		return valido;
	}

	export const comprobarCampo = (campo) => {
		switch (campo.name) {
			case "nombre": validarNombre(campo)
			break;
			case "fecha": validarFecha(campo);
			break;
			case "ubicacion": validarUbicacion(campo);
			break;
		}
	}

	const comprobarForm = (form) => {
		let errores = [];

		if (!validarNombre(form["nombre"])) {
			errores = [...errores, "Nombre es obligatorio, solo texto y números."];
		}
		if (!validarFecha(form["fecha"])) {
			errores = [...errores, "Fecha en formato YYYY-MM-DD"];
		}
		if (!validarUbicacion(form["ubicacion"])) {
			errores = [...errores, "La ubicación es obligatoria."];
		}

		return errores;
	}

	export const validarForm = (form) => {
		limpiarErrores();
		const errores = comprobarForm(form);

		if (errores.length === 0) {
			guardarEvento(form);
			actualizarTabla();
			form.reset();
		}else{
			mostrarErrores(errores);
			setTimeout(() => {
				limpiarErrores();
			}, 10000);
		}
	}

	const crearEvento = (form) => {
		return {
			id: Math.floor(Math.random()*999),
			nombre : form.nombre.value,
			fecha: form.fecha.value,
			ubicacion: form.ubicacion.value
		}
	}
	const guardarEvento = (form) => {
		let eventos = cargarEventos();
		const evento = crearEvento(form);
		eventos = [...eventos, evento];
		guardarEventos(eventos);
	}

	const marcarCampo = (campo, valido) => {
		if (!valido) {
			campo.classList.add("invalido");
		}
		if (valido && campo.classList.contains("invalido")) {
			campo.classList.remove("invalido");
		}
	}

	const limpiarErrores = () => {
		const ul = document.getElementsByTagName("ul")[0];
		ul.classList.add("oculto");
		ul.innerHTML = "";
	}

	const guardarEventos = (eventos) => {
		localStorage.setItem("eventos", JSON.stringify(eventos));
	}

	const cargarEventos = () => {
		return JSON.parse(localStorage.getItem("eventos")) || [];
	}