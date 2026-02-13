import React from 'react';
import './App.css';
import Rutas from './routes/Rutas';
import Cabecera from './components/common/Cabecera';

function App() {
  /**
   * SQL utilizado en la pŕactica:
   * -----------------------------------------------
   * |  Crear la columna 'roles' de tipo enum:      |
   * -----------------------------------------------
   * create type roles as enum (
   * 'usuario',
   * 'admin'
   * )
   * -----------------------------------------------
   * |            Función security definer          |
   * -----------------------------------------------
   * create or replace function public.insertar_rol_usuario()
   *        returns trigger as $$
   *        begin
   *          insert into public.roles_usuario (id_rol, email, rol)
   *          values (new.id, new.email, 'usuario');
   *          return new;
   *        end;
   *        $$ language plpgsql security definer;
   * -----------------------------------------------
   * |                  Trigger                     |
   * -----------------------------------------------
   * create trigger usuario_creado
   * after insert on auth.users
   * for each row execute function public.insertar_rol_usuario();       
   * -----------------------------------------------
   * |        Función de comprobación de roles      |
   * -----------------------------------------------
   * create or replace function public.is_admin()
   * returns boolean as $$
   * begin
   *   return exists (
   *   select 1
   *   from public.roles_usuario
   *   where id_rol = auth.uid()
   *   and rol = 'admin'
   *   );
   * end;
   * $$ language plpgsql security definer set search_path = public;
   * -----------------------------------------------
   * | Función para crear perfil                   |
   * -----------------------------------------------
   * CREATE OR REPLACE FUNCTION public.crear_perfil_usuario()
   * RETURNS trigger AS $$
   * BEGIN
   *   INSERT INTO public.perfil_usuario (id_usuario, nombre)
   *   VALUES (
   *     new.id, 
   *     COALESCE(new.raw_user_meta_data ->> 'display_name', 'anónimo')
   *   );
   *   RETURN new;
   * END;
   * $$ LANGUAGE plpgsql SECURITY DEFINER;
   *  
   * -----------------------------------------------
   * | Trigger para la creación de perfiles        |
   * -----------------------------------------------
   * CREATE TRIGGER usuario_creado_con_perfil
   *   AFTER INSERT ON auth.users 
   *   FOR EACH ROW EXECUTE FUNCTION public.crear_perfil_usuario();
   * ---------------------------------------------------------------
   *  
   *
   */

  return (
    <>
      <div className="contenedor_contenedor">
        <Cabecera />
        <div className="contenedor_principal">
          <Rutas />
        </div>
      </div>
    </>
  )
}

export default App
