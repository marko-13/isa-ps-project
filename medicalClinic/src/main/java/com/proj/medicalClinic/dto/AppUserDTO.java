package com.proj.medicalClinic.dto;

import com.proj.medicalClinic.model.AppUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppUserDTO {

    private UUID id;
    private String email;

    public AppUserDTO(AppUser appUser){
        this.id = appUser.getId();
        this.email = appUser.getEmail();
    }
}
