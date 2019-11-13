package com.proj.medicalClinic.controller;

import com.proj.medicalClinic.dto.AppUserDTO;
import com.proj.medicalClinic.model.AppUser;
import com.proj.medicalClinic.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
//bez ovoga izbacuje eror za cors....
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "api/users")
public class AppUserController {

    @Autowired
    private AppUserService userService;

    @GetMapping(value = "/all")
    public ResponseEntity<List<AppUserDTO>> getAllUsers() {

        List<AppUser> users = userService.findAll();

        //konverzija do DTO
        List<AppUserDTO> usersDTO = new ArrayList<>();
        for(AppUser u : users){
            usersDTO.add(new AppUserDTO(u));
        }

        return new ResponseEntity<>(usersDTO, HttpStatus.OK);
    }
}
