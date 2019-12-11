package com.proj.medicalClinic.controller;

import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.security.TokenUtils;
import com.proj.medicalClinic.service.AppUserService;
import com.proj.medicalClinic.service.MedicalHistoryService;
import com.proj.medicalClinic.service.implementation.CustomUserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/medicalHistory", produces = MediaType.APPLICATION_JSON_VALUE)
public class MedicalHistoryController {
    @Autowired
    TokenUtils tokenUtils;

    @Autowired
    HttpServletRequest httpServletRequest;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsServiceImpl userDetailsService;

    @Autowired
    private AppUserService userService;

    @Autowired
    private MedicalHistoryService medicalHistoryService;

    @RequestMapping(value = "/getMedicalHistory")
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<?> getMedicalHistory() {
        try {
            String email = this.tokenUtils.getUsernameFromToken(this.tokenUtils.getToken(this.httpServletRequest));
            return new ResponseEntity<>(this.medicalHistoryService.getMedicalHistory(email), HttpStatus.OK);
        }
        catch(NotExistsException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
