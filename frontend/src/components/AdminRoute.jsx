import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {

    const usuario = JSON.parse(
        localStorage.getItem("usuarioLogueado")
    );

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    if (usuario.userType !== "Administrador") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default AdminRoute;