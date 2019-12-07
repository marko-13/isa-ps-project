package com.proj.medicalClinic.service.implementation;

import com.proj.medicalClinic.dto.OperationRoomDTO;
import com.proj.medicalClinic.model.OperationRoom;
import com.proj.medicalClinic.repository.OperationRoomRepository;
import com.proj.medicalClinic.service.OperationRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OperationRoomServiceImpl implements OperationRoomService {

    @Autowired
    private OperationRoomRepository operationRoomRepository;

    @Override
    public List<OperationRoomDTO> getAll() {
        List<OperationRoom> operationRooms = operationRoomRepository.findAll();
        List<OperationRoomDTO> operationRoomsDTO = new ArrayList<>();

        for(OperationRoom or : operationRooms){
            operationRoomsDTO.add(new OperationRoomDTO(or));
        }

        return operationRoomsDTO;
    }
}
