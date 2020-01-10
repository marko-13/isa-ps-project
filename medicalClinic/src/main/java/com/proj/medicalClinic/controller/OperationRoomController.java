package com.proj.medicalClinic.controller;

import com.proj.medicalClinic.dto.OperationRoomDTO;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.exception.ResourceConflictException;
import com.proj.medicalClinic.model.OperationRoom;
import com.proj.medicalClinic.service.OperationRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/operationRoom", produces = MediaType.APPLICATION_JSON_VALUE)
public class OperationRoomController {

    @Autowired
    private OperationRoomService operationRoomService;

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public ResponseEntity<?> getAllOperationRooms(){
        try {
            List<OperationRoomDTO> operationRoomDTOS = operationRoomService.getAll();
            return new ResponseEntity<>(operationRoomDTOS, HttpStatus.OK);
        }
        catch(NotExistsException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    public ResponseEntity<?> deleteRoom(@PathVariable Long id){
        try {
            OperationRoomDTO operationRoomDTO = operationRoomService.remove(id);
            return new ResponseEntity<>(operationRoomDTO, HttpStatus.OK);
        }catch (ResourceConflictException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
}
