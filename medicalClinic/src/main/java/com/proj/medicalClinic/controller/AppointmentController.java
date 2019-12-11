package com.proj.medicalClinic.controller;

import com.proj.medicalClinic.dto.AppointmentDTO;
import com.proj.medicalClinic.dto.AppointmentHistoryDTO;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.model.Appointment;
import com.proj.medicalClinic.model.Operation;
import com.proj.medicalClinic.model.OperationRoom;
import com.proj.medicalClinic.repository.OperationRoomRepository;
import com.proj.medicalClinic.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/appointment")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private OperationRoomRepository operationRoomRepository;

    @RequestMapping(value = "/getAllByOperationRoom/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getAllByOperationRoom(@PathVariable Long id){
        try {
            List<AppointmentDTO> appointmentDTOS = appointmentService.getAllByOperationRoom(id);
            return new ResponseEntity<>(appointmentDTOS, HttpStatus.OK);
        }
        catch(NotExistsException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/getAllByPatient/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getAllByPatient(@PathVariable Long id){
        try {
            List<AppointmentHistoryDTO> appointmentDTOS = appointmentService.getAllByPatient(id);
            return new ResponseEntity<>(appointmentDTOS, HttpStatus.OK);
        }
        catch(NotExistsException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
