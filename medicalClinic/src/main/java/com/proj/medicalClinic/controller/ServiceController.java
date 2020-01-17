package com.proj.medicalClinic.controller;

import com.proj.medicalClinic.dto.ServiceDTO;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.exception.ResourceConflictException;
import com.proj.medicalClinic.service.ServiceService;
import com.proj.medicalClinic.service.implementation.ServiceServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/service", produces = MediaType.APPLICATION_JSON_VALUE)
public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    @PreAuthorize("hasAuthority('ADMINCLINIC')")
    public ResponseEntity<?> getAllFromClinic(){
        try {
            List<ServiceDTO> serviceDTOS = serviceService.getAllFromClinic();
            return new ResponseEntity<>(serviceDTOS, HttpStatus.OK);
        }catch (NotExistsException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

    }

}
