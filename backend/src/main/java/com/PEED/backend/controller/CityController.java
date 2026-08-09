package com.PEED.backend.controller;

// Importa la entidad City
import com.PEED.backend.model.City;

// Importa la interfaz del servicio
import com.PEED.backend.service.CityService;

// Importa las anotaciones REST de Spring Boot
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Indica que esta clase funcionará como controlador REST
@RestController

// Define la ruta principal del controlador
@RequestMapping("/city")

public class CityController {

    // Repositorio inyectado por constructor para acceder a la lógica del CRUD
    private final CityService cityService;

    // Constructor de inyección de dependencias
    CityController(CityService cityService) {
        this.cityService = cityService;
    }

    // =========================
    // CREATE - Guardar City
    // =========================
    // URL: POST /city/new
    @PostMapping("/new")
    public City newCity(@RequestBody City city) {
        // Envía el objeto al servicio para guardarlo en la BD
        return this.cityService.newCity(city);
    }
    
    // =========================
    // READ - Mostrar Cities
    // =========================
    // URL: GET /city/show
    @GetMapping("/show")
    public List<City> getAll() {
        // Retorna todos los Cities registrados
        return this.cityService.getAll();
    }

    // =========================
    // UPDATE - Modificar City
    // =========================
    // URL: PUT /city/modify/{id}
    @PutMapping("/modify/{id}")
    public City updateCity(@PathVariable("id") Long idcity, @RequestBody City city) {
        // Asignamos el ID que viene en la URL al objeto city
        // para asegurarnos de que estamos actualizando el correcto
        city.setIdcity(idcity);
        // Envía el City actualizado al servicio
        return cityService.modifyCity(city);
    }
    
    // =========================
    // DELETE - Eliminar City
    // =========================
    // URL: DELETE /city/delete/{id}
    @DeleteMapping("/delete/{id}")
    public boolean deleteCity(@PathVariable("id") Long idcity) {
        // Envía el ID al servicio para eliminar el registro
        return cityService.deleteCity(idcity);
    }
}