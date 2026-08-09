import React, { useEffect, useState } from "react";

const QuestionBank = () => {

    const usuario = JSON.parse(
        localStorage.getItem("usuarioLogueado")
    );

    const [question, setQuestion] = useState({
        statement: "",
        questionType: "",
        correctAnswer: "",
        options: []
    });

    const [questions, setQuestions] = useState([]);
    const [editingQuestion, setEditingQuestion] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuestion({
            ...question,
            [name]: value
        });
    };

    const addOption = () => {

    setQuestion({
        ...question,
        options: [
            ...question.options,
            {
                optionText: "",
                correct: false
            }
        ]
    });
    };  

    const handleOptionChange = (index, value) => {
        const newOptions = [...question.options];
        newOptions[index].optionText = value;

        setQuestion({
            ...question,
            options: newOptions
        });
    };

    const selectCorrectOption = (index) => {
        const newOptions = question.options.map(
            (option, i) => ({
                ...option,
                correct: i === index
            })
        );
        setQuestion({
            ...question,
            options: newOptions
        });
    };

    const setTrueFalseAnswer = (answer) => {
        setQuestion({
            ...question,
            options: [
                {
                    optionText: "Verdadero",
                    correct: answer === "Verdadero"
                },
                {
                    optionText: "Falso",
                    correct: answer === "Falso"
                }
            ]
        });
    };

    const cleanForm = () => {
        setQuestion({
            statement: "",
            questionType: "",
            correctAnswer: "",
            options: []
        });
    };

    const saveQuestion = async () => {
        const questionData = {
            statement: question.statement,
            questionType: question.questionType,
            correctAnswer: question.correctAnswer,
            status: true,
            user: {
                iduser: usuario.iduser
            },
            options: question.options
        };
        try {
            const url = editingQuestion
                ? `http://localhost:8080/question/update/${editingQuestion}`
                : "http://localhost:8080/question/new";

            const method = editingQuestion
                ? "PUT"
                : "POST";

            const response = await fetch(
                url,
                {
                    method,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(questionData)
                }
            );

            if(response.ok){
                const data = await response.json();
                console.log(
                    "Pregunta creada:",
                    data
                );
                alert(
                    editingQuestion
                        ? "Pregunta actualizada correctamente"
                        : "Pregunta creada correctamente"
                );
            }
            else{
                alert(
                    "Error al crear la pregunta"
                );
            }
        } catch(error){
            console.error(
                error
            );
            alert(
                "No fue posible conectar con el servidor"
            );
        }
        cleanForm();
        setEditingQuestion(null);
        loadQuestions();
    };

    /* ELIMINAR PREGUNTA*/
    const deleteQuestion = async (idQuestion) => {
        const confirmDelete = window.confirm(
            "¿Está seguro de eliminar esta pregunta?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/question/${idQuestion}`,
                {
                    method: "DELETE"
                }
            );

            if (response.ok) {
                alert("Pregunta eliminada correctamente");
                loadQuestions();
            } else {
                alert("No fue posible eliminar la pregunta");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión con el servidor");
        }
    };

    /* EDITAR (ACTUALIZAR) PREGUNTA*/
    const editQuestion = (questionSelected) => {
        setEditingQuestion(questionSelected.idQuestion);
        setQuestion({
            statement: questionSelected.statement,
            questionType: questionSelected.questionType,
            correctAnswer: questionSelected.correctAnswer || "",
            options: questionSelected.options
                ? questionSelected.options.map(option => ({
                    optionText: option.optionText,
                    correct: option.correct
                }))
                : []
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

    const getQuestionType = (type) => {
        switch (type) {
            case "MULTIPLE_CHOICE":
                return "Selección múltiple";

            case "TRUE_FALSE":
                return "Verdadero/Falso";

            case "OPEN":
                return "Pregunta abierta";

            case "CLOSED":
                return "Pregunta cerrada";

            default:
                return type;
        }
    };

    const getStatusBadge = (status) => {
        if (status) {
            return (
                <span className="status active">
                    Activa
                </span>
            );
        }
        return (
            <span className="status inactive">
                Inactiva
            </span>
        );
    };

    useEffect(() => {
        loadQuestions();
    }, []);

    return (
        <div className="question-bank-container">
            <div className="page-header">
                <h2>Banco de Preguntas</h2>
                <p>Administra las preguntas disponibles para los exámenes.</p>
            </div>

            <div className="question-form-card">

                <div className="form-group">                    
                    <label htmlFor="statement">Pregunta</label>
                        <textarea id="statement" name="statement" value={question.statement} onChange={handleChange} placeholder="Escriba la pregunta"/>
                </div>

                <div className="form-group">
                    <label htmlFor="questionType">Tipo de pregunta:</label>
                        <select id="questionType" name="questionType" value={question.questionType} onChange={handleChange}>
                            <option value="">Seleccione</option>
                            <option value="MULTIPLE_CHOICE">Selección múltiple</option>
                            <option value="TRUE_FALSE">Verdadero/Falso</option>
                            <option value="OPEN">Pregunta abierta</option>
                            <option value="CLOSED">Pregunta cerrada</option>
                        </select>
                </div>

                {
                question.questionType === "MULTIPLE_CHOICE" && (
                    <div className="options-container">
                        <h3>Opciones</h3>
                        {
                            question.options.map((option, index) => (
                                <div className="option-item" key={index}>
                                    <input
                                        type="text"
                                        value={option.optionText}
                                        placeholder={`Opción ${index + 1}`}
                                        onChange={(e)=>
                                            handleOptionChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                    />
                                    <input
                                        type="radio"
                                        checked={option.correct}
                                        onChange={() =>
                                            selectCorrectOption(index)
                                        }
                                    />
                                    Correcta
                                </div>
                            ))
                        }
                        <button className="btn-add-option" type="button" onClick={addOption}>Agregar opción</button>
                    </div>
                    )
                }

                {
                    question.questionType === "TRUE_FALSE" && (
                        <div className="true-false-container">
                            <h3>Respuesta correcta</h3>
                            <label>
                                <input
                                    type="radio"
                                    name="trueFalse"
                                    onChange={() =>
                                        setTrueFalseAnswer("Verdadero")
                                    }
                                />
                                Verdadero
                            </label>
                            <br />

                            <label>
                                <input
                                    type="radio"
                                    name="trueFalse"
                                    onChange={() =>
                                        setTrueFalseAnswer("Falso")
                                    }
                                />
                                Falso
                            </label>
                        </div>
                    )
                }

                {
                    (
                        question.questionType === "OPEN" ||
                        question.questionType === "CLOSED"
                    ) && (
                        <div className="answer-container">
                            <h3>
                                Respuesta correcta
                            </h3>
                            <textarea
                                name="correctAnswer"
                                value={question.correctAnswer}
                                onChange={handleChange}
                                placeholder="Ingrese la respuesta correcta"
                            />
                        </div>
                    )
                }

                <button className="btn-save-question" type="button" onClick={saveQuestion}>
                    {
                        editingQuestion
                            ? "Actualizar pregunta"
                            : "Guardar pregunta"
                    }
                </button>
            </div>

            <div className="question-list">
                <h2>Preguntas registradas</h2>

                        {
                questions.length === 0 ? (
                    <p>No existen preguntas registradas.</p>
                ) : (

                    <table className="question-table">
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Pregunta</th>
                                <th>Tipo</th>
                                <th>Estado</th>
                                <th>Administrador</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                questions.map((item, index) => (
                                    <tr key={item.idQuestion}>

                                        <td>
                                            {index + 1}
                                        </td>

                                        <td>
                                            {item.statement}
                                        </td>

                                        <td>
                                            {getQuestionType(item.questionType)}
                                        </td>

                                        <td>
                                            {getStatusBadge(item.status)}
                                        </td>

                                        <td>
                                            {item.user.names} {item.user.lastnames}
                                        </td>

                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    className="btn-icon edit"
                                                    onClick={() => editQuestion(item)}
                                                    title="Editar pregunta"
                                                >
                                                    <i className='bx bx-edit-alt'></i>
                                                </button>

                                                <button
                                                    className="btn-icon delete"
                                                    onClick={() => deleteQuestion(item.idQuestion)}
                                                    title="Eliminar pregunta"
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

export default QuestionBank;