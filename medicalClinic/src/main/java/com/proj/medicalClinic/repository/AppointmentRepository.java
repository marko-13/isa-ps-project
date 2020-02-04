package com.proj.medicalClinic.repository;

import com.proj.medicalClinic.model.AppUser;
import com.proj.medicalClinic.model.Appointment;
import com.proj.medicalClinic.model.Clinic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    Optional<List<Appointment>> findAllByOperationRoomId(Long id);
    Optional<List<Appointment>> findAllByPatientId(Long id);
    List<Appointment> findByServiceId(Long serviceId);
    List<Appointment> findAllByDateBetweenAndOperationRoomIsNotNull(Date start, Date end);
    List<Appointment> findAllByOperationRoomIsNull();

    @Query(
            value = "select * from appointment where clinic_id = ?1 and operation_room_id IS NULL;",
            nativeQuery = true)
    Optional<List<Appointment>> findAllAppointmentRequests(Long clinicId);
  
    @Query(
            value = "SELECT ap.type, ap.id, ap.date, ap.duration, ap.fast, ap.clinic_id, ap.operation_room_id, ap.patient_id, ap.service_id, ap.nurse_id, ap.held FROM appointment as ap where ap.nurse_id = ?1",
            nativeQuery = true)
    List<Appointment> findAllByNurse(Long id);

    @Query(
            value = "SELECT ap.type, ap.held, ap.id, ap.date, ap.duration, ap.fast, ap.clinic_id, ap.operation_room_id, ap.patient_id, ap.service_id, ap.nurse_id FROM appointment as ap where ap.id = ?1",
            nativeQuery = true)
    Optional<Appointment> findById(Long id);

    @Modifying(clearAutomatically = true)
    @Query(
            value = "UPDATE appointment SET operation_room_id = ?1 WHERE appointment.id = ?2",
            nativeQuery = true
    )
    void saveNative(long roomId, long appointmentId);


}
