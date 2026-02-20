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
   * 
   * -----------------------------------------------
   * | Políticas de seguridad en Supabase          |
   * -----------------------------------------------
   * ---------------------------------------------------------------
   *  | schemaname | tablename      | policyname                 | permissive | roles           | cmd    | using_expression                                                                                                                               | with_check_expression                                                                                                                          |
      | ---------- | -------------- | -------------------------- | ---------- | --------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
      | public     | items_lista    | admin-fisgon               | PERMISSIVE | {public}        | SELECT | is_admin()                                                                                                                                     | null                                                                                                                                           |
      | public     | items_lista    | propietario_maneja_lista   | PERMISSIVE | {authenticated} | ALL    | (EXISTS ( SELECT 1
                                                                                                            FROM listas_compra
                                                                                                            WHERE ((listas_compra.id = items_lista.lista_id) AND (listas_compra.id_propietario = auth.uid())))) 
                                                                                                         | (EXISTS ( SELECT 1
                                                                                                            FROM listas_compra
                                                                                                            WHERE ((listas_compra.id = items_lista.lista_id) AND (listas_compra.id_propietario = auth.uid())))) |
      | public     | listas_compra  | user-maneja-listas-propias | PERMISSIVE | {authenticated} | ALL    | (auth.uid() = id_propietario)                                                                                                                  | (auth.uid() = id_propietario)                                                                                                                  |
      | public     | listas_compra  | admin_fisgon               | PERMISSIVE | {public}        | SELECT | is_admin()                                                                                                                                     | null                                                                                                                                           |
      | public     | perfil_usuario | usuario-ve-su-perfil       | PERMISSIVE | {public}        | SELECT | (auth.uid() = id)                                                                                                                              | null                                                                                                                                           |
      | public     | perfil_usuario | admin-modifica-perfil      | PERMISSIVE | {public}        | UPDATE | is_admin()                                                                                                                                     | is_admin()                                                                                                                                     |
      | public     | perfil_usuario | admin-ve-perfiles          | PERMISSIVE | {public}        | SELECT | is_admin()                                                                                                                                     | null                                                                                                                                           |
      | public     | perfil_usuario | usuario-modifica-su-perfil | PERMISSIVE | {public}        | UPDATE | (auth.uid() = id)                                                                                                                              | (auth.uid() = id)                                                                                                                              |
      | public     | producto       | admin-crud-completo        | PERMISSIVE | {authenticated} | ALL    | is_admin()                                                                                                                                     | is_admin()                                                                                                                                     |
      | public     | producto       | listar                     | PERMISSIVE | {public}        | SELECT | true                                                                                                                                           | null                                                                                                                                           |
      | public     | roles_usuario  | admin-edita-rol-usuario    | PERMISSIVE | {authenticated} | UPDATE | (is_admin() AND (auth.uid() <> id_rol))                                                                                                        | (is_admin() AND ((rol = 'usuario'::roles) OR (rol = 'admin'::roles)))                                                                          |
      | public     | roles_usuario  | admin-borra-usuario        | PERMISSIVE | {authenticated} | DELETE | (is_admin() AND (rol = 'usuario'::roles))                                                                                                      | null                                                                                                                                           |
      | public     | roles_usuario  | leer-roles                 | PERMISSIVE | {public}        | SELECT | (is_admin() OR (auth.uid() = id_rol))                                                                                                          | null                                                                                                                                           |
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
