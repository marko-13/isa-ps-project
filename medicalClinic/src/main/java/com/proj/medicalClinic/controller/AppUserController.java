package com.proj.medicalClinic.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.proj.medicalClinic.dto.AppUserDTO;
import com.proj.medicalClinic.model.AppUser;
import com.proj.medicalClinic.model.RoleType;
import com.proj.medicalClinic.service.AppUserService;
import com.proj.medicalClinic.model.Patient;
import com.proj.medicalClinic.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class AppUserController {

    @Autowired
    private AppUserRepository userRepository;


    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity loginRequest(@RequestBody String json) throws IOException{

        ObjectMapper mapper = new ObjectMapper();

        JsonNode node = mapper.readTree(json);
        AppUser appUser = null;
        appUser = userService.findByEmail(node.get("username").asText());
        System.out.println(node.get("username").asText());
        if (appUser == null){
            //return "Invalid email or password";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        if (appUser.getPassword().equals(node.get("password").asText())){
            //return "Login successsful";
            return ResponseEntity.ok("test");
        }
        else{
            //return "Invalid email or password";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity registerRequest(@RequestBody String json) throws IOException {

        ObjectMapper mapper = new ObjectMapper();

        JsonNode node = mapper.readTree(json);
        AppUser appUser = null;
        appUser = userService.findByEmail(node.get("email").asText());

        if (appUser !=null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorect username or password");
        }
        else{
            String name = node.get("name").asText();
            String password = node.get("password").asText();
            String email = node.get("email").asText();

            return ResponseEntity.ok("Success");
        }
    }
 

    @Autowired
    private AppUserService userService;

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
