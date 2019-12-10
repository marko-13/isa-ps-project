package com.proj.medicalClinic.service.implementation;

import com.proj.medicalClinic.dto.DoctorDTO;
import com.proj.medicalClinic.dto.LeaveDTO;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.model.AppUser;
import com.proj.medicalClinic.model.Leave;
import com.proj.medicalClinic.repository.AppUserRepository;
import com.proj.medicalClinic.repository.LeaveRepository;
import com.proj.medicalClinic.service.LeaveService;
import org.omg.CosNaming.NamingContextPackage.NotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class LeaveServiceImpl implements LeaveService {

    @Autowired
    private LeaveRepository leaveRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Override
    public List<LeaveDTO> getAll() {

        List<Leave> leaves = leaveRepository.findAll();
        if(leaves == null){
            throw new NotExistsException("There are no leaves");
        }

        List<LeaveDTO> leaveDTOS = new ArrayList<>();

        for(Leave l : leaves){
            leaveDTOS.add(new LeaveDTO(l));
        }

        return leaveDTOS;
    }
}
