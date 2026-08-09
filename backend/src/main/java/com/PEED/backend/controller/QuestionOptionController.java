package com.PEED.backend.controller;

import com.PEED.backend.model.QuestionOption;
import com.PEED.backend.service.QuestionOptionService;

import java.util.List;

import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:5173")

@RestController
@RequestMapping("/question-option")

public class QuestionOptionController {
    private final QuestionOptionService optionService;

    // Constructor de inyección de dependencias
    public QuestionOptionController(
            QuestionOptionService optionService
    ){
        this.optionService = optionService;
    }

    // =========================
    // CREATE - Guardar opción
    // =========================
    // URL: POST /question-option/new
    @PostMapping("/new")
    public QuestionOption newOption(
            @RequestBody QuestionOption option
    ){
        return optionService.newOption(option);
    }

    // =========================
    // READ - Mostrar opciones
    // =========================
    // URL: GET /question-option/show
    @GetMapping("/show")
    public List<QuestionOption> getAll(){
        return optionService.getAll();
    }

    // =========================
    // READ BY ID
    // =========================
    // URL: GET /question-option/{id}
    @GetMapping("/{id}")
    public QuestionOption getById(
            @PathVariable("id") Long idOption
    ){
        return optionService.getById(idOption);
    }

    // =========================
    // UPDATE
    // =========================
    // URL: PUT /question-option/modify/{id}
    @PutMapping("/modify/{id}")
    public QuestionOption modifyOption(
            @PathVariable("id") Long idOption,
            @RequestBody QuestionOption option
    ){
        option.setIdOption(idOption);
        return optionService.modifyOption(option);
    }

    // =========================
    // DELETE
    // =========================
    // URL: DELETE /question-option/delete/{id}
    @DeleteMapping("/delete/{id}")
    public boolean deleteOption(
            @PathVariable("id") Long idOption
    ){
        return optionService.deleteOption(idOption);
    }

}