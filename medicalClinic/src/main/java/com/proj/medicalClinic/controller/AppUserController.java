package com.proj.medicalClinic.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.proj.medicalClinic.dto.*;
import com.proj.medicalClinic.model.*;
import com.proj.medicalClinic.security.TokenUtils;
import com.proj.medicalClinic.service.AppUserService;
import com.proj.medicalClinic.repository.AppUserRepository;
import com.proj.medicalClinic.service.implementation.CustomUserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class AppUserController {

    @Autowired
    private AppUserRepository userRepository;

    @Autowired
    private AppUserService userService;

    @Autowired
    private CustomUserDetailsServiceImpl customUserDetailsService;

    @Autowired
    TokenUtils tokenUtils;

    @Autowired
    HttpServletRequest httpServletRequest;

    @RequestMapping(value = "/profile", method = RequestMethod.GET)
    public ResponseEntity<?> getUserProfile() {
        String email = this.tokenUtils.getUsernameFromToken(this.tokenUtils.getToken(this.httpServletRequest));
        AppUser appUser = (AppUser) customUserDetailsService.loadUserByUsername(email);
        String userRole = appUser.getUserRole().name();

        if (userRole.equals("PATIENT")){
            Patient p = (Patient) appUser;
            return new ResponseEntity<>(new PatientDTO(p), HttpStatus.OK);
        }
        else if (userRole.equals("DOCTOR")){
            Doctor d = (Doctor) appUser;
            return new ResponseEntity<>(new DoctorDTO(d), HttpStatus.OK);

        }else if (userRole.equals("NURSE")){
            Nurse n = (Nurse) appUser;
            return new ResponseEntity<>(new NurseDTO(n), HttpStatus.OK);

        }else if (userRole.equals("ADMINCLINIC")){
            AdminClinic ac = (AdminClinic) appUser;
            return new ResponseEntity<>(new AdminClinicDTO(ac), HttpStatus.OK);
        }
        else if (userRole.equals("ADMINCLINICALCENTER")){
            AdminClinicalCenter acc = (AdminClinicalCenter) appUser;
            return new ResponseEntity<>(new AdminClinicCenterDTO(acc), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<AppUserDTO>> getAllUsers() {

        List<AppUser> users = userService.findAll();

        //konverzija do DTO
        List<AppUserDTO> usersDTO = new ArrayList<>();
        for (AppUser u : users) {
            usersDTO.add(new AppUserDTO(u));
        }

        return new ResponseEntity<>(usersDTO, HttpStatus.OK);
    }

    @GetMapping(value = "/allNurses")
    public ResponseEntity<List<AppUserDTO>> getAllNurses() {

        List<AppUser> users = userService.findByUserRole(RoleType.NURSE);

        //konverzija do DTO
        List<AppUserDTO> usersDTO = new ArrayList<>();
        for (AppUser u : users) {
            System.out.println(u.getName());
            usersDTO.add(new AppUserDTO(u));
        }

        return new ResponseEntity<>(usersDTO, HttpStatus.OK);
    }
}
