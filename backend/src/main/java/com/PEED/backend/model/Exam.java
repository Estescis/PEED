package com.PEED.backend.model;

import jakarta.persistence.*;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "exam")

public class Exam {

    // ID DEL EXAMEN
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_exam")
    private Long idExam;

    // NOMBRE DEL EXAMEN
    @Column(nullable = false, length = 100)
    private String name;

    // DESCRIPCIÓN
    @Column(columnDefinition = "TEXT")
    private String description;

    // DURACIÓN EN MINUTOS
    @Column(nullable = false)
    private Integer duration;

    // ESTADO
    @Column(nullable = false)
    private Boolean status = true;

    // FECHA DE CREACIÓN
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // ADMINISTRADOR QUE CREÓ EL EXAMEN
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "id_user",
        nullable = false,
        foreignKey = @ForeignKey(name = "FK_EXAM_USER")
    )
    private User user;

    // PREGUNTAS DEL EXAMEN
    @ManyToMany
    @JoinTable(
        name = "exam_question",
        joinColumns = @JoinColumn(name = "id_exam"),
        inverseJoinColumns = @JoinColumn(name = "id_question")
    )
    private List<Question> questions = new ArrayList<>();
}