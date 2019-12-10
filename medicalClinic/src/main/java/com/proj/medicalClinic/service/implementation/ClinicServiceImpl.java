package com.proj.medicalClinic.service.implementation;

import com.proj.medicalClinic.dto.ClinicDTO;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.exception.NotValidParamsException;
import com.proj.medicalClinic.model.AdminClinicalCenter;
import com.proj.medicalClinic.model.Clinic;
import com.proj.medicalClinic.repository.ClinicRepository;
import com.proj.medicalClinic.service.ClinicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClinicServiceImpl implements ClinicService {

    @Autowired
    ClinicRepository clinicRepository;

    @Autowired
    private CustomUserDetailsServiceImpl userDetailsService;

    @Autowired
    private AppUserRepository appUserRepository;


    @Override
    public List<ClinicDTO> getAllClinics() {

        List<Clinic> clinics = clinicRepository.findAll();
        List<ClinicDTO> clinicsDTO = new ArrayList<>();
        for(Clinic c : clinics){
            clinicsDTO.add(new ClinicDTO(c));
        }

        return clinicsDTO;

    }
}
