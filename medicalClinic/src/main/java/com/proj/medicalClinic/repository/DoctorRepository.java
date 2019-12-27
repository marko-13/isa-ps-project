package com.proj.medicalClinic.repository;

import com.proj.medicalClinic.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    List<Doctor> findAll();
}

