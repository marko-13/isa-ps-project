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
    private String address;
    private String city;
    private String state;
    private String mobile;

    public AdminClinicCenterDTO(AdminClinicalCenter acc){
        this.name = acc.getName();
        this.lastname = acc.getLastName();
        this.email = acc.getEmail();
        this.clinicalCenterId = acc.getClinicalCenter().getId();
        this.address = acc.getAdress();
        this.city = acc.getCity();
        this.state = acc.getState();
        this.mobile = acc.getMobile();
    }

}
