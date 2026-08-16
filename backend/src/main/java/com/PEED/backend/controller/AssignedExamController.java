package com.PEED.backend.controller;

import com.PEED.backend.model.AssignedExam;
import com.PEED.backend.service.AssignedExamService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/assigned-exam")
@CrossOrigin(origins = "http://localhost:5173")

public class AssignedExamController {
        private final AssignedExamService assignedExamService;

        public AssignedExamController(
                AssignedExamService assignedExamService) {

                this.assignedExamService = assignedExamService;
        }

        // ==========================
        // CREAR ASIGNACIÓN
        // ==========================
        @PostMapping("/new")
        public ResponseEntity<AssignedExam> newAssignedExam(
                @RequestBody AssignedExam assignedExam) {

                AssignedExam nuevaAsignacion =
                        assignedExamService.newAssignedExam(
                                assignedExam
                        );

                return ResponseEntity.ok(nuevaAsignacion);
        }

        // ==========================
        // ACTUALIZAR ASIGNACIÓN
        // ==========================
        @PutMapping("/update")
        public ResponseEntity<AssignedExam> updateAssignedExam(
                @RequestBody AssignedExam assignedExam) {

                AssignedExam asignacionActualizada =
                        assignedExamService.updateAssignedExam(
                                assignedExam
                        );

                if (asignacionActualizada == null) {
                return ResponseEntity.notFound().build();
                }

                return ResponseEntity.ok(asignacionActualizada);
        }

        // ==========================
        // CONSULTAR TODAS
        // ==========================
        @GetMapping("/all")
        public ResponseEntity<List<AssignedExam>> getAll() {

                return ResponseEntity.ok(
                        assignedExamService.getAll()
                );
        }

        // ==========================
        // CONSULTAR POR CANDIDATO
        // ==========================
        @GetMapping("/candidate/{iduser}")
        public ResponseEntity<List<AssignedExam>> getByCandidate(
                @PathVariable Long iduser) {

                return ResponseEntity.ok(
                        assignedExamService.getByCandidate(iduser)
                );
        }

        // ==========================
        // CONSULTAR POR EXAMEN
        // ==========================
        @GetMapping("/exam/{idExam}")
        public ResponseEntity<List<AssignedExam>> getByExam(
                @PathVariable Long idExam) {

                return ResponseEntity.ok(
                        assignedExamService.getByExam(idExam)
                );
        }

        // ==========================
        // CONSULTAR POR ADMINISTRADOR
        // ==========================
        @GetMapping("/admin/{iduser}")
        public ResponseEntity<List<AssignedExam>> getByAdmin(
                @PathVariable Long iduser) {

        return ResponseEntity.ok(
                assignedExamService.getByAdmin(iduser)
        );
        }

        // ==========================
        // CONSULTAR POR ID
        // ==========================
        @GetMapping("/{id}")
        public ResponseEntity<AssignedExam> getById(
                @PathVariable Long id) {

                AssignedExam assignedExam =
                        assignedExamService.getById(id);

                if (assignedExam == null) {
                return ResponseEntity.notFound().build();
                }

                return ResponseEntity.ok(assignedExam);
        }

        // ==========================
        // ELIMINAR ASIGNACIÓN
        // ==========================
        @DeleteMapping("/{id}")
        public ResponseEntity<Boolean> deleteAssignedExam(
                @PathVariable Long id) {

                return ResponseEntity.ok(
                        assignedExamService.deleteAssignedExam(id)
                );
        }
}