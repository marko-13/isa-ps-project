package com.proj.medicalClinic.repository;

import com.proj.medicalClinic.model.Doctor;
import com.proj.medicalClinic.model.Examination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    List<Doctor> findAllByDeletedNot(boolean deleted);
    
    @Query(
            value = "SELECT * FROM app_user d WHERE d.id = ?1",
            nativeQuery = true)
    Optional<Doctor> findById(Long id);
}

