package com.proj.medicalClinic.repository;

import com.proj.medicalClinic.model.AppUser;
import com.proj.medicalClinic.model.Appointment;
import com.proj.medicalClinic.model.Clinic;
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
            value = "select * from appointment where clinic_id = ?1 and (fast = true or operation_room_id IS NULL);",
            nativeQuery = true)
    Optional<List<Appointment>> findAllAppointmentRequests(Long clinicId);

}
