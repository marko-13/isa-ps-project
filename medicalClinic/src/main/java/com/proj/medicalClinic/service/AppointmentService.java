package com.proj.medicalClinic.service;

import com.proj.medicalClinic.dto.AppointmentDTO;
import com.proj.medicalClinic.dto.AppointmentHistoryDTO;
import com.proj.medicalClinic.model.Appointment;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface AppointmentService {

    List<AppointmentDTO> getAllByOperationRoom(Long id);
    List<AppointmentHistoryDTO> getAllByPatient(Long id);
    List<AppointmentDTO> getAllAppointmentRequests();
    List<AppointmentHistoryDTO> getAllAppointmentsByMedicalStaffMember(String email);
    List<Appointment> getAllDayBeforeAndDayAfter(Date before, Date after);
    AppointmentDTO addRoom(Long appointmentId, Long roomId);
}
