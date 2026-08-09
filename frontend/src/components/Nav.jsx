import React, { useState, useEffect } from 'react'; // Importa React y los Hooks useState y useEffect.
import { Link } from 'react-router-dom'; // Importa Link para navegar entre rutas sin recargar la página.
import '../css/nav.css'; // Importa CSS del Nav.

// Componente funcional Nav.
const Nav = () => {
    // 1. Miramos si hay un usuario en el localStorage (esto es nuestro "estado")
    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem("usuarioLogueado")));
    const [esSticky, setEsSticky] = useState(false);

    // 2. Efecto para el scroll
    useEffect(() => {
        const handleScroll = () => {
            // Si el scroll supera 100px (o la altura de tu header), se vuelve sticky
            if (window.scrollY > 100) {
                setEsSticky(true);
            } else {
                setEsSticky(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 3. Función para cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem("usuarioLogueado");
        setUsuario(null); // Esto hace que React actualice la pantalla automáticamente
    };

    return (
        <nav className={`nav ${esSticky ? 'sticky' : ''}`}>
        <div className="nav_links">
            <Link to="/"><span className="material-symbols-outlined">home</span>Inicio</Link>
            <Link to="/functions"><span className="material-symbols-outlined">build</span>Funciones</Link>
            <Link to="/notices"><span className="material-symbols-outlined">newspaper</span>Noticias</Link>
            <Link to="/about"><span className="material-symbols-outlined">groups</span>Sobre nosotros</Link>
            <Link to="/support"><span className="material-symbols-outlined">mail</span>Contacto</Link>
        </div>

        <div className="nav_login">
            {usuario ? (
                /* SI EL USUARIO ESTÁ LOGUEADO */
                <div className="perfil_dropdown">
                    <Link to="/dashboard" className="boton_login">
                        <span className="material-symbols-outlined">person</span> Perfil
                    </Link>
                    <button onClick={handleLogout} className="boton_registro" style={{border: 'none', cursor: 'pointer'}}>
                        <span className="material-symbols-outlined">logout</span> Cerrar sesión
                    </button>
                </div>
            ) : (
            /* SI NO ESTÁ LOGUEADO */
            <>
                <Link to="/login" className="boton_login">
                    <span className="material-symbols-outlined">login</span> Iniciar Sesión
                </Link>
                <Link to="/register" className="boton_registro">
                    <span className="material-symbols-outlined">person_add</span> Registrar
                </Link>
            </>
            )}
        </div>
        </nav>
    );
};

export default Nav; // Exporta el componente para poder utilizarlo.