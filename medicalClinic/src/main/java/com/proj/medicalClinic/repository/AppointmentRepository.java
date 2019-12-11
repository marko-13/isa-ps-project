package com.proj.medicalClinic.repository;

import com.proj.medicalClinic.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findAllByOperationRoomId(Long id);
    List<Appointment> findAllByPatientId(Long id);

}
