package com.proj.medicalClinic.service.implementation;

import com.proj.medicalClinic.dto.AppointmentDTO;
import com.proj.medicalClinic.dto.AppointmentHistoryDTO;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.model.Appointment;
import com.proj.medicalClinic.repository.AppointmentRepository;
import com.proj.medicalClinic.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    public List<AppointmentDTO> getAllByOperationRoom(Long id){
        List<Appointment> appointments = appointmentRepository.findAllByOperationRoomId(id)
                .orElseThrow(NotExistsException::new);

        List<AppointmentDTO> appointmentDTOS = new ArrayList<>();

        for(Appointment a : appointments){
            appointmentDTOS.add(new AppointmentDTO(a));
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

}
