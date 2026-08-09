package com.PEED.backend.service;

// Importa la entidad City
import com.PEED.backend.model.City;

// Import necesario para Listar
import java.util.List;

public interface CityService {

    // Método para guardar un nuevo City
    City newCity(City newCity);
    
    // Método para consultar todos los Cities
    List<City> getAll();
    
    // Método para modificar un City existente
    City modifyCity(City city);
    
    // Método para eliminar un City por su ID
    boolean deleteCity(Long idcity);
}