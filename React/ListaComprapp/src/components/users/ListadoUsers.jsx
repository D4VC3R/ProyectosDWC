import React from 'react'
import { useState } from 'react';
import useAdminContext from '../../hooks/useAdminContext'
import Cargando from '../common/Cargando';
import User from './User';
import './ListadoUsers.css'
import { useNavigate } from 'react-router-dom';

const ListadoUsers = () => {
  const { listaUsuarios, cargando, obtenerUsuarioPorId } = useAdminContext();

  const navegar = useNavigate();

  const manejarClic = (e) => {
    const usuarioId = e.target.closest('[data-usuario-id]')?.dataset.usuarioId;
    if (usuarioId) {
      obtenerUsuarioPorId(usuarioId);
      navegar('/admin/detallesUsuario');
    }
  };



  return (
    <>
      {cargando ? <Cargando />
      :
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