package com.PEED.backend.repository;

import com.PEED.backend.model.AssignedExam;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignedExamRepository extends JpaRepository<AssignedExam, Long> {

    // Buscar asignaciones de un candidato
    List<AssignedExam> findByCandidate_Iduser(Long iduser);

    // Buscar asignaciones de un examen
    List<AssignedExam> findByExam_IdExam(Long idExam);

    // Buscar asignaciones de los exámenes creados por un administrador
    List<AssignedExam> findByExam_User_Iduser(Long iduser);
}