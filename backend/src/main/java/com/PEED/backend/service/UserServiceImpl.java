package com.PEED.backend.service;

import com.PEED.backend.model.User;
import com.PEED.backend.repository.UserRepository;

import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.PEED.backend.dto.UserResponseDTO;

//Indica que esta clase es un servicio de Spring
@Service
// Asegura que si algo falla, no se queden datos a medio guardar
@Transactional 


public class UserServiceImpl implements UserService {

    // Repositorio inyectado por constructor para acceder a la base de datos
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    // Constructor de inyección de dependencias
    UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    }

    // CREATE: Guarda un nuevo User
    @Override
    public User newUser(User newUser) {

    // Encripta la contraseña antes de guardarla
    newUser.setPassword(
        passwordEncoder.encode(newUser.getPassword())
    );

    return userRepository.save(newUser);
    }
    
    // READ: Consulta todos los Users
    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }
    
    // UPDATE: Modifica un User existente
    @Override
    public User modifyUser(User user) {
        
        // Busca el User por su ID
        Optional<User> userEncontrado =
                userRepository.findById(user.getIduser());
        // Si existe, actualiza sus datos
        if (userEncontrado.isPresent()) {
            User userActual = userEncontrado.get();
            userActual.setNames(user.getNames());
            userActual.setLastnames(user.getLastnames());
            userActual.setTypeIdentification(user.getTypeIdentification());
            userActual.setIdentification(user.getIdentification());
            userActual.setEmail(user.getEmail());
            userActual.setPassword(user.getPassword());
            userActual.setUserType(user.getUserType());
            userActual.setGender(user.getGender());
            userActual.setPhone(user.getPhone());
            userActual.setBirthdate(user.getBirthdate());
            userActual.setStatus(user.getStatus());
            userActual.setCity(user.getCity());      
            // Guarda los cambios en la Base de Datos
            return userRepository.save(userActual);
        }
        // Si no existe retorno null
        return null;
    }
    
    // DELETE: Elimina un User por ID
    @Override
    public boolean deleteUser(Long iduser) {
        // Busca si el User existe
        Optional<User> userEncontrado =
                userRepository.findById(iduser);
        // Si existe, lo elimina
        if (userEncontrado.isPresent()) {
            userRepository.delete(userEncontrado.get());
            return true;
        }
        // Si no existe, retorna false
        return false;
    }

    // LOGIN: Autenticar usuario
    @Override
    public UserResponseDTO login(String identification, String password) {

        // Busca el usuario por identificación
        Optional<User> usuarioEncontrado =
                userRepository.findByIdentification(identification);

        // Si existe el usuario
        if (usuarioEncontrado.isPresent()) {

            User usuario = usuarioEncontrado.get();

            // Compara la contraseña ingresada
            // con la contraseña encriptada de la BD
            if(passwordEncoder.matches(
                    password,
                    usuario.getPassword()
            )) {
                return new UserResponseDTO(usuario);
            }
        }

    // Si no existe o la contraseña no coincide
    return null;
    }
}    