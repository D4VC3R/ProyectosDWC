import React, { useState, useEffect } from 'react'
import useUsersContext from '../../hooks/useUsersContext'
import Cargando from '../common/Cargando'
import './DetallesUser.css'
import { formatearFecha } from '../../libraries/utilidades'

const DetallesUser = ({ onVolver }) => {
  const { usuarioSeleccionado, listasUsuario, obtenerListasDelUsuario } = useUsersContext();
  const [listaSeleccionada, setListaSeleccionada] = useState(null);
  const [rolEditado, setRolEditado] = useState(usuarioSeleccionado?.rol || 'user');

  useEffect(() => {
    if (usuarioSeleccionado) {
      obtenerListasDelUsuario();
      setRolEditado(usuarioSeleccionado.rol);
    }
  }, [usuarioSeleccionado]);

  const handleCambioRol = (e) => {
    const nuevoRol = e.target.value;
    setRolEditado(nuevoRol);
    // Aquí puedes agregar la lógica para guardar en el backend
    console.log('Nuevo rol:', nuevoRol);
  };

  const handleClickLista = (lista) => {
    setListaSeleccionada(lista);
  };

  const cerrarDetallesLista = () => {
    setListaSeleccionada(null);
  };

  if (!usuarioSeleccionado) {
    return <Cargando />;
  }

  return (
    <div className="usuario-detalle">
      <button onClick={onVolver} className="btn-volver">
        ← Volver al listado
      </button>

      <div className="grid-container">
        {/* Columna izquierda - Información del usuario */}
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
                <span className={`rol-badge ${rolEditado}`}>
                  {rolEditado}
                </span>
              </div>
            </div>

            <div className="info-seccion">
              <h3>Detalles de Cuenta</h3>
              <p><strong>Email:</strong> {usuarioSeleccionado.email}</p>
              
              <p className="campo-rol">
                <strong>Rol:</strong>
                <select 
                  value={rolEditado} 
                  onChange={handleCambioRol}
                  className="select-rol"
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Admin</option>
                </select>
              </p>

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

        {/* Columna derecha - Listas del usuario */}
        <div className="columna-listas">
          <h2>Listas de Compra ({listasUsuario?.length || 0})</h2>
          
          {listasUsuario && listasUsuario.length > 0 ? (
            <div className="listas-grid">
              {listasUsuario.map((lista) => (
                <div 
                  key={lista.id} 
                  className="lista-card"
                  onClick={() => handleClickLista(lista)}
                >
                  <div className="lista-icono">🛒</div>
                  <h3>{lista.nombre}</h3>
                  <p className="lista-fecha">
                    Creada: {formatearFecha(lista.created_at)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="sin-listas">
              <p>Este usuario no ha creado ninguna lista todavía.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal para ver detalles de la lista */}
      {listaSeleccionada && (
        <div className="modal-overlay" onClick={cerrarDetallesLista}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{listaSeleccionada.nombre}</h2>
              <button onClick={cerrarDetallesLista} className="btn-cerrar">✕</button>
            </div>
            <div className="modal-body">
              <p><strong>ID:</strong> {listaSeleccionada.id}</p>
              <p><strong>Fecha de creación:</strong> {formatearFecha(listaSeleccionada.created_at)}</p>
              <p><strong>Propietario:</strong> {usuarioSeleccionado.nombre}</p>
              <div className="info-nota">
                <small>📌 Vista de solo lectura</small>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetallesUser;
