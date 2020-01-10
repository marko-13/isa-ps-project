package com.proj.medicalClinic.service;

import com.proj.medicalClinic.dto.OperationRoomDTO;
import com.proj.medicalClinic.model.OperationRoom;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OperationRoomService {

    List<OperationRoomDTO> getAll();

    OperationRoomDTO remove(Long roomId);

}
