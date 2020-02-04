package com.proj.medicalClinic.controller;

import com.proj.medicalClinic.dto.*;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.exception.ResourceConflictException;
import com.proj.medicalClinic.model.Appointment;
import com.proj.medicalClinic.model.Operation;
import com.proj.medicalClinic.model.OperationRoom;
import com.proj.medicalClinic.repository.OperationRoomRepository;
import com.proj.medicalClinic.service.AppointmentService;
import org.aspectj.weaver.ast.Not;
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

    @RequestMapping(value = "/getAllAppointmentRequests", method = RequestMethod.GET)
    public ResponseEntity<?> getAllByPatient(){
        try {
            List<AppointmentDTO> appointmentDTOS = appointmentService.getAllAppointmentRequests();
            return new ResponseEntity<>(appointmentDTOS, HttpStatus.OK);
        }
        catch(NotExistsException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/addRoomToAppointment/{appointmentId}/{roomId}", method = RequestMethod.POST)
    public ResponseEntity<?> addRoomToAppointment(@PathVariable Long appointmentId, @PathVariable Long roomId){
        try{
            AppointmentDTO appointmentDTO = appointmentService.addRoom(appointmentId, roomId);
            return new ResponseEntity<>(appointmentDTO, HttpStatus.OK);
        }catch (NotExistsException e){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }catch (ResourceConflictException e){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/changeDateAndAddRoomToApointment", method = RequestMethod.POST)
    public ResponseEntity<?> changeDateAndAddRoomToApointment(@RequestBody AppointmentRequestDTO appDto){
        try{
            AppointmentDTO appointmentDTO = appointmentService.changeDateAndAddRoom(appDto);
            return new ResponseEntity<>(appointmentDTO, HttpStatus.OK);
        }catch (NotExistsException e){
            return new ResponseEntity<>("Nije nasao sobu", HttpStatus.NOT_FOUND);
        }catch (ResourceConflictException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/changeDoctorAndAddRoomToAppointment", method = RequestMethod.POST)
    public ResponseEntity<?> changeDoctorAndAddRoomToAppointment(@RequestBody ChangeDoctorRequestDTO changeDoctorRequestDTO){
        try {
            AppointmentDTO appointmentDTO = appointmentService.changeDoctorAndAddRoom(changeDoctorRequestDTO);
            return new ResponseEntity<>(appointmentDTO, HttpStatus.OK);
        }catch (NotExistsException e){
            return new ResponseEntity<>("NOT FOUND", HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/getAllHeldAndBetweenDates", method = RequestMethod.POST)
    public ResponseEntity<?> getAllHeldAndBetweenDates(@RequestBody ClinicReviewRequestDTO clinicReviewRequestDTO){
        System.out.println(clinicReviewRequestDTO.getStartDate());
        try {
            List<AppointmentDTO>  appointmentDTOS = appointmentService.getAllHeldBetweenNowAndEnd(clinicReviewRequestDTO);
            return new ResponseEntity<>(appointmentDTOS, HttpStatus.OK);
        }catch (NotExistsException e){
            return new ResponseEntity<>("NOT FOUND", HttpStatus.NOT_FOUND);
        }
    }

}
