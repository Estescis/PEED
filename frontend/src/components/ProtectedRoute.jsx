import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

    // Buscar usuario guardado
    const usuario = JSON.parse(
        localStorage.getItem("usuarioLogueado")
    );
    // Si no existe usuario,
    // devuelve al login
    if (!usuario) {
        return <Navigate to="/login" replace />;
    }
    // Si existe usuario,
    // permite mostrar la página
    return children;

};

export default ProtectedRoute;