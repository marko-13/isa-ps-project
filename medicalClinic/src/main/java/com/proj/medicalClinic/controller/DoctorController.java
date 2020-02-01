package com.proj.medicalClinic.controller;

import com.proj.medicalClinic.dto.AdminClinicDTO;
import com.proj.medicalClinic.dto.DoctorDTO;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.exception.NotValidParamsException;
import com.proj.medicalClinic.exception.ResourceConflictException;
import com.proj.medicalClinic.model.Doctor;
import com.proj.medicalClinic.security.TokenUtils;
import com.proj.medicalClinic.service.AppointmentService;
import com.proj.medicalClinic.service.DoctorService;
import com.proj.medicalClinic.service.implementation.DoctorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping(value = "/doctor")
public class DoctorController {

    @Autowired
    private DoctorServiceImpl doctorService;

    @Autowired
    TokenUtils tokenUtils;

    @Autowired
    HttpServletRequest httpServletRequest;

    @Autowired
    AppointmentService appointmentService;

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public ResponseEntity<?> getAllDoctors() {
        List<DoctorDTO> doctorDTOS = doctorService.getAll();
        return new ResponseEntity<>(doctorDTOS, HttpStatus.OK);
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<?> saveDoctor(@RequestBody Doctor doctor) {
        DoctorDTO doctorDTO = doctorService.save(doctor);
        return new ResponseEntity<>(doctorDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/remove/{id}", method = RequestMethod.POST)
    public ResponseEntity<?> removeDoctor(@PathVariable Long id){
        try{
            DoctorDTO doctorDTO = doctorService.remove(id);
            return new ResponseEntity<>(doctorDTO, HttpStatus.OK);
        }catch (NotExistsException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }catch (ResourceConflictException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    // Post za vrsenje ocenjivanja doktora
    @RequestMapping(value = "/reviewed/{id}/{score}", method = RequestMethod.POST)
    public ResponseEntity<?> recieve_review(@PathVariable Long id,@PathVariable int score){
        try{
            doctorService.review_doctor(id, score);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        }catch(NotExistsException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
