package com.proj.medicalClinic.controller;

import com.proj.medicalClinic.dto.ServiceDTO;
import com.proj.medicalClinic.service.ServiceService;
import com.proj.medicalClinic.service.implementation.ServiceServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/service", produces = MediaType.APPLICATION_JSON_VALUE)
public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    @RequestMapping("/getAll")
    @PreAuthorize("hasAuthority('ADMINCLINIC')")
    public ResponseEntity<?> getAllFromClinic(){
        List<ServiceDTO> serviceDTOS = serviceService.getAllFromClinic();
        return new ResponseEntity<>(serviceDTOS, HttpStatus.OK);
    }

}
