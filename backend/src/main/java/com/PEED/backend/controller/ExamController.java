package com.PEED.backend.controller;

import com.PEED.backend.model.Exam;
import com.PEED.backend.service.ExamService;

import com.PEED.backend.dto.ExamCandidateDTO;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/exam")
@CrossOrigin(origins = "http://localhost:5173")

public class ExamController {

    private final ExamService examService;

    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    // ==========================
    // CREAR EXAMEN
    // ==========================
    @PostMapping("/new")
    public ResponseEntity<Exam> newExam(
            @RequestBody Exam exam
    ) {

        Exam nuevoExam = examService.newExam(exam);

        return ResponseEntity.ok(nuevoExam);
    }

    // ==========================
    // ACTUALIZAR EXAMEN
    // ==========================
    @PutMapping("/update")
    public ResponseEntity<Exam> updateExam(
            @RequestBody Exam exam
    ) {

        Exam examActualizado =
                examService.updateExam(exam);

        if (examActualizado == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(examActualizado);
    }

    // ==========================
    // CONSULTAR TODOS
    // ==========================
    @GetMapping("/all")
    public ResponseEntity<List<Exam>> getAll() {

        return ResponseEntity.ok(
                examService.getAll()
        );
    }

    // ==========================
    // CONSULTAR POR USUARIO
    // ==========================
    @GetMapping("/user/{iduser}")
    public ResponseEntity<List<Exam>> getByUser(
            @PathVariable Long iduser
    ) {

        return ResponseEntity.ok(
                examService.getByUser(iduser)
        );
    }

    // ==========================
    // CONSULTAR POR ID
    // ==========================
    @GetMapping("/{id}")
    public ResponseEntity<Exam> getById(
            @PathVariable Long id
    ) {

        Exam exam = examService.getById(id);

        if (exam == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(exam);
    }

    // ==========================
    // CONSULTAR EXAMEN PARA PRESENTAR
    // ==========================
    @GetMapping("/{id}/take")
    public ResponseEntity<ExamCandidateDTO> getExamForCandidate(
            @PathVariable Long id
    ) {
        ExamCandidateDTO exam =
                examService.getExamForCandidate(id);
        if (exam == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(exam);
    }

    // ==========================
    // ELIMINAR
    // ==========================
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteExam(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                examService.deleteExam(id)
        );
    }

}