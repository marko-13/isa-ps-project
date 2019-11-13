package com.proj.medicalClinic.dto;

import com.proj.medicalClinic.model.AppUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.UUID;

public class AppUserDTO {

    private UUID id;
    private String email;

    public AppUserDTO() {

    }

    public AppUserDTO(AppUser appUser){
        this.id = appUser.getId();
        this.email = appUser.getEmail();
    }

    public AppUserDTO(UUID id, String email){
        this.id = id;
        this.email = email;
    }

    public UUID getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }
}
