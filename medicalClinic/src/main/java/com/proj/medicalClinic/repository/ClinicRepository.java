package com.proj.medicalClinic.repository;

import com.proj.medicalClinic.model.Clinic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClinicRepository extends JpaRepository<Clinic, Long> {

    List<Clinic> findAll();

    List<Clinic> findAllByNameAndAddress(String name, String address);
}
