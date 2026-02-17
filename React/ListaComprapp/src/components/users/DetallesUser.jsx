import React from 'react'
import useUsersContext from '../../hooks/useUsersContext'
import Cargando from '../common/Cargando'
import './DetallesUser.css'
import { formatearFecha } from '../../libraries/utilidades'
import useListContext from '../../hooks/useListContext'


const DetallesUser = ({ onVolver }) => {
  const { usuarioSeleccionado, listasUsuario } = useUsersContext();
  const {getListasPropias} = useListContext();



  return (
    <>
      <div className="usuario-detalle">
        <button onClick={onVolver} className="btn-volver">
          ← Volver
        </button>

        <div className="usuario-card">
          <div className="usuario-header">
            <img
              src={usuarioSeleccionado.avatar}
              alt={usuarioSeleccionado.nombre}
              className="usuario-avatar-grande"
            />
            <div className="usuario-info-principal">
              <h1>{usuarioSeleccionado.nombre}</h1>
              <span className={`rol-badge ${usuarioSeleccionado.rol}`}>
                {usuarioSeleccionado.rol}
              </span>
            </div>
          </div>

          <div className="usuario-body">
            <div className="info-seccion">
              <h3>Información Personal</h3>
              <p><strong>ID:</strong> {usuarioSeleccionado.id}</p>
              {usuarioSeleccionado.biografia && (
                <p><strong>Biografía:</strong> {usuarioSeleccionado.biografia}</p>
              )}
            </div>

            <div className="info-seccion">
              <h3>Detalles de Cuenta</h3>
              <p><strong>Email:</strong> {usuarioSeleccionado.email}</p>
              <p><strong>Rol:</strong> {usuarioSeleccionado.rol}</p>
              <p><strong>Fecha de registro:</strong> {
                formatearFecha(usuarioSeleccionado.created_at)
              }</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetallesUser