import React, { useEffect, useState } from 'react';
import TakeExam from "./TakeExam";

const MyExams = ({ setActiveView }) => {
    // ==========================
    // USUARIO QUE INICIÓ SESIÓN
    // ==========================
    const usuario = JSON.parse(
        localStorage.getItem("usuarioLogueado")
    );

    // ==========================
    // LISTA DE EXÁMENES
    // ==========================
    const [assignments, setAssignments] = useState([]);
    const [selectedExam, setSelectedExam] = useState(null);

    // ==========================
    // CARGAR MIS EXÁMENES
    // ==========================
    const loadMyExams = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/assigned-exam/candidate/${usuario.iduser}`
            );
            const data = await response.json();
            console.log("Mis exámenes:", data);
            setAssignments(data);
        } catch (error) {
            console.error(
                "Error cargando mis exámenes:",
                error
            );
        }
    };

    // ==========================
    // FORMATEAR FECHA
    // ==========================
    const formatDate = (date) => {
        const fecha = new Date(date);
        return fecha.toLocaleString("es-CO", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    // ==========================
    // INICIAR EXAMEN
    // ==========================
    const startExam = (assignment) => {
        console.log("Asignación seleccionada:", assignment);
        // Guardamos temporalmente la asignación seleccionada
        localStorage.setItem(
            "examenActual",
            JSON.stringify(assignment)
        );
        // Cambiamos la vista del Dashboard
        setActiveView("takeexam");
    };

    // ==========================
    // CARGAR AL INICIAR
    // ==========================
    useEffect(() => {
        loadMyExams();
    }, []);

    if (selectedExam) {
        return (
            <TakeExam
                examId={selectedExam}
            />
        );
    }

    return (
        <div className="my-exams-container">

            <div className="page-header">
                <h2>Mis Exámenes</h2>
                <p>Consulta los exámenes que tienes asignados.</p>
            </div>

            <div className="my-exams-list">
                {assignments.length === 0 ? (
                    <p>No tienes exámenes asignados.</p>
                ) : (
                    assignments.map((assignment) => (
                        <div
                            className="my-exam-card"
                            key={assignment.idAssigned}
                        >
                            <h3>
                                {assignment.exam.name}
                            </h3>

                            <p>
                                <strong>Fecha límite:</strong>{" "}
                                {formatDate(assignment.deadline)}
                            </p>

                            <p>
                                <strong>Estado:</strong>{" "}
                                <span
                                    className={
                                        assignment.status
                                            ? "status active"
                                            : "status inactive"
                                    }
                                >
                                    {assignment.status
                                        ? "Activo"
                                        : "Inactivo"}
                                </span>
                            </p>
                            
                            {assignment.status && (
                                <button
                                    type="button"
                                    className="btn-start-exam"
                                    onClick={() => setSelectedExam(assignment.exam.idExam)}
                                >
                                    Iniciar examen
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>

        </div>
    );
};

export default MyExams;