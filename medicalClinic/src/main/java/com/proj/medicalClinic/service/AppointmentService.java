package com.proj.medicalClinic.service;

import com.proj.medicalClinic.dto.AppointmentDTO;

import java.util.List;

public interface AppointmentService {

    List<AppointmentDTO> getAllByOperationRoom(Long id);
}
