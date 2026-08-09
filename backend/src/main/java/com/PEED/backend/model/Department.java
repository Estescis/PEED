package com.PEED.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "department")

public class Department {

        // ID (DEPARTMENT)
    @Id
    @Column(name = "id_department", nullable = false)
    private Long iddepartment;
    
    // NAME (DEPARTMENT)
    @Column(length = 100, nullable = false)
    private String name;
}