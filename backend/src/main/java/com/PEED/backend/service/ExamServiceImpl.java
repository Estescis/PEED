package com.PEED.backend.service;

import com.PEED.backend.model.Exam;
import com.PEED.backend.repository.ExamRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional

public class ExamServiceImpl implements ExamService {

    private final ExamRepository examRepository;

    // Inyección de dependencias
    public ExamServiceImpl(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

    // ==========================
    // CREAR EXAMEN
    // ==========================
    @Override
    public Exam newExam(Exam exam) {
        return examRepository.save(exam);
    }

    // ==========================
    // ACTUALIZAR EXAMEN
    // ==========================
    @Override
    public Exam updateExam(Exam exam) {

        Exam existingExam = examRepository
                .findById(exam.getIdExam())
                .orElse(null);

        if (existingExam == null) {
            return null;
        }

        existingExam.setName(exam.getName());
        existingExam.setDescription(exam.getDescription());
        existingExam.setDuration(exam.getDuration());
        existingExam.setStatus(exam.getStatus());

        existingExam.getQuestions().clear();

        if (exam.getQuestions() != null) {
            existingExam.getQuestions().addAll(exam.getQuestions());
        }

        return examRepository.save(existingExam);
    }

    // ==========================
    // CONSULTAR TODOS
    // ==========================
    @Override
    public List<Exam> getAll() {
        return examRepository.findAll();
    }

    // ==========================
    // CONSULTAR POR USUARIO
    // ==========================
    @Override
    public List<Exam> getByUser(Long iduser) {
        return examRepository.findByUser_Iduser(iduser);
    }

    // ==========================
    // CONSULTAR POR ID
    // ==========================
    @Override
    public Exam getById(Long idExam) {

        Optional<Exam> exam = examRepository.findById(idExam);

        return exam.orElse(null);
    }

    // ==========================
    // ELIMINAR
    // ==========================
    @Override
    public boolean deleteExam(Long idExam) {

        Optional<Exam> exam = examRepository.findById(idExam);

        if (exam.isPresent()) {
            examRepository.delete(exam.get());
            return true;
        }

        return false;
    }

}