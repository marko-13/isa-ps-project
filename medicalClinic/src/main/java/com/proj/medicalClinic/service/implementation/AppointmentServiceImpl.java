package com.proj.medicalClinic.service.implementation;

import com.proj.medicalClinic.dto.AppointmentDTO;
import com.proj.medicalClinic.dto.AppointmentHistoryDTO;
import com.proj.medicalClinic.dto.ClinicDTO;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.model.AdminClinic;
import com.proj.medicalClinic.model.Appointment;
import com.proj.medicalClinic.exception.NotValidParamsException;
import com.proj.medicalClinic.model.*;
import com.proj.medicalClinic.repository.AppUserRepository;
import com.proj.medicalClinic.repository.AppointmentRepository;
import com.proj.medicalClinic.repository.ExaminationRepository;
import com.proj.medicalClinic.repository.OperationRepository;
import com.proj.medicalClinic.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private ExaminationRepository examinationRepository;

    @Autowired
    private OperationRepository operationRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Override
    public List<AppointmentDTO> getAllByOperationRoom(Long id){
        List<Appointment> appointments = appointmentRepository.findAllByOperationRoomId(id)
                .orElse(null);

        List<AppointmentDTO> appointmentDTOS = new ArrayList<>();

        if(appointments != null){
            for(Appointment a : appointments){
                appointmentDTOS.add(new AppointmentDTO(a));
            }
        }

        return appointmentDTOS;
    }

    @Override
    public List<AppointmentHistoryDTO> getAllByPatient(Long id) {
        List<Appointment> appointments = appointmentRepository.findAllByPatientId(id)
                .orElseThrow(NotExistsException::new);

        List<AppointmentHistoryDTO> appointmentDTOS = new ArrayList<>();

        for(Appointment a : appointments){
            appointmentDTOS.add(new AppointmentHistoryDTO(a));
        }

        return appointmentDTOS;
    }

    @Override
    public List<AppointmentDTO> getAllAppointmentRequests() {

        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        String username = currentUser.getName();

        AdminClinic adminClinic = (AdminClinic) appUserRepository.findByEmail(username).orElseThrow(NotExistsException::new);

        Long clinicId = adminClinic.getClinic().getId();

        List<Appointment> appointments = appointmentRepository.findAllAppointmentRequests(clinicId).orElseThrow(NotExistsException::new);
        List<AppointmentDTO> appointmentDTOS = new ArrayList<>();
        for(Appointment a : appointments){
            appointmentDTOS.add(new AppointmentDTO(a));
        }

        return appointmentDTOS;

    @Override
    public List<AppointmentHistoryDTO> getAllAppointmentsByMedicalStaffMember(String email) {
        try {
            AppUser user = appUserRepository.findByEmail(email)
                    .orElseThrow(NotExistsException::new);

            if (!(user instanceof Doctor || user instanceof Nurse)) {
                throw new NotValidParamsException("Only medical staff members can see this data");
            }
            
            if (user instanceof Nurse) {
                List<Appointment> appointments = appointmentRepository.findAllByNurse(user.getId());

                List<AppointmentHistoryDTO> appointmentHistoryDTO = appointments.stream().map(
                        s -> new AppointmentHistoryDTO(s)
                ).collect(Collectors.toList());

                return appointmentHistoryDTO;
            } else {
                List<Examination> examinations = examinationRepository.findAllByDoctorsContaining((Doctor) user);

                List<AppointmentHistoryDTO> appointmentHistoryDTO = examinations.stream().map(
                        s -> new AppointmentHistoryDTO(s)
                ).collect(Collectors.toList());

                List<Operation> operations = operationRepository.findAllByDoctorsContaining((Doctor) user);

                List<AppointmentHistoryDTO> appointmentHistoryDTO1 = operations.stream().map(
                        s -> new AppointmentHistoryDTO(s)
                ).collect(Collectors.toList());

                appointmentHistoryDTO.addAll(appointmentHistoryDTO1);
                return appointmentHistoryDTO;
            }
        } catch (NotExistsException | NotValidParamsException e) {
            throw e;
        }
    }

}
