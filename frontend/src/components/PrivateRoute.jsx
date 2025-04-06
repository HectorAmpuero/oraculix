import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Verifica si hay datos del usuario en localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Si no hay usuario, redirige al home (o podrías redirigir a login)
    return <Navigate to="/" />;
  }

  // Si está autenticado, muestra el contenido protegido
  return children;
};

export default PrivateRoute;