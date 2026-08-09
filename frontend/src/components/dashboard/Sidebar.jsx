import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/dashboard.css';

const Sidebar = ({ isCollapsed, toggleSidebar, setActiveView, userRole }) => {
    const [showSubmenu, setShowSubmenu] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {

        // Elimina el usuario guardado en el navegador
        localStorage.removeItem("usuarioLogueado");

        // Redirige al login
        navigate('/login');
    };

    return (
        <nav className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-content">
                <div className="logo-container" onClick={() => setActiveView("inicio")} style={{ cursor: "pointer" }}>
                    <img src="/logo_peed.png" alt="Logo" className="brand-symbol"/>
                </div>

                <ul className="menu">
                    {/* Panel con submenú común */}
                    <li>
                        <div className="menu-item" onClick={() => setShowSubmenu(!showSubmenu)}>
                            <i className='bx bx-grid-alt'></i>
                            <span className="menu-text">Panel</span>
                            <i className={`bx bx-chevron-down ${showSubmenu ? 'rotate' : ''}`}></i>
                        </div>
                        {showSubmenu && (
                            <ul className="submenu">
                                <li className="submenu-item" onClick={() => setActiveView('perfil')}>
                                    <i className='bx bx-user'></i> 
                                    <span className="menu-text">Perfil</span>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Menú dinámico según el rol */}
                    {userRole === "admin" && (
                        <>
                            <li className="menu-item" onClick={() => setActiveView("questions")}>
                                <i className='bx bx-help-circle'></i>
                                <span className="menu-text">Banco de Preguntas</span>
                            </li>

                            <li className="menu-item" onClick={() => setActiveView("exams")}>
                                <i className='bx bx-book'></i>
                                <span className="menu-text">Banco de Exámenes</span>
                            </li>

                            <li className="menu-item" onClick={() => setActiveView("assign")}>
                                <i className='bx bx-send'></i>
                                <span className="menu-text">Asignar Exámenes</span>
                            </li>

                            <li className="menu-item" onClick={() => setActiveView("results")}>
                                <i className='bx bx-bar-chart'></i>
                                <span className="menu-text">Resultados</span>
                            </li>
                        </>
                    )}

                    {userRole === "candidato" && (
                        <>
                            <li className="menu-item" onClick={() => setActiveView("myexams")}>
                                <i className='bx bx-book-open'></i>
                                <span className="menu-text">Mis Exámenes</span>
                            </li>

                            <li className="menu-item" onClick={() => setActiveView("history")}>
                                <i className='bx bx-history'></i>
                                <span className="menu-text">Historial</span>
                            </li>
                        </>
                    )}
                </ul>

                <div className="logout" onClick={handleLogout}>
                    <i className='bx bx-log-out'></i>
                    <span className="menu-text">Cerrar sesión</span>
                </div>
            </div>
            <div className="sidebar-handle" onClick={toggleSidebar}></div>
        </nav>
    );
};

export default Sidebar;