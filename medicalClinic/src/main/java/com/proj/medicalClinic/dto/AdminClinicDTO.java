package com.proj.medicalClinic.dto;

import com.proj.medicalClinic.model.AdminClinic;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminClinicDTO {

    private String name;
    private String lastname;
    private String email;
    private String clinic;

    public AdminClinicDTO(AdminClinic ac){
        this.name = ac.getName();
        this.lastname = ac.getLastName();
        this.email = ac.getEmail();
        this.clinic = ac.getClinic().getName();
    }

}
