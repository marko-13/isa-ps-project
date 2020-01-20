package com.proj.medicalClinic.repository;

import com.proj.medicalClinic.dto.ServiceDTO;
import com.proj.medicalClinic.model.Doctor;
import com.proj.medicalClinic.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ServiceRepository extends JpaRepository<Service, Long> {

    @Query(
            value = "SELECT s.id, s.price, s.service_type, cs.clinic_id, s.deleted FROM service as s, clinics_services as cs where s.id = cs.service_id and cs.clinic_id = ?1",
            nativeQuery = true)
    List<Service> findAllByClinic(Long id);


}
