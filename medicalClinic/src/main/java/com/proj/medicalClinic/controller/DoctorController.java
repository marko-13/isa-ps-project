package com.proj.medicalClinic.controller;

import com.proj.medicalClinic.dto.DoctorDTO;
import com.proj.medicalClinic.service.DoctorService;
import com.proj.medicalClinic.service.implementation.DoctorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/doctor")
public class DoctorController {

    @Autowired
    private DoctorServiceImpl doctorService;

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public ResponseEntity<?> getAllDoctors() {
        List<DoctorDTO> doctorDTOS = doctorService.getAll();
        return new ResponseEntity<>(doctorDTOS, HttpStatus.OK);
    }
}
