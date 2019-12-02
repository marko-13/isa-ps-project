package com.proj.medicalClinic.dto;

import com.proj.medicalClinic.model.Doctor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDTO {

    private String name;
    private String lastname;
    private String email;
    private double review;
    private int shift;

    public DoctorDTO(Doctor d){
        this.name = d.getName();
        this.lastname = d.getLastName();
        this.email = d.getEmail();
        this.review = d.getReview();
        this.shift = d.getShift();
    }

}