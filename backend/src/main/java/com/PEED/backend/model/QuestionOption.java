package com.PEED.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;


@Data
@Entity
@Table(name = "question_options")

public class QuestionOption {

    // ID DE LA OPCIÓN
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_option")
    private Long idOption;


    // TEXTO DE LA OPCIÓN
    @Column(nullable = false, length = 255)
    private String optionText;


    // INDICA SI ES LA RESPUESTA CORRECTA
    @Column(nullable = false)
    private Boolean correct = false;


    // PREGUNTA A LA QUE PERTENECE
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "id_question",
        nullable = false,
        foreignKey = @ForeignKey(name = "FK_OPTION_QUESTION")
    )
    @JsonIgnore
    private Question question;

}