package com.PEED.backend.service;

import com.PEED.backend.model.Exam;
import com.PEED.backend.repository.ExamRepository;

import com.PEED.backend.dto.ExamCandidateDTO;
import com.PEED.backend.dto.QuestionCandidateDTO;
import com.PEED.backend.dto.QuestionOptionCandidateDTO;

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
    // CONSULTAR EXAMEN PARA PRESENTAR
    // ==========================
    @Override
    public ExamCandidateDTO getExamForCandidate(Long idExam) {
        Optional<Exam> optionalExam =
                examRepository.findById(idExam);
        if (optionalExam.isEmpty()) {
            return null;
        }
        Exam exam = optionalExam.get();

        // ==========================
        // CREAR DTO DEL EXAMEN
        // ==========================
        ExamCandidateDTO examDTO = new ExamCandidateDTO();
        examDTO.setIdExam(exam.getIdExam());
        examDTO.setName(exam.getName());
        examDTO.setDescription(exam.getDescription());
        examDTO.setDuration(exam.getDuration());

        // ==========================
        // CONVERTIR PREGUNTAS
        // ==========================
        List<QuestionCandidateDTO> questionDTOs =
                exam.getQuestions()
                        .stream()
                        .map(question -> {
                            QuestionCandidateDTO questionDTO =
                                    new QuestionCandidateDTO();
                            questionDTO.setIdQuestion(
                                    question.getIdQuestion()
                            );
                            questionDTO.setStatement(
                                    question.getStatement()
                            );
                            questionDTO.setQuestionType(
                                    question.getQuestionType().name()
                            );
                            // ==========================
                            // CONVERTIR OPCIONES
                            // ==========================
                            List<QuestionOptionCandidateDTO> optionDTOs =
                                    question.getOptions()
                                            .stream()
                                            .map(option -> {
                                                QuestionOptionCandidateDTO optionDTO =
                                                        new QuestionOptionCandidateDTO();
                                                optionDTO.setIdOption(
                                                        option.getIdOption()
                                                );
                                                optionDTO.setOptionText(
                                                        option.getOptionText()
                                                );
                                                return optionDTO;
                                            })
                                            .toList();
                            questionDTO.setOptions(optionDTOs);
                            return questionDTO;
                        })
                        .toList();
        examDTO.setQuestions(questionDTOs);
        return examDTO;
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