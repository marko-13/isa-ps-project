package com.proj.medicalClinic.dto;


import com.proj.medicalClinic.model.Patient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientDTO {

    private String name;
    private String lastname;
    private String email;
    private String jmbg;
    private Long id;
    private boolean enabled;

    public PatientDTO(Patient p){
        id = p.getId();
        enabled = p.isEnabled();
        name = p.getName();
        lastname = p.getLastName();
        email = p.getEmail();
        jmbg = p.getJMBG();
    }

}
