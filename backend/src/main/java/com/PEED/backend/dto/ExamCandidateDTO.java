package com.PEED.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class ExamCandidateDTO {

    private Long idExam;
    private String name;
    private String description;
    private Integer duration;
    private List<QuestionCandidateDTO> questions;
}