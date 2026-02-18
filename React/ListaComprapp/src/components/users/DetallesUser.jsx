import React, { useEffect } from 'react'
import useAdminContext from '../../hooks/useAdminContext'
import Cargando from '../common/Cargando'
import './DetallesUser.css'
import { formatearFecha } from '../../libraries/utilidades'
import useListContext from '../../hooks/useListContext'
import ListadoListas from '../lists/ListadoListas'

const DetallesUser = ({ volver }) => {
  const { usuarioSeleccionado, obtenerListasDelUsuario, actualizarRol, errorAdmin } = useAdminContext();
  const {listas} = useListContext();


  useEffect(() => {
    if (usuarioSeleccionado) {
      obtenerListasDelUsuario();
    }
  }, []);

  const handleCambioRol = async (e) => {
    const nuevoRol = e.target.value;
    await actualizarRol(nuevoRol);
  };


  return (
    <div className="usuario-detalle">
      <button onClick={volver} className="btn-volver">
        ← Volver al listado
      </button>

      <div className="grid-container">

        <div className="columna-usuario">
          <div className="usuario-card">
            <div className="usuario-header">
              <img
                src={usuarioSeleccionado.avatar}
                alt={usuarioSeleccionado.nombre}
                className="usuario-avatar-grande"
              />
              <div className="usuario-info-principal">
                <h1>{usuarioSeleccionado.nombre}</h1>
                <span className={`rol-badge ${usuarioSeleccionado.roles_usuario.rol}`}>
                  {usuarioSeleccionado.roles_usuario.rol}
                </span>
              </div>
            </div>

            <div className="info-seccion">
              <h3>Detalles</h3>
              <p className="campo-rol">
                <strong>Rol:</strong>
                <select 
                  value={usuarioSeleccionado.roles_usuario.rol} 
                  onChange={handleCambioRol}
                  className="select-rol"
                >
                  <option value="usuario">Usuario</option>
                  <option value="admin">Admin</option>
                </select>
              </p>
              <p><strong>Email:</strong> {usuarioSeleccionado.roles_usuario.email}</p>
              <p><strong>Fecha de registro:</strong> {formatearFecha(usuarioSeleccionado.created_at)}</p>

              {usuarioSeleccionado.biografia && (
                <div className="biografia-seccion">
                  <strong>Biografía:</strong>
                  <p className="biografia-texto">{usuarioSeleccionado.biografia}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="columna-listas">
          <h2>Listas de Compra ({listas?.length || 0})</h2>
          <ListadoListas />
        </div>
      </div>
      {errorAdmin && <div className="mensaje-error">{errorAdmin}</div>}
    </div>
  );
};

export default DetallesUser;
