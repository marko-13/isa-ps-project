package com.proj.medicalClinic.controller;

import com.proj.medicalClinic.dto.AppUserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/users")
public class AppUserController {

    @PostMapping(value = "/login", produces = "application/json; charset=utf-8")
    public ResponseEntity<?> loginRequest(@RequestBody String id){

        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
