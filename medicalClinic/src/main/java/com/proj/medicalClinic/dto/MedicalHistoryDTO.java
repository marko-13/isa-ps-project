package com.proj.medicalClinic.dto;

import com.proj.medicalClinic.model.MedicalHistory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicalHistoryDTO {

    private Long id;
    private double height;
    private double weight;
    private double dioptre;
    private String allergies;

    public MedicalHistoryDTO(MedicalHistory medicalHistory){
        this.id = medicalHistory.getId();
        this.height = medicalHistory.getHeight();
        this.weight = medicalHistory.getWeight();
        this.dioptre = medicalHistory.getDioptre();
        this.allergies = medicalHistory.getAllergy();
    }
}
