import { Navigate } from "react-router-dom";

const CandidateRoute = ({ children }) => {

    const usuario = JSON.parse(
        localStorage.getItem("usuarioLogueado")
    );

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    if (usuario.userType !== "Candidato") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default CandidateRoute;