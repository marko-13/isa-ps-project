package com.proj.medicalClinic.dto;

import com.proj.medicalClinic.model.MedicalHistory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

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
    private List<AppointmentDTO> appointments = new ArrayList<>();

    public MedicalHistoryDTO(MedicalHistory medicalHistory){
        this.id = medicalHistory.getId();
        this.height = medicalHistory.getHeight();
        this.weight = medicalHistory.getWeight();
        this.dioptre = medicalHistory.getDioptre();
        this.allergies = medicalHistory.getAllergy();
    }

    public List<AppointmentDTO> getAppointments() {
        return appointments;
    }

    public List<DiagnosisRegistryDTO> getDiagnosis() {
        return diagnosis;
    }

    public void setAppointments(List<AppointmentDTO> appointments) {
        this.appointments = appointments;
    }

    public void setDiagnosis(List<DiagnosisRegistryDTO> diagnosis) {
        this.diagnosis = diagnosis;
    }
}
