package com.PEED.backend.service;

import com.PEED.backend.model.Department;
import com.PEED.backend.repository.DepartmentRepository;

import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import java.util.List;

//Indica que esta clase es un servicio de Spring
@Service
// Asegura que si algo falla, no se queden datos a medio guardar
@Transactional 

public class DepartmentServiceImpl implements DepartmentService {

    // Repositorio inyectado por constructor para acceder a la base de datos
    private final DepartmentRepository departmentRepository;

    // Constructor de inyección de dependencias
    DepartmentServiceImpl(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    
    // CREATE: Guarda un nuevo Department
    @Override
    public Department newDepartment(Department newDepartment) {
        return departmentRepository.save(newDepartment);
    }
    
    // READ: Consulta todos los Departments
    @Override
    public List<Department> getAll() {
        return departmentRepository.findAll();
    }
    
    // UPDATE: Modifica un Department existente
    @Override
    public Department modifyDepartment(Department department) {
        
        // Busca el Department por su ID
        Optional<Department> departmentEncontrado =
                departmentRepository.findById(department.getIddepartment());
        // Si existe, actualiza sus datos
        if (departmentEncontrado.isPresent()) {
            Department departmentActual = departmentEncontrado.get();
            departmentActual.setName(department.getName());
            // Guarda los cambios en la Base de Datos
            return departmentRepository.save(departmentActual);
        }
        // Si no existe retorno null
        return null;
    }
    
    // DELETE: Elimina un Department por ID
    @Override
    public boolean deleteDepartment(Long iddepartment) {
        // Busca si el Department existe
        Optional<Department> departmentEncontrado =
                departmentRepository.findById(iddepartment);
        // Si existe, lo elimina
        if (departmentEncontrado.isPresent()) {
            departmentRepository.delete(departmentEncontrado.get());
            return true;
        }
        // Si no existe, retorna false
        return false;
    }
}