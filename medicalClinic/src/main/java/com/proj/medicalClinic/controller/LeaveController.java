package com.proj.medicalClinic.controller;


import com.proj.medicalClinic.dto.LeaveDTO;
import com.proj.medicalClinic.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.ws.Response;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/leave", produces = MediaType.APPLICATION_JSON_VALUE)
public class LeaveController {

    @Autowired
    private LeaveService leaveService;

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public ResponseEntity<?> getAllLeaves(){
        List<LeaveDTO> leaveDTOS = leaveService.getAll();
        return new ResponseEntity<>(leaveDTOS, HttpStatus.OK);
    }

}
