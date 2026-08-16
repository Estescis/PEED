package com.PEED.backend.repository;

// Importa la entidad User para trabajar con ella en la BD
import com.PEED.backend.model.User;
import com.PEED.backend.model.enums.UserType;

// Importa JpaRepository de Spring Data JPA
// para acceder a métodos CRUD automáticos
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
// Define una interfaz llamada UserRepository
// que hereda de JpaRepository
public interface UserRepository extends JpaRepository<User, Long> {
    // JpaRepository proporciona métodos como save(), findById(), findAll(), deleteById(), etc.
    // No es necesario escribir código adicional para estas operaciones básicas
    Optional<User> findByIdentification(String identification);
    List<User> findByUserType(UserType userType);
}