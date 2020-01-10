package com.proj.medicalClinic.service.implementation;

import com.proj.medicalClinic.dto.AppointmentDTO;
import com.proj.medicalClinic.dto.OperationRoomDTO;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.exception.ResourceConflictException;
import com.proj.medicalClinic.model.Appointment;
import com.proj.medicalClinic.model.Operation;
import com.proj.medicalClinic.model.OperationRoom;
import com.proj.medicalClinic.repository.OperationRoomRepository;
import com.proj.medicalClinic.service.AppointmentService;
import com.proj.medicalClinic.service.OperationRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OperationRoomServiceImpl implements OperationRoomService {

    @Autowired
    private OperationRoomRepository operationRoomRepository;

    @Autowired
    private AppointmentService appointmentService;

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
}
