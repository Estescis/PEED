package com.PEED.backend.service;

import com.PEED.backend.model.AssignedExam;
import com.PEED.backend.repository.AssignedExamRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional

public class AssignedExamServiceImpl implements AssignedExamService {
        private final AssignedExamRepository assignedExamRepository;

        // ==========================
        // INYECCIÓN DE DEPENDENCIAS
        // ==========================
        public AssignedExamServiceImpl(
                AssignedExamRepository assignedExamRepository) {

                this.assignedExamRepository = assignedExamRepository;
        }

        // ==========================
        // CREAR ASIGNACIÓN
        // ==========================
        @Override
        public AssignedExam newAssignedExam(
                AssignedExam assignedExam) {
                // ==========================
                // VALIDAR FECHA LÍMITE
                // ==========================
                if (assignedExam.getDeadline() == null) {
                        throw new IllegalArgumentException(
                                "La fecha límite es obligatoria"
                        );
                }

                if (!assignedExam.getDeadline().isAfter(LocalDateTime.now())) {
                        throw new IllegalArgumentException(
                                "La fecha límite debe ser posterior a la fecha actual"
                        );
                }

                return assignedExamRepository.save(assignedExam);
        }

        // ==========================
        // ACTUALIZAR ASIGNACIÓN
        // ==========================
        @Override
        public AssignedExam updateAssignedExam(
                AssignedExam assignedExam) {

                AssignedExam existingAssignedExam =
                        assignedExamRepository
                                .findById(assignedExam.getIdAssigned())
                                .orElse(null);

                if (existingAssignedExam == null) {
                return null;
                }

                // ==========================
                // VALIDAR FECHA LÍMITE
                // SOLO SI SE ESTÁ CAMBIANDO
                // ==========================
                if (assignedExam.getDeadline() == null) {
                        throw new IllegalArgumentException(
                                "La fecha límite es obligatoria"
                        );
                }

                if (
                        !assignedExam.getDeadline()
                                .equals(existingAssignedExam.getDeadline())
                        &&
                        !assignedExam.getDeadline()
                                .isAfter(LocalDateTime.now())
                ) {

                        throw new IllegalArgumentException(
                                "La fecha límite debe ser posterior a la fecha actual"
                        );
                }
                // ==========================
                // ACTUALIZAR DATOS
                // ==========================
                existingAssignedExam.setExam(
                        assignedExam.getExam()
                );

                existingAssignedExam.setCandidate(
                        assignedExam.getCandidate()
                );

                existingAssignedExam.setDeadline(
                        assignedExam.getDeadline()
                );

                existingAssignedExam.setStatus(
                        assignedExam.getStatus()
                );

                existingAssignedExam.setAttempts(
                        assignedExam.getAttempts()
                );

                existingAssignedExam.setScore(
                        assignedExam.getScore()
                );

                return assignedExamRepository.save(
                        existingAssignedExam
                );
        }

        // ==========================
        // CONSULTAR TODAS
        // ==========================
        @Override
        public List<AssignedExam> getAll() {

                return assignedExamRepository.findAll();
        }

        // ==========================
        // CONSULTAR POR CANDIDATO
        // ==========================
        @Override
        public List<AssignedExam> getByCandidate(
                Long iduser) {

                return assignedExamRepository
                        .findByCandidate_Iduser(iduser);
        }

        // ==========================
        // CONSULTAR POR EXAMEN
        // ==========================
        @Override
        public List<AssignedExam> getByExam(
                Long idExam) {

                return assignedExamRepository
                        .findByExam_IdExam(idExam);
        }

        // ==========================
        // CONSULTAR POR ADMINISTRADOR
        // ==========================
        @Override
        public List<AssignedExam> getByAdmin(Long iduser) {

        return assignedExamRepository
                .findByExam_User_Iduser(iduser);
        }

        // ==========================
        // CONSULTAR POR ID
        // ==========================
        @Override
        public AssignedExam getById(
                Long idAssigned) {

                Optional<AssignedExam> assignedExam =
                        assignedExamRepository.findById(idAssigned);

                return assignedExam.orElse(null);
        }

        // ==========================
        // ELIMINAR ASIGNACIÓN
        // ==========================
        @Override
        public boolean deleteAssignedExam(
                Long idAssigned) {

                Optional<AssignedExam> assignedExam =
                        assignedExamRepository.findById(idAssigned);

                if (assignedExam.isPresent()) {

                assignedExamRepository.delete(
                        assignedExam.get()
                );

                return true;
                }

                return false;
        }
}