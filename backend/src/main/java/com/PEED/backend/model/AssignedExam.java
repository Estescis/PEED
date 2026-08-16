package com.PEED.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "assigned_exam")

public class AssignedExam {

    // ==========================
    // ID DE LA ASIGNACIÓN
    // ==========================
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_assigned")
    private Long idAssigned;

    // ==========================
    // EXAMEN ASIGNADO
    // ==========================
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "id_exam",
        nullable = false,
        foreignKey = @ForeignKey(name = "fk_assigned_exam_exam")
    )
    private Exam exam;

    // ==========================
    // CANDIDATO
    // ==========================
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "id_candidate",
        nullable = false,
        foreignKey = @ForeignKey(name = "fk_assigned_exam_candidate")
    )
    private User candidate;

    // ==========================
    // FECHA DE ASIGNACIÓN
    // ==========================
    @CreationTimestamp
    @Column(name = "assigned_date", updatable = false)
    private LocalDateTime assignedDate;

    // ==========================
    // FECHA LÍMITE
    // ==========================
    @Column(name = "deadline")
    private LocalDateTime deadline;

    // ==========================
    // ESTADO
    // ==========================
    @Column(nullable = false)
    private Boolean status = true;

    // ==========================
    // INTENTOS
    // ==========================
    @Column(nullable = false)
    private Integer attempts = 0;

    // ==========================
    // CALIFICACIÓN
    // ==========================
    @Column
    private Double score;
}