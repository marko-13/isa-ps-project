package com.proj.medicalClinic.controller;

import com.proj.medicalClinic.dto.ClinicDTO;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.exception.NotValidParamsException;
import com.proj.medicalClinic.security.TokenUtils;
import com.proj.medicalClinic.service.ClinicService;
import com.proj.medicalClinic.service.UserConfirmation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/admin-clinic-center", produces = MediaType.APPLICATION_JSON_VALUE)
public class AdminClinicCenterController {
    @Autowired
    TokenUtils tokenUtils;

    @Autowired
    HttpServletRequest httpServletRequest;

    @Autowired
    private UserConfirmation userConfirmation;

    @Autowired
    private ClinicService clinicService;

    @RequestMapping(value = "/approve")
    @PreAuthorize("hasAuthority('ADMINCLINICALCENTER')")
    public ResponseEntity<?> getNotApprovedUsers() {
        return new ResponseEntity<>(this.userConfirmation.getNotApprovedUsers(), HttpStatus.OK);
    }

    @RequestMapping(value = "/approve/{id}")
    @PreAuthorize("hasAuthority('ADMINCLINICALCENTER')")
    public ResponseEntity<?> approvePatients(@PathVariable Long id) {
        try {
            return new ResponseEntity<>(this.userConfirmation.approvePatient(id), HttpStatus.OK);
        }
        catch(NotExistsException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/deny/{id}")
    @PreAuthorize("hasAuthority('ADMINCLINICALCENTER')")
    public ResponseEntity<?> denyPatients(@PathVariable Long id, @RequestBody String msg) {
        try {
            return new ResponseEntity<>(this.userConfirmation.denyPatient(id, msg), HttpStatus.OK);
        }
        catch(NotExistsException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/add-new-clinic")
    @PreAuthorize("hasAuthority('ADMINCLINICALCENTER')")
    public ResponseEntity<?> addNewClinics(@RequestBody ClinicDTO clinicDTO) {
        try {
            String email = this.tokenUtils.getUsernameFromToken(this.tokenUtils.getToken(this.httpServletRequest));
            return new ResponseEntity<>(this.clinicService.addNewClinic(clinicDTO, email), HttpStatus.OK);
        }
        catch(NotValidParamsException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
