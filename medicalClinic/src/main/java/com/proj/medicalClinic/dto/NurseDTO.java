package com.proj.medicalClinic.dto;

import com.proj.medicalClinic.model.Nurse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NurseDTO {

    private String name;
    private String lastname;
    private String email;
    private int shift;

    public NurseDTO (Nurse n){
        this.name = n.getName();
        this.lastname = n.getLastName();
        this.email = n.getEmail();
        this.shift = n.getShift();
    }

}
