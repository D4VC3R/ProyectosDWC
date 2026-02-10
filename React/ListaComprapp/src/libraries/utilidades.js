import erroresp from "./../assets/json/errorESP.json";

export const traducirError = (error) => {
  const traduccion = erroresp[error.toLowerCase()];

  // Intento traducir y si no, devuelvo el error original en inglés, se ha intentado.
  if (!traduccion) {
    return error;
  }
  return traduccion;
};

// Objeto escalable para controlar los parámetros del modal.
export const opcionesModal = {
  cerrarSesion: {
    title: "Cerrar sesión",
    message: "¿Seguro que quieres cerrar sesión?",
    confirmText: "Sabré yo...",
    cancelText: "Ah, pues no.",
  },
  borrarProducto: {
    title: "Confirmar eliminación",
    message:
      "¿Estás seguro de eliminar este producto? Mira que esta acción no se puede deshacer...",
    confirmText: "Que sí, pesao, déjame.",
    cancelText: "Mejor no.",
  },
  borrarLista: {
    title: "Confirmar eliminación de lista",
    message:
      "¿Estás seguro de eliminar esta lista? Se eliminarán todos los productos asociados y no se puede deshacer.",
    confirmText: "Sí, eliminar lista",
    cancelText: "No, conservar",
  },
};

export const formatearFecha = (fecha) => {
  const date = new Date(fecha);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const localeString = date.toLocaleString("es-ES", options);
  return localeString.replace(",", " a las");
};

export const formatearPrecio = (precio) => {
  return (
    precio.toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + "€"
  );
};
export const formatearPeso = (peso) => {
  return (
    peso.toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + "kg"
  );
};

export default opcionesModal;
