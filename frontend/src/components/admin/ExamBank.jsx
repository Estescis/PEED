import React, { useEffect, useState } from "react";

const ExamBank = () => {

    const usuario = JSON.parse(
        localStorage.getItem("usuarioLogueado")
    );

    const [exam, setExam] = useState({
        name: "",
        description: "",
        duration: "",
        status: true,
        questions: []
    });

    const [questions, setQuestions] = useState([]);
    const [exams, setExams] = useState([]);
    const [editingExam, setEditingExam] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setExam({
            ...exam,
            [name]: value
        });
    };

    const loadQuestions = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/question/user/${usuario.iduser}`
            );
            const data = await response.json();
            setQuestions(data);
        } catch (error) {
            console.error(error);
        }
    };

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

    const toggleQuestion = (question) => {
        const exists = exam.questions.find(
            q => q.idQuestion === question.idQuestion
        );
        if(exists){
            setExam({
                ...exam,
                questions: exam.questions.filter(
                    q => q.idQuestion !== question.idQuestion
                )
            });
        }else{
            setExam({
                ...exam,
                questions: [
                    ...exam.questions,
                    question
                ]
            });
        }
    };

    const saveExam = async () => {
        const examData = {
            idExam: editingExam ? editingExam.idExam : null,
            name: exam.name,
            description: exam.description,
            duration: exam.duration,
            status: true,
            user: {
                iduser: usuario.iduser
            },
            questions: exam.questions.map(question => ({
                idQuestion: question.idQuestion
            }))
        };
        console.log(examData);
        try{
            const url = editingExam
                ? "http://localhost:8080/exam/update"
                : "http://localhost:8080/exam/new";

            const method = editingExam
                ? "PUT"
                : "POST";

            const response = await fetch(
                url,
                {
                    method,
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(examData)
                }
            );
            if(response.ok){
                alert("Examen creado correctamente");
                await loadExams();
                cleanForm();
                setEditingExam(null);
            }else{
                alert("Error al crear el examen");
            }
        }catch(error){
            console.error(error);
            alert("No fue posible conectar con el servidor");
        }
    };

    const deleteExam = async (idExam) => {
        const confirmar = window.confirm(
            "¿Desea eliminar este examen?"
        );
        if(!confirmar){
            return;
        }
        try{
            const response = await fetch(
                `http://localhost:8080/exam/${idExam}`,
                {
                    method:"DELETE"
                }
            );
            if(response.ok){
                alert(
                    "Examen eliminado correctamente"
                );
                loadExams();
            }else{
                alert(
                    "No fue posible eliminar el examen"
                );
            }
        }catch(error){
            console.error(error);
        }
    };

    const editExam = (examSelected) => {
        setEditingExam(examSelected);
        setExam({
            idExam: examSelected.idExam,
            name: examSelected.name,
            description: examSelected.description,
            duration: examSelected.duration,
            status: examSelected.status,
            questions: examSelected.questions
        });
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const getStatusBadge = (status) => {
        return (
            <span
                className={
                    status
                        ? "status active"
                        : "status inactive"
                }
            >
                {status ? "Activa" : "Inactiva"}
            </span>
        );
    };

    const cleanForm = () => {
        setExam({
            name: "",
            description: "",
            duration: "",
            status: true,
            questions: []
        });
    };
    
    useEffect(() => {
        loadQuestions();
        loadExams();
    }, []);

    console.log(questions);
    console.log(exam.questions);
    console.log(exams);

    return (
        <div className="exam-bank-container">

            <div className="page-header">
                <h2>Banco de Exámenes</h2>
                <p>
                    Crea y administra los exámenes disponibles.
                </p>
            </div>

            <div className="exam-form-card">

                <div className="form-group">
                    <label>Nombre del examen</label>

                    <input
                        type="text"
                        name="name"
                        value={exam.name}
                        onChange={handleChange}
                        placeholder="Ej: Examen de Java Básico"
                    />
                </div>

                <div className="form-group">
                    <label>Descripción</label>

                    <textarea
                        name="description"
                        value={exam.description}
                        onChange={handleChange}
                        placeholder="Descripción del examen"
                    />
                </div>

                <div className="form-group">
                    <label>Duración (minutos)</label>

                    <input
                        type="number"
                        name="duration"
                        value={exam.duration}
                        onChange={handleChange}
                        placeholder="60"
                    />
                </div>

                <div className="form-group">
                    <label>Seleccione las preguntas</label>

                    <div className="question-selector">
                        {
                            questions.length === 0 ? (
                                <p>No existen preguntas disponibles.</p>
                            ) : (
                                questions.map((question) => (

                                    <div
                                        className="question-checkbox"
                                        key={question.idQuestion}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={
                                                exam.questions.some(
                                                    q => q.idQuestion === question.idQuestion
                                                )
                                            }
                                            onChange={() =>
                                                toggleQuestion(question)
                                            }
                                        />

                                        <span>
                                            {question.statement}
                                        </span>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
                <div className="form-group">
                    <button
                        className="btn-save-question"
                        onClick={saveExam}
                    >
                        {
                            editingExam
                                ? "Actualizar examen"
                                : "Guardar examen"
                        }
                    </button>
                </div>
            </div>

            <div className="exam-list">
                <h2>Exámenes registrados</h2>
                {
                    exams.length === 0 ? (
                        <p>No existen exámenes registrados.</p>
                    ) : (
                        <table className="question-table">
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Nombre</th>
                                    <th>Duración</th>
                                    <th>Preguntas</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    exams.map((item, index) => (
                                        <tr key={item.idExam}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.duration} min</td>
                                            <td>
                                                {item.questions.length}{" "}
                                                {item.questions.length === 1
                                                    ? "pregunta"
                                                    : "preguntas"}
                                            </td>
                                            <td>
                                                {getStatusBadge(item.status)}
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        className="btn-icon edit"
                                                        onClick={() => editExam(item)}
                                                        title="Editar examen"
                                                    >
                                                        <i className='bx bx-edit-alt'></i>
                                                    </button>

                                                    <button
                                                        className="btn-icon delete"
                                                        onClick={() => deleteExam(item.idExam)}
                                                        title="Eliminar examen"
                                                    >
                                                        <i className='bx bx-trash'></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    )
                }
            </div>

        </div>
    );

};

export default ExamBank;