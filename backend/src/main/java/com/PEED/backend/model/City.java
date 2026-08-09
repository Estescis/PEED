package com.PEED.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "city")

public class City {

        // ID (CITY)
    @Id
    @Column(name = "id_city", nullable = false)
    private Long idcity;

    // NAME (CITY)
    @Column(length = 100, nullable = false)
    private String name;

    // STATUS (CITY)
    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean status = true; // Valor predeterminado: verdadero (activo) (1)

    // FK DEPARTMENT (CITY)
    @ManyToOne
    @JoinColumn(name = "id_department", nullable = false,
                foreignKey = @ForeignKey(name = "FK_CITY_DEPARTMENT", 
                                        foreignKeyDefinition = "FOREIGN KEY (id_department) REFERENCES department(id_department) ON UPDATE CASCADE ON DELETE RESTRICT")
    )
    private Department department;
}