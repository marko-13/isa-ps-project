package com.proj.medicalClinic.controller;

import com.proj.medicalClinic.dto.AppUserDTO;
import com.proj.medicalClinic.dto.AppointmentHistoryDTO;
import com.proj.medicalClinic.dto.PatientDTO;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.security.TokenUtils;
import com.proj.medicalClinic.service.AppointmentService;
import com.proj.medicalClinic.service.MedicalStaffService;
import com.proj.medicalClinic.service.PatientService;
import com.proj.medicalClinic.service.UserConfirmation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/patient", produces = MediaType.APPLICATION_JSON_VALUE)
public class PatientController {

    @Autowired
    TokenUtils tokenUtils;

    @Autowired
    HttpServletRequest httpServletRequest;

    @Autowired
    private UserConfirmation userConfirmation;

    @Autowired
    private MedicalStaffService medicalStaffService;

    @Autowired
    private PatientService patientService;

    @RequestMapping(value = "/getMedicalStaffByPatient/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getAllByPatient(@PathVariable Long id){
        try {
            List<AppUserDTO> medicalStaffDTOS = medicalStaffService.getAllStaffByPatientId(id);
            return new ResponseEntity<>(medicalStaffDTOS, HttpStatus.OK);
        }
        catch(NotExistsException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public ResponseEntity<?> getAll(){
        try {
            List<PatientDTO> patientDTOS = patientService.getAll();
            return new ResponseEntity<>(patientDTOS, HttpStatus.OK);
        }catch (NotExistsException e){
            return new ResponseEntity<>("Patients not found.", HttpStatus.NOT_FOUND);
        }
    }
}
