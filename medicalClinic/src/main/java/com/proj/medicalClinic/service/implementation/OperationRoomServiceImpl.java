package com.proj.medicalClinic.service.implementation;

import com.proj.medicalClinic.dto.AppointmentDTO;
import com.proj.medicalClinic.dto.OperationRoomDTO;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.exception.ResourceConflictException;
import com.proj.medicalClinic.model.*;
import com.proj.medicalClinic.repository.ClinicRepository;
import com.proj.medicalClinic.repository.OperationRoomRepository;
import com.proj.medicalClinic.security.TokenUtils;
import com.proj.medicalClinic.service.AppointmentService;
import com.proj.medicalClinic.service.ClinicService;
import com.proj.medicalClinic.service.OperationRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.print.Doc;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Service
public class OperationRoomServiceImpl implements OperationRoomService {

    @Autowired
    private OperationRoomRepository operationRoomRepository;

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private CustomUserDetailsServiceImpl customUserDetailsService;

    @Autowired
    TokenUtils tokenUtils;

    @Autowired
    HttpServletRequest httpServletRequest;

    @Autowired
    ClinicRepository clinicRepository;

    @Override
    public List<OperationRoomDTO> getAll() {
        List<OperationRoom> operationRooms = operationRoomRepository.findAllByDeletedNot(true);
        List<OperationRoomDTO> operationRoomsDTO = new ArrayList<>();

        for(OperationRoom or : operationRooms){
            operationRoomsDTO.add(new OperationRoomDTO(or));
        }

        return operationRoomsDTO;
    }

    @Override
    public OperationRoomDTO remove(Long roomId) {
        try {
            List<AppointmentDTO> appointmentDTOS = appointmentService.getAllByOperationRoom(roomId);
        }catch (NotExistsException e){
            OperationRoom operationRoom = operationRoomRepository.findById(roomId).orElseThrow(NotExistsException::new);
            System.out.println(operationRoom.getName());
            operationRoom.setDeleted(true);
            operationRoomRepository.save(operationRoom);
            return new OperationRoomDTO(operationRoom);
        }
        throw new ResourceConflictException(roomId, "Soba ima rezervisane preglede!");

    }

    @Override
    public OperationRoomDTO save(OperationRoomDTO operationRoomRequest) {

        String email = this.tokenUtils.getUsernameFromToken(this.tokenUtils.getToken(this.httpServletRequest));
        AdminClinic appUser = (AdminClinic) customUserDetailsService.loadUserByUsername(email);
        Clinic clinic = clinicRepository.findById(appUser.getClinic().getId()).orElseThrow(NotExistsException::new);

        OperationRoom operationRoom = new OperationRoom();
        operationRoom.setName(operationRoomRequest.getName());
        operationRoom.setNumber(operationRoomRequest.getNumber());
        operationRoom.setClinic(clinic);
        operationRoom.setDeleted(false);

        operationRoomRepository.save(operationRoom);
        return new OperationRoomDTO(operationRoom);
    }

    @Override
    public OperationRoomDTO update(OperationRoomDTO operationRoomRequest) {
        OperationRoom operationRoom = operationRoomRepository.findById(operationRoomRequest.getRoomId()).orElseThrow(NotExistsException::new);
        try {
            List<AppointmentDTO> appointmentDTOS = appointmentService.getAllByOperationRoom(operationRoomRequest.getRoomId());
        }catch (NotExistsException e){
            operationRoom.setNumber(operationRoomRequest.getNumber());
            operationRoom.setName(operationRoomRequest.getName());
            operationRoomRepository.save(operationRoom);
            return new OperationRoomDTO(operationRoom);
        }

        throw new ResourceConflictException(operationRoomRequest.getRoomId(), "Soba ima rezervisane preglede!");
    }
}
