import { sb } from "../supabase/supabase.js";
import useSupabase from "./useSupabase.js";

const useSupabaseCRUD = () => {
  const { cargando, error, solicitar } = useSupabase();

  // Funciones para CRUD, no las hago asíncronas porque todas dependen de solicitar(), que ya lo es.
  const obtenerTodo = (tabla) => {
    return solicitar(sb.from(tabla).select("*"));
  };

  const obtenerUno = (tabla, id) => {
    return solicitar(sb.from(tabla).select("*").eq("id", id));
  };

  const filtrarILike = (tabla, columna, valor) => {
    return solicitar(sb.from(tabla).select("*").ilike(columna, `%${valor}%`));
  };

  const filtrarIgualOMenor = (tabla, columna, valor) => {
    return solicitar(sb.from(tabla).select("*").lte(columna, valor));
  };

  const ordenarTabla = (tabla, columna, asc = true) => {
    return solicitar(
      sb.from(tabla).select("*").order(columna, { ascending: asc }),
    );
  };

  const insertar = (tabla, datos) => {
    return solicitar(sb.from(tabla).insert(datos).select());
  };

  const actualizar = (tabla, id, datos) => {
    return solicitar(sb.from(tabla).update(datos).eq("id", id).select());
  };

  const eliminar = (tabla, id) => {
    return solicitar(sb.from(tabla).delete().eq("id", id));
  };

  // Consultas multitabla
  // tabla de inicio  -> campo y valor para filtrar -> consulta sql
  // order para que el producto mantenga simpre la misma posición en supabase. Así al actualizar la cantidad de un producto no se desordena la lista.
const obtenerRelacionados = (tabla, filtro, id, columnas = '*') => {
  return solicitar(sb.from(tabla).select(columnas).eq(filtro, id).order('created_at', { ascending: true })); 
}

	// Suscripción a tabla, se dispara con cualquier tipo de evento (insertar, actualizar, borrar...).
  const suscripcionATabla = (tabla, callback) => {
    const canal = sb
      .channel(`custom-${tabla}-channel`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: tabla },
        (payload) => callback(payload), // payload incluye un montón de opciones para hacerlo más quirúrjico todo, además del listado anterior y posterior a la acción.
      )
      .subscribe();

    return canal;
  };
  // Eliminar la suscripción.
  const cancelarSuscripcion = (canal) => {
    sb.removeChannel(canal);
  };

  return {
    cargando,
    error,
    obtenerTodo,
    obtenerUno,
    obtenerRelacionados,
    filtrarILike,
    filtrarIgualOMenor,
    ordenarTabla,
    insertar,
    actualizar,
    eliminar,
    suscripcionATabla,
    cancelarSuscripcion,
  };
};

export default useSupabaseCRUD;
