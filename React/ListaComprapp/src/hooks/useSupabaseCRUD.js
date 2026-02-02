import { sb } from "../supabase/supabase.js";
import useSupabase from "./useSupabase.js";

const useSupabaseCRUD = () => {

	const { cargando, error, solicitar } = useSupabase();

	// Funciones para CRUD, no las hago asíncronas porque todas dependen de solicitar(), que ya lo es.
	const obtenerTodo =  (tabla) => {
		return  solicitar(sb.from(tabla).select('*'));
	};

	const obtenerUno = (tabla, uuid) => {
		return solicitar(sb.from(tabla).select('*').eq("id", uuid));
	};

	const filtrarILike = (tabla, columna, valor) => {
		return solicitar(sb.from(tabla).select('*').ilike(columna, `%${valor}%`));
	};

	const filtrarIgualOMenor = (tabla, columna, valor) => {
		return solicitar(sb.from(tabla).select('*').lte(columna, valor))
	};

	const ordenarTabla = (tabla, columna, asc = true) => {
		return solicitar(sb.from(tabla).select('*').order(columna, {ascending:asc}));
	};

	const insertar = (tabla, datos) => {
		return solicitar(sb.from(tabla).insert(datos).select());
	};

	const actualizar = (tabla, uuid, datos) => {
		return solicitar(sb.from(tabla).update(datos).eq("id", uuid).select());
	};

	const eliminar = (tabla, uuid) => {
		return solicitar(sb.from(tabla).delete().eq("id", uuid));
	};

	return {
		cargando,
		error,
		obtenerTodo,
		obtenerUno,
		filtrarILike,
		filtrarIgualOMenor,
		ordenarTabla,
		insertar,
		actualizar,
		eliminar
	};
};

export default useSupabaseCRUD;