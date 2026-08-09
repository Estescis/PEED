import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Aquí podrías limpiar localStorage.removeItem('token');
        navigate('/login');
    }, [navigate]);

    return null; // No renderiza nada porque redirige inmediatamente
};

export default Logout;