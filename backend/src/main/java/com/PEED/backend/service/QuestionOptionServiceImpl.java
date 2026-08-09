package com.PEED.backend.service;

import com.PEED.backend.model.QuestionOption;
import com.PEED.backend.repository.QuestionOptionRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional

public class QuestionOptionServiceImpl implements QuestionOptionService {
    private final QuestionOptionRepository optionRepository;

    // Inyección de dependencias
    public QuestionOptionServiceImpl(
            QuestionOptionRepository optionRepository
    ){
        this.optionRepository = optionRepository;
    }

    // CREATE
    @Override
    public QuestionOption newOption(QuestionOption option){
        return optionRepository.save(option);
    }

    // READ ALL
    @Override
    public List<QuestionOption> getAll(){
        return optionRepository.findAll();
    }

    // READ BY ID
    @Override
    public QuestionOption getById(Long idOption){
        Optional<QuestionOption> option =
                optionRepository.findById(idOption);
        return option.orElse(null);
    }

    // UPDATE
    @Override
    public QuestionOption modifyOption(
            QuestionOption option
    ){
        Optional<QuestionOption> optionEncontrada =
                optionRepository.findById(
                        option.getIdOption()
                );
        if(optionEncontrada.isPresent()){
            QuestionOption optionActual =
                    optionEncontrada.get();

            optionActual.setOptionText(
                    option.getOptionText()
            );

            optionActual.setCorrect(
                    option.getCorrect()
            );
            return optionRepository.save(optionActual);
        }
        return null;
    }

    // DELETE
    @Override
    public boolean deleteOption(Long idOption){

        Optional<QuestionOption> option =
                optionRepository.findById(idOption);

        if(option.isPresent()){

            optionRepository.delete(
                    option.get()
            );
            return true;
        }
        return false;
    }

}