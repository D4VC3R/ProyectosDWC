import React from 'react'
import './Producto.css'
import useSesionContext from '../../hooks/useSesionContext';
import { formatearPrecio, formatearPeso } from '../../libraries/utilidades.js';

const Producto = ({ producto, mostrarBotonesAgregar = false }) => {

    const imgDefecto = "https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg"
    const sinDatos = "Sin datos";
    // Guardamos el id del producto para usarlo en los data-attributes y recuperarlo en el componente padre ListadoProductos.
    const productoId = producto.id;
    const {sesionIniciada} = useSesionContext();
    //Ahora si que si, el formato de la moneda tiene dos decimales separados por una coma.
    
    return (
        <div className="producto" data-producto-id={productoId}>
            {sesionIniciada && !mostrarBotonesAgregar && 
            <>
            <span className="btn-eliminar" data-action="eliminar" data-producto-id={productoId} title="Eliminar producto">
                X
            </span>
            <span className="btn-editar" data-action="editar" data-producto-id={productoId} title="Editar producto">
                ✎
            </span>
            </>
            }
            {mostrarBotonesAgregar && sesionIniciada && (
                <button 
                    className="btn-agregar-lista" 
                    data-action="agregar" 
                    data-producto-id={productoId}
                    title="Agregar a la lista"
                >
                    + Añadir
                </button>
            )}
            <img src={producto.imagen ? producto.imagen : imgDefecto} alt={producto.nombre} className="producto-imagen" />
            <div className="producto-info">
                <h3 className="producto-nombre">{producto.nombre ? producto.nombre : sinDatos}</h3>
                <p className="producto-descripcion">{producto.descripcion ? producto.descripcion : sinDatos}</p>
                <div className="producto-detalles">
                    <span className="producto-precio">{producto.precio ? formatearPrecio(producto.precio) : sinDatos}</span>
                    <span className="producto-peso">{producto.peso ? formatearPeso(producto.peso) : sinDatos}</span>
                </div>
            </div>
        </div>
    )
}

export default Producto