package com.proj.medicalClinic.service;

import com.proj.medicalClinic.model.OperationRoom;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OperationRoomService {

    List<OperationRoom> getAll();
}
