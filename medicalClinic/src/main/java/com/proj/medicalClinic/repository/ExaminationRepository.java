package com.proj.medicalClinic.repository;
import com.proj.medicalClinic.model.Doctor;
import com.proj.medicalClinic.model.Examination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExaminationRepository extends JpaRepository<Examination, Long> {
    List<Examination> findAllByDoctorsContaining(Doctor doctor);
    Optional<Examination> findById(Long id);
}
