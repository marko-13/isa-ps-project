package com.proj.medicalClinic.controller;

import com.proj.medicalClinic.dto.OperationRoomDTO;
import com.proj.medicalClinic.service.OperationRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/operationRoom", produces = MediaType.APPLICATION_JSON_VALUE)
public class OperationRoomController {

    @Autowired
    private OperationRoomService operationRoomService;

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public ResponseEntity<?> getAllOperationRooms(){
        List<OperationRoomDTO> operationRoomDTOS = operationRoomService.getAll();
        return new ResponseEntity<>(operationRoomDTOS, HttpStatus.OK);
    }
}
