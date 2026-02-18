import React from 'react'
import { useState } from 'react';
import useAdminContext from '../../hooks/useAdminContext'
import Cargando from '../common/Cargando';
import DetallesUser from './DetallesUser';
import User from './User';
import './ListadoUsers.css'

const ListadoUsers = () => {
  const { listaUsuarios, cargando, obtenerUsuarioPorId } = useAdminContext();
  const [mostrarDetalles, setMostrarDetalles] = useState(false);

  const manejarClic = (e) => {
    const usuarioId = e.target.closest('[data-usuario-id]')?.dataset.usuarioId;
    if (usuarioId) {
      obtenerUsuarioPorId(usuarioId);
      setMostrarDetalles(true);
    }
  };

  const volverAlListado = () => {
    setMostrarDetalles(false);
  };

  if (mostrarDetalles) {
    return <DetallesUser onVolver={volverAlListado} />;
  }

  return (
    <>
      {cargando ? <Cargando /> :
        <div className='listado-usuarios' onClick={manejarClic}>
          {listaUsuarios.length > 0 ?
            listaUsuarios.map((usuario) =>
              <User key={usuario.id} usuario={usuario} />
            )
            :
            <p>No hay usuarios disponibles.</p>
          }
        </div>
      }
    </>
  )
}

export default ListadoUsers