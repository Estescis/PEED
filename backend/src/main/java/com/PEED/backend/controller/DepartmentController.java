package com.PEED.backend.controller;

// Importa la entidad Department
import com.PEED.backend.model.Department;

// Importa la interfaz del servicio
import com.PEED.backend.service.DepartmentService;

// Importa las anotaciones REST de Spring Boot
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Indica que esta clase funcionará como controlador REST
@RestController

// Define la ruta principal del controlador
@RequestMapping("/department")

public class DepartmentController {

    // Repositorio inyectado por constructor para acceder a la lógica del CRUD
    private final DepartmentService departmentService;

    // Constructor de inyección de dependencias
    DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    // =========================
    // CREATE - Guardar Department
    // =========================
    // URL: POST /department/new
    @PostMapping("/new")
    public Department newDepartment(@RequestBody Department department) {
        // Envía el objeto al servicio para guardarlo en la BD
        return this.departmentService.newDepartment(department);
    }
    
    // =========================
    // READ - Mostrar Departments
    // =========================
    // URL: GET /department/show
    @GetMapping("/show")
    public List<Department> getAll() {
        // Retorna todos los Departments registrados
        return this.departmentService.getAll();
    }

    // =========================
    // UPDATE - Modificar Department
    // =========================
    // URL: PUT /department/modify/{id}
    @PutMapping("/modify/{id}")
    public Department updateDepartment(@PathVariable("id") Long iddepartment, @RequestBody Department department) {
        // Asignamos el ID que viene en la URL al objeto department
        // para asegurarnos de que estamos actualizando el correcto
        department.setIddepartment(iddepartment);
        // Envía el Department actualizado al servicio
        return departmentService.modifyDepartment(department);
    }
    
    // =========================
    // DELETE - Eliminar Department
    // =========================
    // URL: DELETE /department/delete/{id}
    @DeleteMapping("/delete/{id}")
    public boolean deleteDepartment(@PathVariable("id") Long iddepartment) {
        // Envía el ID al servicio para eliminar el registro
        return departmentService.deleteDepartment(iddepartment);
    }
}