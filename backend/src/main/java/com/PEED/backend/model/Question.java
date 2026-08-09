package com.PEED.backend.model;

import com.PEED.backend.model.enums.QuestionType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

import java.util.List;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;

@Data
@Entity
@Table(name = "questions")

public class Question {

    // ID DE LA PREGUNTA
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_question")
    private Long idQuestion;


    // TEXTO DE LA PREGUNTA
    @Column(nullable = false, columnDefinition = "TEXT")
    private String statement;


    // TIPO DE PREGUNTA
    @Enumerated(EnumType.STRING)
    @Column(name = "question_type", length = 30, nullable = false)
    private QuestionType questionType;


    // RESPUESTA CORRECTA
    // Se utilizará principalmente para:
    // - Pregunta abierta
    // - Pregunta cerrada
    // - Verdadero/Falso
    @Column(columnDefinition = "TEXT")
    private String correctAnswer;


    // ESTADO DE LA PREGUNTA
    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean status = true;


    // FECHA DE CREACIÓN
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;


    // ADMINISTRADOR QUE CREÓ LA PREGUNTA
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "id_user",
        nullable = false,
        foreignKey = @ForeignKey(name = "FK_QUESTION_USER")
    )
    private User user;

    // OPCIONES DE LA PREGUNTA
    @OneToMany(
        mappedBy = "question",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<QuestionOption> options = new java.util.ArrayList<>();
}