package com.PEED.backend.service;

// Importa la entidad User
import com.PEED.backend.model.User;

// Import necesario para Listar
import java.util.List;

import com.PEED.backend.dto.UserResponseDTO;

public interface UserService {

    // Método para guardar un nuevo User
    User newUser(User newUser);
    
    // Método para consultar todos los Users
    List<User> getAll();

    // Método para consultar todos los candidatos
    List<User> getCandidates();
    
    // Método para modificar un User existente
    User modifyUser(User user);
    
    // Método para eliminar un User por su ID
    boolean deleteUser(Long iduser);

    // LOGIN: Método para autenticar un usuario
    UserResponseDTO login(String identification, String password);
}