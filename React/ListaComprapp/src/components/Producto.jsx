import React from 'react'
import './Producto.css'

const Producto = ({ producto }) => {

    const imgDefecto = "https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg"
    const sinDatos = "Sin datos";
    const productoId = producto.id;

    
    return (
        <div className="producto" data-producto-id={productoId}>
            <span className="btn-eliminar" data-action="eliminar" data-producto-id={productoId} title="Eliminar producto">
                X
            </span>
            <span className="btn-editar" data-action="editar" data-producto-id={productoId} title="Editar producto">
                ✎
            </span>
            <img src={producto.imagen ? producto.imagen : imgDefecto} alt={producto.nombre} className="producto-imagen" />
            <div className="producto-info">
                <h3 className="producto-nombre">{producto.nombre ? producto.nombre : sinDatos}</h3>
                <p className="producto-descripcion">{producto.descripcion ? producto.descripcion : sinDatos}</p>
                <div className="producto-detalles">
                    <span className="producto-precio">{producto.precio ? producto.precio + "€" : sinDatos}</span>
                    <span className="producto-peso">{producto.peso ? producto.peso + "kg" : sinDatos}</span>
                </div>
            </div>
        </div>
    )
}

export default Producto