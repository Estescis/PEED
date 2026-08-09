package com.PEED.backend.service;

import com.PEED.backend.model.City;
import com.PEED.backend.repository.CityRepository;

import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import java.util.List;

//Indica que esta clase es un servicio de Spring
@Service
// Asegura que si algo falla, no se queden datos a medio guardar
@Transactional 

public class CityServiceImpl implements CityService {

    // Repositorio inyectado por constructor para acceder a la base de datos
    private final CityRepository cityRepository;

    // Constructor de inyección de dependencias
    CityServiceImpl(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }
    
    // CREATE: Guarda un nuevo City
    @Override
    public City newCity(City newCity) {
        return cityRepository.save(newCity);
    }
    
    // READ: Consulta todos los Cities
    @Override
    public List<City> getAll() {
        return cityRepository.findAll();
    }
    
    // UPDATE: Modifica un City existente
    @Override
    public City modifyCity(City city) {
        
        // Busca el City por su ID
        Optional<City> cityEncontrado =
                cityRepository.findById(city.getIdcity());
        // Si existe, actualiza sus datos
        if (cityEncontrado.isPresent()) {
            City cityActual = cityEncontrado.get();
            cityActual.setName(city.getName());
            cityActual.setStatus(city.getStatus());
            cityActual.setDepartment(city.getDepartment());           
            // Guarda los cambios en la Base de Datos
            return cityRepository.save(cityActual);
        }
        // Si no existe retorno null
        return null;
    }
    
    // DELETE: Elimina un City por ID
    @Override
    public boolean deleteCity(Long idcity) {
        // Busca si el City existe
        Optional<City> cityEncontrado =
                cityRepository.findById(idcity);
        // Si existe, lo elimina
        if (cityEncontrado.isPresent()) {
            cityRepository.delete(cityEncontrado.get());
            return true;
        }
        // Si no existe, retorna false
        return false;
    }
}