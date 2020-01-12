package com.proj.medicalClinic.service.implementation;

import com.proj.medicalClinic.dto.ClinicDTO;
import com.proj.medicalClinic.dto.DrugsRegistryDTO;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.exception.NotValidParamsException;
import com.proj.medicalClinic.model.*;
import com.proj.medicalClinic.repository.AppUserRepository;
import com.proj.medicalClinic.repository.ClinicRepository;
import com.proj.medicalClinic.service.ClinicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClinicServiceImpl implements ClinicService {

    @Autowired
    private ClinicRepository clinicRepository;

    @Autowired
    private CustomUserDetailsServiceImpl userDetailsService;

    @Autowired
    private AppUserRepository appUserRepository;

    @Override
    public List<ClinicDTO> getAllClinics() {

        List<Clinic> clinics = clinicRepository.findAll();
        List<ClinicDTO> clinicsDTO = new ArrayList<>();
        for (Clinic c : clinics) {
            clinicsDTO.add(new ClinicDTO(c));
        }

        return clinicsDTO;

    }

    public List<ClinicDTO> getClinicsOfAdminClinicalCenter(String email) {
        try {
            AppUser user = appUserRepository.findByEmail(email)
                    .orElseThrow(NotExistsException::new);

            if (!(user instanceof AdminClinicalCenter)) {
                throw new NotValidParamsException("Only admin of the clinical center can see this data");
            }

            List<Clinic> clinics = clinicRepository.findAllByClinicalCenter(((AdminClinicalCenter) user).getClinicalCenter());

            List<ClinicDTO> clinicsDTO = clinics.stream().map(
                    s -> new ClinicDTO(s)
            ).collect(Collectors.toList());

            return clinicsDTO;

        } catch (NotExistsException | NotValidParamsException e) {
            throw e;
        }

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
            if (!(uniqueClinic.isEmpty())) {
                throw new NotValidParamsException("Already exists");
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

    @Override
    public ClinicDTO getClinicByAdmin(Long adminId) {
        Clinic clinic = clinicRepository.findByDoctorId(adminId).orElseThrow(NotExistsException::new);
        return new ClinicDTO(clinic);
    }

    @Override
    public ClinicDTO save(ClinicDTO clinicRequest){
        Clinic clinic = clinicRepository.findById(clinicRequest.getId()).orElseThrow(NotExistsException::new);
        clinic.setName(clinicRequest.getName());
        clinic.setAddress(clinicRequest.getAddress());
        clinic.setDescription(clinicRequest.getDescription());

        clinicRepository.save(clinic);

        return new ClinicDTO(clinic);
    }
}
