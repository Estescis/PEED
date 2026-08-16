import React, { useState } from 'react';

// Importación de componentes del Dashboard
import Sidebar from './Sidebar';
import Profile from './Profile';
import HomeDashboard from './HomeDashboard';

// Importación de componentes para administradores
import AssignExam from "../admin/AssignExam";
import ExamBank from "../admin/ExamBank";
import QuestionBank from "../admin/QuestionBank";
import Results from "../admin/Results";

// Importación de componentes para candidatos
import MyExams from "../candidate/MyExams";
import History from "../candidate/History";
import TakeExam from "../candidate/TakeExam";

import '../../css/dashboard.css';

const Dashboard = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeView, setActiveView] = useState('inicio');
    
    // Aquí definimos el rol. Puedes probar cambiando a 'candidato'
    const usuario = JSON.parse(
        localStorage.getItem("usuarioLogueado")
    );

    const userRole = usuario?.userType === "Administrador"
        ? "admin"
        : usuario?.userType === "Candidato"
        ? "candidato"
        : null;
        
    if (!usuario) {
        return <h2>No hay usuario autenticado</h2>;
    }

    const renderContent = () => {

        switch (activeView) {
            case 'inicio':
                return <HomeDashboard />;
            case "perfil":
                return <Profile userRole={userRole} />;
            
            // ==========================
            // ADMINISTRADOR
            // ==========================
            case "questions":
                return <QuestionBank />;
            case "exams":
                return <ExamBank />;
            case "assign":
                return <AssignExam />;
            case "results":
                return <Results />;

            // ==========================
            // CANDIDATO
            // ==========================
            case "myexams":
                return <MyExams setActiveView={setActiveView} />;
            case "takeexam":
                return <TakeExam />;
            case "history":
                return <History />;

            default:
                return <HomeDashboard />;
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar 
                isCollapsed={isCollapsed} 
                toggleSidebar={() => setIsCollapsed(!isCollapsed)} 
                setActiveView={setActiveView}
                userRole={userRole} // Pasamos el rol al Sidebar
            />
            
            <main className="main-content">
                <header className="top-navbar">
                    <div className="user-profile-nav">
                        <span>{usuario?.names}</span>
                        <div className="avatar">{usuario?.names?.charAt(0)}</div>
                    </div>
                </header>
                <div className="content-area">{renderContent()}</div>
            </main>
        </div>
    );
};

export default Dashboard;