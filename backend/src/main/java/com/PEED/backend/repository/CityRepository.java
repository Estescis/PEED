package com.PEED.backend.repository;

// Importa la entidad City para trabajar con ella en la BD
import com.PEED.backend.model.City;

// Importa JpaRepository de Spring Data JPA
// para acceder a métodos CRUD automáticos
import org.springframework.data.jpa.repository.JpaRepository;

// Define una interfaz llamada CityRepository
// que hereda de JpaRepository
public interface CityRepository extends JpaRepository<City, Long> {
    // JpaRepository proporciona métodos como save(), findById(), findAll(), deleteById(), etc.
    // No es necesario escribir código adicional para estas operaciones básicas
}