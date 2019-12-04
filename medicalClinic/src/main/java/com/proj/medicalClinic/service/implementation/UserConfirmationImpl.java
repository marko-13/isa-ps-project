package com.proj.medicalClinic.service.implementation;

import com.proj.medicalClinic.dto.AppUserDTO;
import com.proj.medicalClinic.dto.PatientDTO;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.exception.NotValidParamsException;
import com.proj.medicalClinic.model.AppUser;
import com.proj.medicalClinic.model.Patient;
import com.proj.medicalClinic.model.RoleType;
import com.proj.medicalClinic.repository.AppUserRepository;
import com.proj.medicalClinic.service.EmailService;
import com.proj.medicalClinic.service.UserConfirmation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserConfirmationImpl implements UserConfirmation {

    @Autowired
    private EmailService emailService;

    @Autowired
    private AppUserRepository appUserRepository;

    @Override
    public List<PatientDTO> getNotApprovedUsers() {
        try {
            List<AppUser> users = appUserRepository.findAllByEnabled(false);
            if (users == null) {
                throw new NotExistsException("All new users are approved");
            }

            List<PatientDTO> patientsDTO = new ArrayList<>();
            for (AppUser u : users) {
                patientsDTO.add(new PatientDTO((Patient) u));
            }

            return patientsDTO;
        } catch (NotExistsException e) {
            throw e;
        } catch (Exception ex) {
            throw ex;
        }
    }

    @Override
    public PatientDTO approvePatient(Long id) {
        try {
            Patient patient = (Patient) appUserRepository.findById(id).orElse(null);

            if (patient == null) {
                throw new NotExistsException("This patient's registration cannot be approved because they don't exist");
            }

            patient.setEnabled(true);
            Patient updated = this.appUserRepository.save(patient);

            try {
                this.emailService.sendNotificaitionAsync(updated, "\n\nYour account has been successfully activated.");
            }catch( Exception e ){
            }

            return new PatientDTO(updated);
        } catch (NotExistsException e) {
            throw e;
        } catch (Exception ex) {
            throw ex;
        }
    }

    @Override
    public boolean denyPatient(Long id, String msg) {
        try {
            AppUser appUser = this.appUserRepository.findById(id).orElse(null);
            if (appUser == null) {
                throw new NotExistsException("This patient doesn't exist");
            } else if (appUser.isEnabled()) {
                throw new NotValidParamsException("This patient is already enabled");
            } else if (appUser.getUserRole() != RoleType.PATIENT) {
                throw new NotValidParamsException("This user is not patient");
            } else if (appUser.isRejected()) {
                throw new NotValidParamsException("This patient has already been rejected");
            } else {
                appUser.setEnabled(false);
                appUser.setRejected(true);
                this.appUserRepository.save(appUser);
                try {
                    this.emailService.sendNotificaitionAsync(appUser, "\n\nYour account was denied access." + "\n\nReason:\n" + msg);
                }catch( Exception e ){
                }
                return true;
            }
        } catch (NotExistsException e) {
            throw e;
        } catch (Exception ex) {
            throw ex;
        }
    }
}
