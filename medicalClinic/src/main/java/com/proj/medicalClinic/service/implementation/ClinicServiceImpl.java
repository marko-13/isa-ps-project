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

    @Override
    public ClinicDTO addNewClinic(ClinicDTO clinicDTO, String email) {
        try {
            if (clinicDTO == null) {
                throw new NotValidParamsException("Server has not recieved right clinicDTO");
            }

            AdminClinicalCenter adminCC = (AdminClinicalCenter) this.userDetailsService.loadUserByUsername(email);

            if (adminCC == null) {
                throw new NotValidParamsException("Server has not recieved right email of Administrator of the clinical center");
            }

            List<Clinic> uniqueClinic = this.clinicRepository.findAllByNameAndAddress(clinicDTO.getName(), clinicDTO.getAddress());

            if (!uniqueClinic.isEmpty()) {
                throw new NotExistsException("Registration of this clinic cannot be done because it already exists");
            }

            Clinic newClinic = new Clinic();

            newClinic.setName(clinicDTO.getName());
            newClinic.setAddress(clinicDTO.getAddress());
            newClinic.setDescription(clinicDTO.getDescription());
            newClinic.setReview(0);
            newClinic.setReviewCount(0);
            newClinic.setClinicalCenter(adminCC.getClinicalCenter());

            clinicRepository.save(newClinic);

            ClinicDTO newClinicDTO = new ClinicDTO(newClinic);

            return newClinicDTO;
        } catch (Exception e) {
            throw e;
        }
    }
}
