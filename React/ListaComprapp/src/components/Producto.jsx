import React from 'react'
import './Producto.css'

const Producto = ({ producto }) => {

    const imgDefecto = "https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg"
    return (
        <div className="producto">
            <img src={producto.imagen ? producto.imagen : imgDefecto} alt={producto.nombre} className="producto-imagen" />
            <div className="producto-info">
                <h3 className="producto-nombre">{producto.nombre}</h3>
                <p className="producto-descripcion">{producto.descripcion}</p>
                <div className="producto-detalles">
                    <span className="producto-precio">{producto.precio}€</span>
                    <span className="producto-peso">{producto.peso}kg</span>
                </div>
            </div>
        </div>
    )
}

export default Producto