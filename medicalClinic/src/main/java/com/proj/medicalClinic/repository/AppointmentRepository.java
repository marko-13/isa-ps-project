package com.proj.medicalClinic.repository;

import com.proj.medicalClinic.model.AppUser;
import com.proj.medicalClinic.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    Optional<List<Appointment>> findAllByOperationRoomId(Long id);
    Optional<List<Appointment>> findAllByPatientId(Long id);
    List<Appointment> findByServiceId(Long serviceId);

    @Query(
            value = "SELECT ap.type, ap.id, ap.date, ap.duration, ap.fast, ap.clinic_id, ap.operation_room_id, ap.patient_id, ap.service_id, ap.nurse_id FROM appointment as ap where ap.nurse_id = ?1",
            nativeQuery = true)
    List<Appointment> findAllByNurse(Long id);

}
