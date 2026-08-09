package com.PEED.backend.service;

// Importa la entidad Department
import com.PEED.backend.model.Department;

// Import necesario para Listar
import java.util.List; 

public interface DepartmentService {
    
    // Método para guardar un nuevo Department
    Department newDepartment(Department newDepartment);
    
    // Método para consultar todos los Departments
    List<Department> getAll();
    
    // Método para modificar un Department existente
    Department modifyDepartment(Department department);
    
    // Método para eliminar un Department por su ID
    boolean deleteDepartment(Long iddepartment);
}