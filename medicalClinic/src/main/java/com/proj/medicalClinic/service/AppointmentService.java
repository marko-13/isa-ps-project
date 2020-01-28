package com.proj.medicalClinic.service;

import com.proj.medicalClinic.dto.AppointmentDTO;
import com.proj.medicalClinic.dto.AppointmentHistoryDTO;

import java.util.List;

public interface AppointmentService {

    List<AppointmentDTO> getAllByOperationRoom(Long id);
    List<AppointmentHistoryDTO> getAllByPatient(Long id);
    List<AppointmentDTO> getAllAppointmentRequests();
}
