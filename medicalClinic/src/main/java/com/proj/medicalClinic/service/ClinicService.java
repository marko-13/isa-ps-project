package com.proj.medicalClinic.service;

import com.proj.medicalClinic.dto.ClinicDTO;
import com.proj.medicalClinic.model.Clinic;

import java.util.List;

public interface ClinicService {

    List<ClinicDTO> getAllClinics ();

    ClinicDTO addNewClinic(ClinicDTO clinicDTO, String email);

    ClinicDTO getClinicByAdmin(Long adminId);

    ClinicDTO save(ClinicDTO clinic);

    List<ClinicDTO> getClinicsOfAdminClinicalCenter(String email);

    List<ClinicDTO> getAllAssociatedWithPatient(String patient_email);
}
