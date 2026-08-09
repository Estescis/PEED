package com.PEED.backend.service;

import com.PEED.backend.model.Exam;

import java.util.List;

public interface ExamService {

    // Crear examen
    Exam newExam(Exam exam);

    // Actualizar examen
    Exam updateExam(Exam exam);

    // Consultar todos
    List<Exam> getAll();

    // Consultar por administrador
    List<Exam> getByUser(Long iduser);

    // Buscar por ID
    Exam getById(Long idExam);

    // Eliminar examen
    boolean deleteExam(Long idExam);

}