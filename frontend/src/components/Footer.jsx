import React from 'react';
import { Link } from 'react-router-dom';
import '../css/footer.css';

const Footer = () => {
    return (
    
    // Pie de página principal de la aplicación.
    <footer className="footer_peed">
        <div className="contenedor_footer">

            {/* Sección con el logo e información de la plataforma */}
            <div className="info_footer">
                <Link to="/">
                    <img src="/logo_peed.png" className="logo_peed_footer" alt="Logo PEED" />
                </Link>
                <div className="texto_logo_footer">
                    <h2 className="logo_footer">PEED</h2>
                    <p>Plataforma Evaluadora de Exámenes Digitales</p>
                    <span className="slogan">Evalúa • Analiza • Mejora</span>
                </div>
            </div>

            {/* Menú de navegación del pie de página */}
            <div className="footer_links">
                <h4>Navegación</h4>
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/functions">Funciones</Link></li>
                    <li><Link to="/notices">Noticias</Link></li>
                    <li><Link to="/about">Sobre nosotros</Link></li>
                </ul>
            </div>

            {/* Información de contacto y enlaces a redes sociales */}
            <div className="footer_contacto">
                <h4>Contacto</h4>
                <p>soporte@peed.edu</p>
                <div className="iconos_redes">
                    <a href="https://www.facebook.com" className="icono_social"><i className="fab fa-facebook-f"></i></a>
                    <a href="https://www.instagram.com" className="icono_social"><i className="fab fa-instagram"></i></a>
                    <a href="https://www.linkedin.com" className="icono_social"><i className="fab fa-linkedin-in"></i></a>
                    <a href="https://www.x.com" className="icono_social"><i className="fab fa-x-twitter"></i></a>
                </div>
            </div>
        </div>

        {/* Información de derechos de autor */}
        <div className="footer_copy">
            <p>&copy; 2026 PEED - Todos los derechos reservados.</p>
        </div>
    </footer>
    );
};

export default Footer;