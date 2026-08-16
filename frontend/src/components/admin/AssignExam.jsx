import React, { useEffect, useState } from 'react';

const AssignExam = () => {

    // Usuario que inició sesión
    const usuario = JSON.parse(
        localStorage.getItem("usuarioLogueado")
    );

    // Lista de exámenes del administrador
    const [exams, setExams] = useState([]);
    const [selectedExam, setSelectedExam] = useState("");
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState("");
    const [deadline, setDeadline] = useState("");
    const [assignments, setAssignments] = useState([]);
    const [editingAssignment, setEditingAssignment] = useState(null);

    // ==========================
    // CARGAR EXÁMENES
    // ==========================
    const loadExams = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/exam/user/${usuario.iduser}`
            );
            const data = await response.json();
            setExams(data);
        } catch (error) {
            console.error(error);
        }
    };

    // ==========================
    // CARGAR CANDIDATOS
    // ==========================
    const loadCandidates = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/user/candidates"
            );
            const data = await response.json();
            setCandidates(data);
        } catch (error) {
            console.error(error);
        }
    };

    // ==========================
    // CARGAR ASIGNACIONES
    // ==========================
    const loadAssignments = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/assigned-exam/admin/${usuario.iduser}`
            );
            const data = await response.json();
            console.log("Asignaciones:", data);
            setAssignments(data);
        } catch (error) {
            console.error("Error cargando asignaciones:", error);
        }
    };

    // ==========================
    // CARGAR DATOS DE ASIGNACIÓN
    // ==========================
    const saveAssignment = async () => {
        // ==========================
        // VALIDAR CAMPOS
        // ==========================

        if (!selectedExam) {
            alert("Debe seleccionar un examen");
            return;
        }

        if (!selectedCandidate) {
            alert("Debe seleccionar un candidato");
            return;
        }

        if (!deadline) {
            alert("Debe seleccionar una fecha límite");
            return;
        }
        const selectedDate = new Date(deadline);
        const currentDate = new Date();

        if (selectedDate <= currentDate) {
            alert("La fecha límite debe ser posterior a la fecha actual");
            return;
        }

        // ==========================
        // VALIDAR ASIGNACIÓN DUPLICADA
        // ==========================
        const duplicate = assignments.some((assignment) => {
            return (
                assignment.exam.idExam === Number(selectedExam) &&
                assignment.candidate.iduser === Number(selectedCandidate) &&
                assignment.status === true &&
                (!editingAssignment ||
                    assignment.idAssigned !== editingAssignment.idAssigned)
            );
        });
        if (duplicate) {
            alert("Este examen ya está asignado a este candidato");
            return;
        }

        // ==========================
        // DATOS DE LA ASIGNACIÓN
        // ==========================
        const assignedExamData = {
            exam: {
                idExam: Number(selectedExam)
            },
            candidate: {
                iduser: Number(selectedCandidate)
            },
            deadline: deadline,
            status: editingAssignment
                ? editingAssignment.status
                : true,
            attempts: editingAssignment
                ? editingAssignment.attempts
                : 0,
            score: editingAssignment
                ? editingAssignment.score
                : null
        };
        // Si estamos editando, agregamos el ID de la asignación
        if (editingAssignment) {
            assignedExamData.idAssigned =
                editingAssignment.idAssigned;
        }
        console.log("Datos de la asignación:", assignedExamData);
        try {
            const response = await fetch(
                editingAssignment
                    ? "http://localhost:8080/assigned-exam/update"
                    : "http://localhost:8080/assigned-exam/new",
                {
                    method: editingAssignment
                        ? "PUT"
                        : "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(assignedExamData)
                }
            );
            if (response.ok) {
                if (editingAssignment) {
                    alert("Asignación actualizada correctamente");
                } else {
                    alert("Examen asignado correctamente");
                }
                await loadAssignments();
                // Limpiamos el formulario
                setSelectedExam("");
                setSelectedCandidate("");
                setDeadline("");
                // Salimos del modo edición
                setEditingAssignment(null);
            } else {
                alert(
                    editingAssignment
                        ? "Error al actualizar la asignación"
                        : "Error al asignar el examen"
                );
            }
        } catch (error) {
            console.error("Error:", error);
            alert("No fue posible conectar con el servidor");
        }
    };

    // ==========================
    // CAMBIAR ESTADO DE ASIGNACIÓN
    // ==========================
    const toggleAssignmentStatus = async (assignment) => {
        const updatedAssignment = {
            idAssigned: assignment.idAssigned,

            exam: {
                idExam: assignment.exam.idExam
            },

            candidate: {
                iduser: assignment.candidate.iduser
            },

            deadline: assignment.deadline,
            status: !assignment.status,
            attempts: assignment.attempts,
            score: assignment.score
        };
        console.log("Cambiando estado:", updatedAssignment);
        try {
            const response = await fetch(
                "http://localhost:8080/assigned-exam/update",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedAssignment)
                }
            );
            if (response.ok) {
                alert(
                    updatedAssignment.status
                        ? "Asignación activada correctamente"
                        : "Asignación desactivada correctamente"
                );
                // Volver a cargar las asignaciones
                await loadAssignments();
            } else {
                const errorText = await response.text();
                console.error("Error del servidor:", errorText);
                console.error("Código HTTP:", response.status);
                alert(
                    `No fue posible cambiar el estado. Código: ${response.status}`
                );
            }
        } catch (error) {
            console.error("Error cambiando estado:", error);
            alert("No fue posible conectar con el servidor");
        }
    };

    // ==========================
    // ELIMINAR ASIGNACIÓN
    // ==========================
    const deleteAssignment = async (idAssigned) => {
        const confirmDelete = window.confirm(
            "¿Está seguro de eliminar esta asignación?"
        );
        if (!confirmDelete) {
            return;
        }
        try {
            const response = await fetch(
                `http://localhost:8080/assigned-exam/${idAssigned}`,
                {
                    method: "DELETE"
                }
            );
            if (response.ok) {
                alert("Asignación eliminada correctamente");
                await loadAssignments();
            } else {
                alert("Error al eliminar la asignación");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("No fue posible conectar con el servidor");
        }
    };

    // ==========================
    // EDITAR ASIGNACIÓN
    // ==========================
    const editAssignment = (assignment) => {
        setEditingAssignment(assignment);
        setSelectedExam(assignment.exam.idExam);
        setSelectedCandidate(assignment.candidate.iduser);
        setDeadline(assignment.deadline);
    };

    // ==========================
    // CARGAR AL INICIAR
    // ==========================
    useEffect(() => {
        loadExams();
        loadCandidates();
        loadAssignments();
    }, []);

    console.log(exams);
    console.log(candidates);
    console.log(assignments);

    return (
        <div className="assigned-exam-container">

            <div className="page-header">
                <h2>Asignación de Exámenes</h2>
                <p>Asigna exámenes a los candidatos registrados.</p>
            </div>

            <div className="assigned-exam-form-card">

                <div className="assigned-exam-form-group">
                    <label>Seleccione el examen</label>
                    <select
                        value={selectedExam}
                        onChange={(e) => setSelectedExam(e.target.value)}
                    >
                        <option value="">
                            Seleccione un examen
                        </option>
                        {
                            exams.map((exam) => (
                                <option
                                    key={exam.idExam}
                                    value={exam.idExam}
                                >
                                    {exam.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="assigned-exam-form-group">
                    <label>Seleccione el candidato</label>
                    <select
                            value={selectedCandidate}
                            onChange={(e) => setSelectedCandidate(e.target.value)}
                        >
                            <option value="">
                                Seleccione un candidato
                            </option>
                            {
                                candidates.map((candidate) => (
                                    <option
                                        key={candidate.iduser}
                                        value={candidate.iduser}
                                    >
                                        {candidate.names} {candidate.lastnames}
                                    </option>
                                ))
                            }
                    </select>
                </div>

                <div className="assigned-exam-form-group">
                    <label>Fecha límite</label>
                    <input
                        type="datetime-local"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                </div>

                <button
                    type="button"
                    className="btn-assign-exam"
                    onClick={saveAssignment}
                >
                    {editingAssignment
                        ? "Guardar cambios"
                        : "Asignar examen"
                    }
                </button>

                {editingAssignment && (
                    <button
                        type="button"
                        className="btn-cancel-assignment"
                        onClick={() => {
                            setSelectedExam("");
                            setSelectedCandidate("");
                            setDeadline("");
                            setEditingAssignment(null);
                        }}
                    >
                        Cancelar
                    </button>
                )}

            </div>

            <div className="assignments-list">
                <h3>Exámenes asignados</h3>
                {
                    assignments.length === 0 ? (
                        <p>No hay exámenes asignados.</p>
                    ) : (
                        assignments.map((assignment) => (
                            <div
                                className="assignment-card"
                                key={assignment.idAssigned}
                            >
                                <p>
                                    <strong>Examen:</strong>{" "}
                                    {assignment.exam.name}
                                </p>

                                <p>
                                    <strong>Candidato:</strong>{" "}
                                    {assignment.candidate.names}{" "}
                                    {assignment.candidate.lastnames}
                                </p>

                                <p>
                                    <strong>Fecha límite:</strong>{" "}
                                    {assignment.deadline}
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
                                        {assignment.status ? "Activo" : "Inactivo"}
                                    </span>
                                </p>

                                <div className="assignment-actions">
                                    <button
                                        type="button"
                                        className={
                                            assignment.status
                                                ? "btn-status deactivate"
                                                : "btn-status activate"
                                        }
                                        onClick={() => toggleAssignmentStatus(assignment)}
                                    >
                                        {assignment.status
                                            ? "Desactivar"
                                            : "Activar"}
                                    </button>

                                    <button
                                        type="button"
                                        className="btn-icon edit"
                                        onClick={() =>
                                            editAssignment(assignment)
                                        }
                                        title="Editar asignación"
                                    >
                                        <i className="bx bx-edit-alt"></i>
                                    </button>

                                    <button
                                        type="button"
                                        className="btn-icon delete"
                                        onClick={() =>
                                            deleteAssignment(assignment.idAssigned)
                                        }
                                        title="Eliminar asignación"
                                    >
                                        <i className="bx bx-trash"></i>
                                    </button>
                                </div>

                            </div>
                        ))
                    )
                }
            </div>

        </div>
    );
};

export default AssignExam;