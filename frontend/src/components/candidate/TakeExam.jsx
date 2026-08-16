import React, { useEffect, useState } from "react";

const TakeExam = ({ examId }) => {

    // ==========================
    // DATOS DEL EXAMEN
    // ==========================
    const [exam, setExam] = useState(null);
    const [answers, setAnswers] = useState({});

    // ==========================
    // CARGAR EXAMEN
    // ==========================
    const loadExam = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/exam/${examId}/take`
            );
            if (!response.ok) {
                throw new Error("No fue posible cargar el examen");
            }
            const data = await response.json();
            console.log("Examen para presentar:", data);
            setExam(data);
        } catch (error) {
            console.error("Error cargando examen:", error);
        }
    };

    // ==========================
    // CARGAR AL INICIAR
    // ==========================
    useEffect(() => {
        if (examId) {
            loadExam();
        }
    }, [examId]);

    // ==========================
    // CARGANDO
    // ==========================
    if (!exam) {
        return (
            <div className="take-exam-container">
                <p>Cargando examen...</p>
            </div>
        );
    }

    return (
        <div className="take-exam-container">

            {/* ==========================
                ENCABEZADO DEL EXAMEN
            ========================== */}
            <div className="page-header">
                <h2>{exam.name}</h2>

                <p>
                    {exam.description}
                </p>

                <p>
                    <strong>Duración:</strong>{" "}
                    {exam.duration} minutos
                </p>
            </div>

            {/* ==========================
                PREGUNTAS
            ========================== */}
            <div className="take-exam-questions">
                {exam.questions.map((question, index) => (
                    <div
                        className="take-exam-question"
                        key={question.idQuestion}
                    >
                        <h3>
                            {index + 1}. {question.statement}
                        </h3>

                        {/* ==========================
                            OPCIONES
                        ========================== */}
                        {question.options.length > 0 && (
                            <div className="take-exam-options">
                                {question.options.map((option) => (
                                    <label
                                        key={option.idOption}
                                        className="take-exam-option"
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${question.idQuestion}`}
                                            value={option.idOption}
                                            checked={
                                                answers[question.idQuestion] === option.idOption
                                            }
                                            onChange={() =>
                                                setAnswers({
                                                    ...answers,
                                                    [question.idQuestion]: option.idOption
                                                })
                                            }
                                        />
                                        <span>
                                            {option.optionText}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}

                        {/* ==========================
                            PREGUNTA CERRADA
                        ========================== */}
                        {question.questionType === "CLOSED" && (
                            <textarea
                                className="take-exam-answer"
                                placeholder="Escribe tu respuesta..."
                            />
                        )}

                    </div>
                ))}
            </div>

            {/* ==========================
                BOTÓN FINALIZAR
            ========================== */}
            <button
                type="button"
                className="btn-submit-exam"
                onClick={() => {
                    console.log("Respuestas seleccionadas:", answers);
                }}
            >
                Finalizar examen
            </button>

        </div>
    );
};

export default TakeExam;