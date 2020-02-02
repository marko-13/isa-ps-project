package com.proj.medicalClinic.repository;

import com.proj.medicalClinic.model.Examination;
import com.proj.medicalClinic.model.MedicalHistory;
import com.proj.medicalClinic.model.MedicalReport;
import com.proj.medicalClinic.model.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MedicalReportRepository extends JpaRepository<MedicalReport, Long> {

    List<MedicalReport> findAllByExamination(Examination examination);
    List<MedicalReport> findAllByPrescription(Prescription prescription);
    List<MedicalReport> findAllByMedicalHistory(MedicalHistory medicalHistory);

}
