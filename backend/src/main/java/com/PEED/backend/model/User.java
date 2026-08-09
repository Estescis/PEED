package com.PEED.backend.model;

// Importaciones de los enums
import com.PEED.backend.model.enums.Gender;
import com.PEED.backend.model.enums.TypeIdentification;
import com.PEED.backend.model.enums.UserType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users")
public class User {

    // ID (USER)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private Long iduser;

    // NAMES (USER)
    @Column (length = 50, nullable = false)
    private String names;
    
    // LAST NAMES (USER)
    @Column (length = 50, nullable = false)
    private String lastnames;

    // GENDER (USER)
    @Enumerated(EnumType.STRING)
    @Column(length = 10, nullable = false)
    private Gender gender;
    
    // TYPE IDENTIFICATION (USER)
    @Enumerated(EnumType.STRING) // Esto sirve para guardar enums como texto.
    @Column (name ="type_identification", length = 10, nullable = false) // Nombre el archivo que contiene los datos
    private TypeIdentification typeIdentification;
    
    // IDENTIFICATION (USER)
    @Column(length = 20, nullable = false, unique = true) // Unique de la regla para que no se repita
    private String identification;
    
    // BIRTHDATE (USER)
    @Column(nullable = false)
    private LocalDate birthdate;
    
    // PHONE (USER)
    @Column(length = 20, nullable = false)
    private String phone;

    // EMAIL (USER)
    @Column(length = 100, nullable = false, unique = true)
    private String email;
    
    // PASSWORD (USER)
    @Column(length = 255, nullable = false)
    private String password;
    
    // USER TYPE (USER)
    @Enumerated(EnumType.STRING)
    @Column(name = "user_type", length = 20, nullable = false)
    private UserType userType;

    // STATUS (USER)
    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean status = true;
    
    // CREATED AT (USER)
    @CreationTimestamp
    @Column(name = "created_at", updatable = false) // updatable = false ("Después de crearse, no se puede modificar")
    private LocalDateTime createdAt; // En MySQL es TIMESTAMP

    // FK CITY (USER)
    @ManyToOne
    @JoinColumn(name = "id_city", nullable = false,
        foreignKey = @ForeignKey(name = "FK_USER_CITY", 
                                        foreignKeyDefinition = "FOREIGN KEY (id_city) REFERENCES city(id_city) ON UPDATE CASCADE ON DELETE RESTRICT")
    )
    private City city;
}