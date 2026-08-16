package com.PEED.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuestionCandidateDTO {

    private Long idQuestion;
    private String statement;
    private String questionType;
    private List<QuestionOptionCandidateDTO> options;
}