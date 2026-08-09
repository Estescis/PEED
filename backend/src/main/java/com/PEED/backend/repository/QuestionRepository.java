package com.PEED.backend.repository;

import com.PEED.backend.model.Question;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    
    List<Question> findByUser_Iduser(Long iduser);
}