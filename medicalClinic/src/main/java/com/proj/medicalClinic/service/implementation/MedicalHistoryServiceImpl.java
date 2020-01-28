package com.proj.medicalClinic.service.implementation;

import com.proj.medicalClinic.dto.AppointmentDTO;
import com.proj.medicalClinic.dto.DiagnosisRegistryDTO;
import com.proj.medicalClinic.dto.MedicalHistoryDTO;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.model.*;
import com.proj.medicalClinic.repository.AppUserRepository;
import com.proj.medicalClinic.repository.MedicalHistoryRepository;
import com.proj.medicalClinic.repository.MedicalReportRepository;
import com.proj.medicalClinic.service.MedicalHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MedicalHistoryServiceImpl implements MedicalHistoryService {

    @Autowired
    private MedicalHistoryRepository medicalHistoryRepository;

    @Autowired
    private CustomUserDetailsServiceImpl userDetailsService;

    @Autowired
    private MedicalReportRepository medicalReportRepository;

    @Override
    public MedicalHistoryDTO getMedicalHistory(String email) {

        Patient patient = (Patient) userDetailsService.loadUserByUsername(email);


        MedicalHistory medicalHistory = medicalHistoryRepository.findByPatient(patient)
                .orElseThrow(NotExistsException::new);

        MedicalHistoryDTO medicalHistoryDTO = new MedicalHistoryDTO(medicalHistory);

        return medicalHistoryDTO;

    }

    @Override
    public MedicalHistoryDTO getMedicalHistoryByPatientId(Long patientId) {

        //PROVERA DA LI DOKTOR/SESTRA MOZE DA PRISTUPI KARTONU

        MedicalHistory medicalHistory = medicalHistoryRepository.findByPatientId(patientId).orElseThrow(NotExistsException::new);
        List<MedicalReport> medicalReports = medicalReportRepository.findAllByMedicalHistory(medicalHistory);
        MedicalHistoryDTO medicalHistoryDTO = new MedicalHistoryDTO(medicalHistory);

        List<AppointmentDTO> appointmentDTOS = new ArrayList<>();
        List<DiagnosisRegistryDTO> diagnosisRegistryDTOS = new ArrayList<>();

        if(medicalReports.isEmpty()){
            return medicalHistoryDTO;
        }else{
            for(MedicalReport mr : medicalReports){
                medicalHistoryDTO.getAppointments().add(new AppointmentDTO(mr.getExamination()));
                for(DiagnosisRegistry dr : mr.getDiagnosisRegistry()){
                    medicalHistoryDTO.getDiagnosis().add(new DiagnosisRegistryDTO(dr));
                }
            }
        }

        return medicalHistoryDTO;
    }
}
