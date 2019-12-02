package com.proj.medicalClinic.repository;

import com.proj.medicalClinic.model.MedicalHistory;
import com.proj.medicalClinic.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicalHistoryRepository extends JpaRepository<MedicalHistory, Long> {

    MedicalHistory findByPatient(Patient patient);
}
