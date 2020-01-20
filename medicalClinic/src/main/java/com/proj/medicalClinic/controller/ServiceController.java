package com.proj.medicalClinic.controller;

import com.proj.medicalClinic.dto.ServiceDTO;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.exception.ResourceConflictException;
import com.proj.medicalClinic.model.Service;
import com.proj.medicalClinic.service.ServiceService;
import com.proj.medicalClinic.service.implementation.ServiceServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @PreAuthorize("hasAuthority('ADMINCLINIC')")
    public ResponseEntity<?> getAllFromClinic(@RequestBody ServiceDTO serviceRequest){
        try {

            ServiceDTO service = serviceService.save(serviceRequest);
            return new ResponseEntity<>(service, HttpStatus.OK);
        }catch (NotExistsException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

    }

    @RequestMapping(value = "/remove/{id}", method = RequestMethod.POST)
    @PreAuthorize("hasAuthority('ADMINCLINIC')")
    public ResponseEntity<?> remove(@PathVariable Long id){
        try {
            ServiceDTO serviceDTO = serviceService.remove(id);
            return new ResponseEntity<>(serviceDTO, HttpStatus.OK);
        }catch (NotExistsException e){
            return new ResponseEntity<>("Tip pregleda ne postoji.", HttpStatus.NOT_FOUND);
        }catch (ResourceConflictException e){
            return  new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    @PreAuthorize("hasAuthority('ADMINCLINIC')")
    public ResponseEntity<?> edit(@RequestBody ServiceDTO serviceReq){
        try {
            ServiceDTO serviceDTO = serviceService.edit(serviceReq);
            return new ResponseEntity<>(serviceDTO, HttpStatus.OK);
        }catch (NotExistsException e){
            return new ResponseEntity<>("Tip pregleda nije pronadjen!", HttpStatus.NOT_FOUND);
        }catch (ResourceConflictException e){
            return  new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

}
