package com.PEED.backend.service;

import com.PEED.backend.model.Question;
import com.PEED.backend.repository.QuestionRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional

public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository questionRepository;

    // Inyección de dependencias
    public QuestionServiceImpl(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    // CREATE
    @Override
    public Question newQuestion(Question question) {
        if(question.getOptions() != null){
            question.getOptions().forEach(option -> {
                option.setQuestion(question);
            });
        }
        return questionRepository.save(question);
    }

    // UPDATE
    @Override
    public Question updateQuestion(Question question) {

        Question existingQuestion =
                questionRepository.findById(
                        question.getIdQuestion()
                ).orElse(null);

        if(existingQuestion == null){
            return null;
        }

        existingQuestion.setStatement(
                question.getStatement()
        );

        existingQuestion.setQuestionType(
                question.getQuestionType()
        );

        existingQuestion.setCorrectAnswer(
                question.getCorrectAnswer()
        );

        existingQuestion.setStatus(
                question.getStatus()
        );

        existingQuestion.getOptions().clear();

        if(question.getOptions() != null){
            question.getOptions().forEach(option -> {
                option.setQuestion(existingQuestion);
                existingQuestion.getOptions().add(option);
            });
        }
        return questionRepository.save(existingQuestion);
    }

    // READ ALL
    @Override
    public List<Question> getAll() {
        return questionRepository.findAll();
    }

    @Override
    public List<Question> getByUser(Long iduser) {
        return questionRepository.findByUser_Iduser(iduser);
    }

    // READ BY ID
    @Override
    public Question getById(Long idQuestion) {
        Optional<Question> question =
                questionRepository.findById(idQuestion);
        return question.orElse(null);
    }

    // UPDATE
    @Override
    public Question modifyQuestion(Question question) {
        Optional<Question> questionEncontrada =
                questionRepository.findById(question.getIdQuestion());

        if(questionEncontrada.isPresent()){
            Question questionActual = questionEncontrada.get();

            questionActual.setStatement(
                    question.getStatement()
            );

            questionActual.setQuestionType(
                    question.getQuestionType()
            );

            questionActual.setCorrectAnswer(
                    question.getCorrectAnswer()
            );

            questionActual.setStatus(
                    question.getStatus()
            );
            return questionRepository.save(questionActual);
        }
        return null;
    }

    // DELETE
    @Override
    public boolean deleteQuestion(Long idQuestion) {

        Optional<Question> question =
                questionRepository.findById(idQuestion);

        if(question.isPresent()){
            questionRepository.delete(question.get());
            return true;
        }

        return false;
    }
    
}