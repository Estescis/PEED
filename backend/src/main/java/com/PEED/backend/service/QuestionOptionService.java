package com.PEED.backend.service;

import com.PEED.backend.model.QuestionOption;

import java.util.List;

public interface QuestionOptionService {

    // Crear opción de respuesta
    QuestionOption newOption(QuestionOption option);

    // Consultar todas las opciones
    List<QuestionOption> getAll();

    // Buscar opción por ID
    QuestionOption getById(Long idOption);

    // Modificar opción
    QuestionOption modifyOption(QuestionOption option);

    // Eliminar opción
    boolean deleteOption(Long idOption);

}