import React from 'react'; // Importa librería principal de React para crear componentes.
import { Link } from 'react-router-dom'; // Importa React Router para navegar entre rutas sin recargar la página.
import '../css/header.css'; // Importa CSS del Header.

// Componente funcional Header.
const Header = () => {
    return (
        // Etiqueta semántica que representa el encabezado de la página.
        <header className="header">

            {/* Logo en el Header */}
            <div className="contenedor_logo">
                <Link to="/">                
                    <img src="/logo_peed.png" className="header_logo" alt="Logo PEED" />
                </Link>
            </div>

            {/* Imagen en el Header */}
            <div className="contenedor_imagen">
                <img src="/header_peed.png" className="header_img" alt="Banner PEED" />
            </div>

        </header>
    );
};

export default Header; // Exporta el componente para poder utilizarlo.