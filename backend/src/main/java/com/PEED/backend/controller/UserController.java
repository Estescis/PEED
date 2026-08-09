package com.PEED.backend.controller;

// Importa la entidad User
import com.PEED.backend.model.User;

// Importa la interfaz del servicio
import com.PEED.backend.service.UserService;

// Importa las anotaciones REST de Spring Boot
import org.springframework.web.bind.annotation.*;

import com.PEED.backend.dto.UserResponseDTO;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")

// Indica que esta clase funcionará como controlador REST
@RestController

// Define la ruta principal del controlador
@RequestMapping("/user")

public class UserController {

    // Repositorio inyectado por constructor para acceder a la lógica del CRUD
    private final UserService userService;

    // Constructor de inyección de dependencias
    UserController(UserService userService) {
        this.userService = userService;
    }

    // =========================
    // CREATE - Guardar User
    // =========================
    // URL: POST /user/new
    @PostMapping("/new")
    public User newUser(@RequestBody User user) {
        // Envía el objeto al servicio para guardarlo en la BD
        return this.userService.newUser(user);
    }
    
    // =========================
    // READ - Mostrar Users
    // =========================
    // URL: GET /user/show
    @GetMapping("/show")
    public List<User> getAll() {
        // Retorna todos los Users registrados
        return this.userService.getAll();
    }

    // =========================
    // UPDATE - Modificar User
    // =========================
    // URL: PUT /user/modify/{id}
    @PutMapping("/modify/{id}")
    public User updateUser(@PathVariable("id") Long iduser, @RequestBody User user) {
        // Asignamos el ID que viene en la URL al objeto user
        // para asegurarnos de que estamos actualizando el correcto
        user.setIduser(iduser);
        // Envía el User actualizado al servicio
        return userService.modifyUser(user);
    }
    
    // =========================
    // DELETE - Eliminar User
    // =========================
    // URL: DELETE /user/delete/{id}
    @DeleteMapping("/delete/{id}")
    public boolean deleteUser(@PathVariable("id") Long iduser) {
        // Envía el ID al servicio para eliminar el registro
        return userService.deleteUser(iduser);
    }

    // =========================
    // LOGIN - Autenticar Usuario
    // =========================
    // URL: POST /user/login
    @PostMapping("/login")
    public UserResponseDTO login(@RequestBody User user) {

        return userService.login(
            user.getIdentification(),
            user.getPassword()
        );
    }
}