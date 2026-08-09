package com.PEED.backend.repository;

import com.PEED.backend.model.Exam;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepository extends JpaRepository<Exam, Long> {

    // Buscar todos los exámenes creados por un administrador
    List<Exam> findByUser_Iduser(Long iduser);

}