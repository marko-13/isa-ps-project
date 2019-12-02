package com.proj.medicalClinic.dto;

import com.proj.medicalClinic.model.AdminClinicalCenter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminClinicCenterDTO {

    private String name;
    private String lastname;
    private String email;
    private Long clinicalCenterId;

    public AdminClinicCenterDTO(AdminClinicalCenter acc){
        this.name = acc.getName();
        this.lastname = acc.getLastName();
        this.email = acc.getEmail();
        this.clinicalCenterId = acc.getClinicalCenter().getId();
    }

}
