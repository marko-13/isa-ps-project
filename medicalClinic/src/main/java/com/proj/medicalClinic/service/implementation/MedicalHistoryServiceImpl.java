package com.proj.medicalClinic.service.implementation;

import com.proj.medicalClinic.dto.MedicalHistoryDTO;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.model.MedicalHistory;
import com.proj.medicalClinic.model.Patient;
import com.proj.medicalClinic.repository.AppUserRepository;
import com.proj.medicalClinic.repository.MedicalHistoryRepository;
import com.proj.medicalClinic.service.MedicalHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MedicalHistoryServiceImpl implements MedicalHistoryService {

    @Autowired
    private MedicalHistoryRepository medicalHistoryRepository;

    @Autowired
    private CustomUserDetailsServiceImpl userDetailsService;

    @Autowired
    private AppUserRepository appUserRepository;

    @Override
    public MedicalHistoryDTO getMedicalHistory(String email) {

        Patient patient = (Patient) userDetailsService.loadUserByUsername(email);


        MedicalHistory medicalHistory = medicalHistoryRepository.findByPatient(patient)
                .orElseThrow(NotExistsException::new);

        MedicalHistoryDTO medicalHistoryDTO = new MedicalHistoryDTO(medicalHistory);

        return medicalHistoryDTO;

    }
}
