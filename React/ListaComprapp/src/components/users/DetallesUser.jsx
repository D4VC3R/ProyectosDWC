import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useSesionContext from '../hooks/useSesionContext'
import useSupabaseCRUD from '../hooks/useSupabaseCRUD'
import Cargando from '../components/common/Cargando'
import './UsuarioDetalle.css'

const UsuarioDetalle = () => {
    const { id } = useParams();
    const navegar = useNavigate();
    const { obtenerDetallesUsuario } = useSesionContext();

    //usuarioacftivop

    useEffect(() => {
        obtenerDetallesUsuario();
    }, [id]);

    

    const volver = () => {
        navegar('/admin');
    };

    if (cargando) return <Cargando />;
    if (error) return <div className="mensaje-error">{error}</div>;
    if (!usuario) return <div>Usuario no encontrado</div>;

    return (
        <div className="usuario-detalle">
            <button onClick={volver} className="btn-volver">
                ← Volver
            </button>
            
            <div className="usuario-card">
                <div className="usuario-header">
                    <img 
                        src={usuario.avatar || '/default-avatar.png'} 
                        alt={usuario.nombre}
                        className="usuario-avatar-grande"
                    />
                    <div className="usuario-info-principal">
                        <h1>{usuario.nombre}</h1>
                        <span className={`rol-badge ${usuario.rol}`}>
                            {usuario.rol}
                        </span>
                    </div>
                </div>

                <div className="usuario-body">
                    <div className="info-seccion">
                        <h3>Información Personal</h3>
                        <p><strong>ID:</strong> {usuario.id}</p>
                        {usuario.biografia && (
                            <p><strong>Biografía:</strong> {usuario.biografia}</p>
                        )}
                    </div>

                    <div className="info-seccion">
                        <h3>Detalles de Cuenta</h3>
                        <p><strong>Rol:</strong> {usuario.rol}</p>
                        <p><strong>Fecha de registro:</strong> {
                            usuario.created_at 
                                ? new Date(usuario.created_at).toLocaleDateString('es-ES')
                                : 'No disponible'
                        }</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsuarioDetalle