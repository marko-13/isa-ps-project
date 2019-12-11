package com.proj.medicalClinic.service;

import com.proj.medicalClinic.dto.OperationRoomDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OperationRoomService {

    List<OperationRoomDTO> getAll();
}
