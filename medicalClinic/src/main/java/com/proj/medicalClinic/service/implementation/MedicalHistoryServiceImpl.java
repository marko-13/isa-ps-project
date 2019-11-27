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
        try {
            Patient patient = (Patient) userDetailsService.loadUserByUsername(email);
            if (patient == null) {
                throw new NotExistsException("Patient doesn't exists");
            }

            MedicalHistory medicalHistory = medicalHistoryRepository.findByPatient(patient);

            MedicalHistoryDTO medicalHistoryDTO = new MedicalHistoryDTO(medicalHistory);

            return medicalHistoryDTO;
        } catch(NotExistsException e) {
            throw e;
        } catch(Exception ex) {
            throw ex;
        }
    }
}
