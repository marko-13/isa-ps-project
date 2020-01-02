package com.proj.medicalClinic.service;

import com.proj.medicalClinic.dto.DoctorDTO;

import java.util.List;

public interface DoctorService {

    List<DoctorDTO> getAll();
    DoctorDTO save();

}
