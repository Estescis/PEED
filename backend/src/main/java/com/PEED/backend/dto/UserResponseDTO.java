package com.PEED.backend.dto;

import com.PEED.backend.model.User;
import lombok.Data;

@Data

public class UserResponseDTO {

    private Long iduser;
    private String names;
    private String lastnames;
    private String identification;
    private String email;
    private String userType;

    // Constructor que recibe un User
    public UserResponseDTO(User user) {

        this.iduser = user.getIduser();
        this.names = user.getNames();
        this.lastnames = user.getLastnames();
        this.identification = user.getIdentification();
        this.email = user.getEmail();
        this.userType = user.getUserType().toString();
    }
}