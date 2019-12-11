package com.proj.medicalClinic.repository;

import com.proj.medicalClinic.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    Optional<List<Appointment>> findAllByOperationRoomId(Long id);
    Optional<List<Appointment>> findAllByPatientId(Long id);

}
