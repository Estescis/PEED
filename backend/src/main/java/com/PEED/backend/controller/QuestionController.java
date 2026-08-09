package com.PEED.backend.controller;

import com.PEED.backend.model.Question;
import com.PEED.backend.service.QuestionService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/question")
@CrossOrigin(origins = "http://localhost:5173")

public class QuestionController {
    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    // CREAR PREGUNTA
    @PostMapping("/new")
    public ResponseEntity<Question> newQuestion(
            @RequestBody Question question
    ){
        Question nuevaPregunta =
                questionService.newQuestion(question);
        return ResponseEntity.ok(nuevaPregunta);
    }

    // ACTUALIZAR PREGUNTA
    @PutMapping("/update/{id}")
    public ResponseEntity<Question> updateQuestion(
            @PathVariable Long id,
            @RequestBody Question question
    ){
        question.setIdQuestion(id);

        return ResponseEntity.ok(
                questionService.updateQuestion(question)
        );
    }
    
        // CONSULTAR TODAS LAS PREGUNTAS
        @GetMapping("/all")
        public ResponseEntity<List<Question>> getAll(){
                return ResponseEntity.ok(
                        questionService.getAll()
                );
        }

        // CONSULTAR PREGUNTAS DEL ADMINISTRADOR
        @GetMapping("/user/{iduser}")
        public ResponseEntity<List<Question>> getByUser(
                @PathVariable Long iduser
        ) {
        return ResponseEntity.ok(
                questionService.getByUser(iduser)
        );
        }

    // CONSULTAR POR ID
    @GetMapping("/{id}")
    public ResponseEntity<Question> getById(
            @PathVariable Long id
    ){
        Question question =
                questionService.getById(id);
        if(question == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(question);
    }

    // ELIMINAR
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteQuestion(
            @PathVariable Long id
    ){
        return ResponseEntity.ok(
                questionService.deleteQuestion(id)
        );
    }

}