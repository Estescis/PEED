package com.PEED.backend.service;

import com.PEED.backend.model.Question;

import java.util.List;

public interface QuestionService {

    // Crear una pregunta
    Question newQuestion(Question question);

    // Actualizar pregunta
    Question updateQuestion(Question question);
    
    // Consultar todas las preguntas
    List<Question> getAll();

    // Consultar preguntas por ID de usuario
    List<Question> getByUser(Long iduser);

    // Buscar pregunta por ID
    Question getById(Long idQuestion);

    // Modificar pregunta
    Question modifyQuestion(Question question);

    // Eliminar pregunta
    boolean deleteQuestion(Long idQuestion);

}