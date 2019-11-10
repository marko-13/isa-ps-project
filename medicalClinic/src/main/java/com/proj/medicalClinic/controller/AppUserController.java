package com.proj.medicalClinic.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.proj.medicalClinic.dto.AppUserDTO;
import com.proj.medicalClinic.model.AppUser;
import com.proj.medicalClinic.model.Patient;
import com.proj.medicalClinic.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class AppUserController {

    @Autowired
    private AppUserRepository userRepository;


    @PostMapping(value = "/login", produces = "application/json; charset=utf-8")
    public ResponseEntity<?> loginRequest(@RequestBody String id){

        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public String registerRequest(@RequestBody String json) throws IOException {

        ObjectMapper mapper = new ObjectMapper();

        JsonNode node = mapper.readTree(json);
        AppUser appUser = null;
        appUser = userRepository.findByEmail(node.get("email").asText());

        if (appUser !=null){
            return "email exists";
        }
        else{
            String name = node.get("name").asText();
            String password = node.get("password").asText();
            String email = node.get("email").asText();

            return "Success";
        }
    }
}
