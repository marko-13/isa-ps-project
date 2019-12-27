package com.proj.medicalClinic.service.implementation;

import com.proj.medicalClinic.dto.DoctorDTO;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.model.Doctor;
import com.proj.medicalClinic.repository.DoctorRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DoctorServiceImpl {

    @Autowired
    private DoctorRepository doctorRepository;

    public List<DoctorDTO> getAll(){
        List<Doctor> doctors = doctorRepository.findAll();
        if(doctors == null){
            throw new NotExistsException();
        }

        List<DoctorDTO> doctorDTOS = new ArrayList<>();
        for(Doctor d : doctors){
            doctorDTOS.add(new DoctorDTO(d));
        }

        return doctorDTOS;
    }

}
