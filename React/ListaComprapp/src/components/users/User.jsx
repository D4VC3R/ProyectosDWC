import React from 'react'
import './User.css'

const User = ({ usuario }) => {
    const sinDatos = "Sin datos";
    const usuarioId = usuario.id;

    return (
        <div
            className="tarjeta-usuario"
            data-usuario-id={usuarioId}
        >
            <img
                src={usuario.avatar || avatarDefecto}
                alt={usuario.nombre}
                className="avatar-usuario"
            />
            <h3>{usuario.nombre || sinDatos}</h3>
            <span className={`rol-badge ${usuario.rol}`}>
                {usuario.rol}
            </span>
        </div>
    )
}

export default User