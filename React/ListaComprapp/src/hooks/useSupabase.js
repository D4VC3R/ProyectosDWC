import { useContext } from "react"
import {SupabaseContext} from './../context/ProveedorSupa.jsx'

export const useSupabase = () => {
	const ctx = useContext(SupabaseContext);

	if (!ctx) {
		throw new Error("useSupabase debe usarse dentro del proveedor.");
	}
	return ctx;
}