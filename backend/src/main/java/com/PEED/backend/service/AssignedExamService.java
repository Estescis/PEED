package com.PEED.backend.service;

import com.PEED.backend.model.AssignedExam;

import java.util.List;

public interface AssignedExamService {

    // ==========================
    // CREAR ASIGNACIÓN
    // ==========================
    AssignedExam newAssignedExam(AssignedExam assignedExam);

    // ==========================
    // ACTUALIZAR ASIGNACIÓN
    // ==========================
    AssignedExam updateAssignedExam(AssignedExam assignedExam);

    // ==========================
    // CONSULTAR TODAS
    // ==========================
    List<AssignedExam> getAll();

    // ==========================
    // CONSULTAR POR CANDIDATO
    // ==========================
    List<AssignedExam> getByCandidate(Long iduser);

    // ==========================
    // CONSULTAR POR EXAMEN
    // ==========================
    List<AssignedExam> getByExam(Long idExam);

    // ==========================
    // CONSULTAR POR ADMINISTRADOR
    // ==========================
    List<AssignedExam> getByAdmin(Long iduser);

    // ==========================
    // CONSULTAR POR ID
    // ==========================
    AssignedExam getById(Long idAssigned);

    // ==========================
    // ELIMINAR ASIGNACIÓN
    // ==========================
    boolean deleteAssignedExam(Long idAssigned);
}