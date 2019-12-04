package com.proj.medicalClinic.service;

import com.proj.medicalClinic.dto.PatientDTO;

import java.util.List;

public interface UserConfirmation {

    List<PatientDTO> getNotApprovedUsers();

    PatientDTO approvePatient(Long id);

    boolean denyPatient(Long id, String msg);
}
