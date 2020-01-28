package com.proj.medicalClinic.service.implementation;

import com.proj.medicalClinic.dto.PatientDTO;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.model.Patient;
import com.proj.medicalClinic.repository.PatientRepository;
import com.proj.medicalClinic.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;


    @Override
    public List<PatientDTO> getAll() {
        List<Patient> patients = patientRepository.findAll();
        if(patients.isEmpty()){
            throw new NotExistsException();
        }

        List<PatientDTO> patientDTOS = new ArrayList<>();

        for(Patient p : patients){
            patientDTOS.add(new PatientDTO(p));
        }

        return patientDTOS;
    }
}
