package com.proj.medicalClinic.controller;


import com.proj.medicalClinic.dto.LeaveDTO;
import com.proj.medicalClinic.model.AppUser;
import com.proj.medicalClinic.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

    @RequestMapping(value = "/approveLeave/{id}", method = RequestMethod.POST)
    @PreAuthorize("hasAuthority('ADMINCLINIC')")
    public ResponseEntity<?> approveLeave(@PathVariable Long id, @RequestBody String email){
        leaveService.approveLeave(id,email);
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    @RequestMapping(value = "/denyLeave/{id}", method = RequestMethod.POST)
    @PreAuthorize("hasAuthority('ADMINCLINIC')")
    public ResponseEntity<?> denyLeave(@PathVariable Long id, @RequestBody DeniedLeave deniedLeave){
        String email = deniedLeave.email;
        String message = deniedLeave.message;
        leaveService.denyLeave(id, email, " your request for leave of absence has been denied. \n\nReason:\n" + message);
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    static class DeniedLeave {
        public String email;
        public String message;

    }

}
