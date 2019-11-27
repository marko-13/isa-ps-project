package com.proj.medicalClinic.repository;
import com.proj.medicalClinic.model.Nurse;
import com.proj.medicalClinic.model.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {

    List<Prescription> findAllByNurseAndApprovedIsTrue(Nurse nurse);

    List<Prescription> findAllByNurseAndApprovedIsFalse(Nurse nurse);

    /*@Query("select s from Prescription s where s.id = ?1")
    Prescription pronadjiPrescription(Long id);*/

}
