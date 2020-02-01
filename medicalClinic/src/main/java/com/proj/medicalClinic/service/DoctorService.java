package com.proj.medicalClinic.service;

import com.proj.medicalClinic.dto.AppointmentRequestDTO;
import com.proj.medicalClinic.dto.DoctorDTO;
import com.proj.medicalClinic.model.Doctor;

import java.util.List;

public interface DoctorService {

    List<DoctorDTO> getAll();
    DoctorDTO save(Doctor doctorRequest);
    DoctorDTO remove(Long id);
    List<DoctorDTO> getAllAvailableForDate(AppointmentRequestDTO appointmentRequestDTO);

}
